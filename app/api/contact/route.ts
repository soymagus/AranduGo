import { getDb } from "@/db";
import { contactMessages, siteProfiles, siteSecrets } from "@/db/schema";
import { eq, lt } from "drizzle-orm";
import { demoData, normalizeSiteData } from "@/lib/site-data";
import { env } from "cloudflare:workers";

const escapeHtml=(value:string)=>value.replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]!));

async function deliverWithGateway(runtime:Record<string,string>,payload:Record<string,string>){
 const url=runtime.CONTACT_MAIL_GATEWAY_URL;const secret=runtime.CONTACT_MAIL_GATEWAY_SECRET;
 if(!url||!secret)return false;
 try{const response=await fetch(url,{method:"POST",headers:{authorization:`Bearer ${secret}`,"content-type":"application/json"},body:JSON.stringify(payload)});return response.ok}catch{return false}
}

export async function POST(request: Request) {
 try {
  const body=await request.json() as {name?:string;email?:string;phone?:string;message?:string;website?:string;captchaType?:"none"|"integrated"|"google_v2";challengeMethod?:"math"|"checkbox"|"question";a?:number;b?:number;answer?:string;recaptchaToken?:string};
  if(body.website)return Response.json({ok:true});
  const name=body.name?.trim()??"";const email=body.email?.trim()??"";const message=body.message?.trim()??"";
  if(!name||!email.includes("@")||message.length<5)return Response.json({error:"Completá nombre, correo y mensaje."},{status:400});
  const [row]=await getDb().select().from(siteProfiles).where(eq(siteProfiles.id,"demo")).limit(1);const profile=row?normalizeSiteData(JSON.parse(row.publishedJson)):demoData;const captchaType=profile.contactForm.captchaType;
  if(captchaType==="integrated"&&profile.contactForm.challengeMethod==="math"&&Number(body.answer)!==Number(body.a)+Number(body.b))return Response.json({error:"La verificación no es correcta."},{status:400});
  if(captchaType==="integrated"&&profile.contactForm.challengeMethod==="checkbox"&&body.answer!=="true")return Response.json({error:"Confirmá que sos una persona."},{status:400});
  if(captchaType==="integrated"&&profile.contactForm.challengeMethod==="question"&&body.answer?.trim().toLocaleLowerCase("es")!==profile.contactForm.challengeAnswer.trim().toLocaleLowerCase("es"))return Response.json({error:"La respuesta de verificación no es correcta."},{status:400});
  if(captchaType==="google_v2"){
   const [storedSecret]=await getDb().select({value:siteSecrets.value}).from(siteSecrets).where(eq(siteSecrets.id,"demo:recaptcha-secret")).limit(1);const secret=(env as unknown as Record<string,string>).RECAPTCHA_SECRET_KEY||storedSecret?.value;
   if(!secret||!body.recaptchaToken)return Response.json({error:"Google reCAPTCHA todavía no está completamente configurado."},{status:503});
   const form=new URLSearchParams({secret,response:body.recaptchaToken});const verification=await fetch("https://www.google.com/recaptcha/api/siteverify",{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},body:form});const result=await verification.json() as {success?:boolean};
   if(!result.success)return Response.json({error:"Google reCAPTCHA no pudo verificar la solicitud."},{status:400});
  }
  const db=getDb();const now=new Date();const cutoff=new Date(now.getTime()-180*24*60*60*1000);await db.delete(contactMessages).where(lt(contactMessages.createdAt,cutoff));
  const runtime=env as unknown as Record<string,string>;let delivered=false;const recipient=profile.contactForm.recipientEmail.trim();const apiKey=runtime.RESEND_API_KEY;const timezone=profile.contactForm.timezone||"UTC";const transport=profile.contactForm.mailTransport||"resend";
  if(recipient&&transport==="resend"&&apiKey){const sent=await fetch("https://api.resend.com/emails",{method:"POST",headers:{authorization:`Bearer ${apiKey}`,"content-type":"application/json"},body:JSON.stringify({from:runtime.CONTACT_FROM_EMAIL||"Arandu Go <onboarding@resend.dev>",to:[recipient],reply_to:email,subject:`Nueva consulta de ${name}`,html:`<h2>Nueva consulta desde ${escapeHtml(profile.business.name)}</h2><p><strong>Nombre:</strong> ${escapeHtml(name)}</p><p><strong>Correo:</strong> ${escapeHtml(email)}</p><p><strong>Teléfono:</strong> ${escapeHtml(body.phone?.trim()??"")}</p><p><strong>Mensaje:</strong></p><p>${escapeHtml(message).replace(/\n/g,"<br>")}</p>`})});delivered=sent.ok}
  if(recipient&&transport!=="resend")delivered=await deliverWithGateway(runtime,{transport,recipient,business:profile.business.name,name,email,phone:body.phone?.trim()??"",message});
  await db.insert(contactMessages).values({id:crypto.randomUUID(),name,email,phone:body.phone?.trim()??"",message:profile.contactForm.keepMessageCopy?message:"",timezone,delivered,createdAt:now});return Response.json({ok:true,delivered});
 }catch{return Response.json({error:"No pudimos enviar el mensaje. Intentá nuevamente."},{status:500})}
}
