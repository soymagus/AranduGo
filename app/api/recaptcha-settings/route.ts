import { getChatGPTUser } from "@/app/chatgpt-auth";
import { getDb } from "@/db";
import { siteSecrets } from "@/db/schema";
import { eq } from "drizzle-orm";

const SECRET_ID="demo:recaptcha-secret";
export async function GET(){const user=await getChatGPTUser();if(!user)return Response.json({error:"No autorizado"},{status:401});const [row]=await getDb().select({id:siteSecrets.id}).from(siteSecrets).where(eq(siteSecrets.id,SECRET_ID)).limit(1);return Response.json({configured:Boolean(row)})}
export async function PUT(request:Request){const user=await getChatGPTUser();if(!user)return Response.json({error:"No autorizado"},{status:401});const body=await request.json() as {secretKey?:string};const value=body.secretKey?.trim()??"";if(value.length<10)return Response.json({error:"Ingresá una clave secreta válida."},{status:400});await getDb().insert(siteSecrets).values({id:SECRET_ID,value,updatedAt:new Date()}).onConflictDoUpdate({target:siteSecrets.id,set:{value,updatedAt:new Date()}});return Response.json({ok:true,configured:true})}
export async function DELETE(){const user=await getChatGPTUser();if(!user)return Response.json({error:"No autorizado"},{status:401});await getDb().delete(siteSecrets).where(eq(siteSecrets.id,SECRET_ID));return Response.json({ok:true,configured:false})}
