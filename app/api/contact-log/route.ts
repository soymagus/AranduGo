import { getChatGPTUser } from "@/app/chatgpt-auth";
import { getDb } from "@/db";
import { contactMessages } from "@/db/schema";
import { desc, lt } from "drizzle-orm";

export async function GET(request:Request){
 const user=await getChatGPTUser();if(!user)return Response.json({error:"No autorizado"},{status:401});const db=getDb();const cutoff=new Date(Date.now()-180*24*60*60*1000);await db.delete(contactMessages).where(lt(contactMessages.createdAt,cutoff));const rows=await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt)).limit(1000);const url=new URL(request.url);
 if(url.searchParams.get("format")==="txt"){const text=rows.map(row=>{let date:string;try{date=new Intl.DateTimeFormat("es",{dateStyle:"short",timeStyle:"medium",timeZone:row.timezone}).format(row.createdAt)}catch{date=row.createdAt.toISOString()}return [`Fecha: ${date} (${row.timezone})`,`Nombre: ${row.name}`,`Remitente: ${row.email}`,`Teléfono: ${row.phone||"—"}`,`Entrega por correo: ${row.delivered?"Sí":"No"}`,row.message?`Mensaje: ${row.message}`:"",""] .filter(Boolean).join("\n")}).join("\n");return new Response(text,{headers:{"content-type":"text/plain; charset=utf-8","content-disposition":"attachment; filename=registro-formulario.txt"}})}
 return Response.json({rows:rows.map(row=>({...row,createdAt:row.createdAt.toISOString()})),retentionDays:180});
}
