import { env } from "cloudflare:workers";
export async function GET(_: Request, { params }: { params: Promise<{ key: string[] }> }) {
  const { key } = await params; const object = await env.BUCKET.get(key.join("/"));
  if (!object) return new Response("No encontrada", { status: 404 });
  return new Response(object.body, { headers: { "content-type": object.httpMetadata?.contentType || "image/jpeg", "cache-control": "public, max-age=31536000, immutable" } });
}
