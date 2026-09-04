import { getChatGPTUser } from "@/app/chatgpt-auth";
import { getDb } from "@/db";
import { siteProfiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { env } from "cloudflare:workers";
import { strToU8, zipSync } from "fflate";

export async function GET(){
 const user=await getChatGPTUser(); if(!user)return Response.json({error:"No autorizado"},{status:401});
 const [row]=await getDb().select().from(siteProfiles).where(eq(siteProfiles.id,"demo")).limit(1); if(!row)return Response.json({error:"No hay contenido guardado"},{status:404});
 const draft=JSON.parse(row.draftJson); const urls=new Set<string>();
 const collect=(v:unknown)=>{if(typeof v==="string"&&v.startsWith("/api/image/"))urls.add(decodeURIComponent(v.slice(11)));else if(Array.isArray(v))v.forEach(collect);else if(v&&typeof v==="object")Object.values(v).forEach(collect)}; collect(draft);
 const files:Record<string,Uint8Array>={"contenido.json":strToU8(JSON.stringify(draft,null,2)),"publicado.json":strToU8(JSON.stringify(JSON.parse(row.publishedJson),null,2)),"manifiesto-imagenes.json":strToU8(JSON.stringify([...urls],null,2))}; let total=0;
 for(const key of urls){const object=await env.BUCKET.get(key);if(!object)continue;const bytes=new Uint8Array(await object.arrayBuffer());total+=bytes.length;if(total>50_000_000)return Response.json({error:"El respaldo supera 50 MB. Exportá el JSON y descargá las imágenes por separado."},{status:413});files[`imagenes/${key.replace("clientes/demo/","")}`]=bytes;}
 const zip=zipSync(files,{level:6});return new Response(zip,{headers:{"content-type":"application/zip","content-disposition":"attachment; filename=arandu-go-respaldo.zip"}});
}
