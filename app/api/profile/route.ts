import { getDb } from "@/db";
import { siteProfiles } from "@/db/schema";
import { demoData, normalizeSiteData, type SiteData } from "@/lib/site-data";
import { getChatGPTUser } from "@/app/chatgpt-auth";
import { eq } from "drizzle-orm";

export async function GET() {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "No autorizado" }, { status: 401 });
  const [row] = await getDb().select().from(siteProfiles).where(eq(siteProfiles.id, "demo")).limit(1);
  return Response.json({ draft: row ? normalizeSiteData(JSON.parse(row.draftJson)) : demoData, publishedAt: row?.publishedAt ?? null });
}

export async function PUT(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "No autorizado" }, { status: 401 });
  const body = await request.json() as { data?: SiteData; publish?: boolean };
  if (!body.data || body.data.gallery.length > 24) return Response.json({ error: "Datos inválidos" }, { status: 400 });
  const now = new Date(); const json = JSON.stringify(body.data);
  const [existing] = await getDb().select().from(siteProfiles).where(eq(siteProfiles.id, "demo")).limit(1);
  await getDb().insert(siteProfiles).values({ id: "demo", ownerEmail: user.email, draftJson: json, publishedJson: body.publish ? json : (existing?.publishedJson ?? JSON.stringify(demoData)), updatedAt: now, publishedAt: body.publish ? now : (existing?.publishedAt ?? now) }).onConflictDoUpdate({ target: siteProfiles.id, set: { ownerEmail: user.email, draftJson: json, ...(body.publish ? { publishedJson: json, publishedAt: now } : {}), updatedAt: now } });
  return Response.json({ ok: true, published: Boolean(body.publish), updatedAt: now.toISOString() });
}
