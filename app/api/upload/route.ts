import { getChatGPTUser } from "@/app/chatgpt-auth";
import { env } from "cloudflare:workers";

export async function POST(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "No autorizado" }, { status: 401 });
  const form = await request.formData(); const file = form.get("file");
  if (!(file instanceof File) || !file.type.startsWith("image/") || file.size > 6_000_000) return Response.json({ error: "Usá una imagen de hasta 6 MB" }, { status: 400 });
  const ext = file.name.split(".").pop()?.replace(/[^a-z0-9]/gi, "") || "jpg";
  const requestedFolder=String(form.get("folder")||"galeria");
  const folder=["logos","portada","galeria","secciones-libres"].includes(requestedFolder)?requestedFolder:"galeria";
  const key = `clientes/demo/${folder}/${crypto.randomUUID()}.${ext}`;
  await env.BUCKET.put(key, await file.arrayBuffer(), { httpMetadata: { contentType: file.type } });
  return Response.json({ url: `/api/image/${encodeURIComponent(key)}` });
}
