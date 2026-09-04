import { getDb } from "@/db";
import { contactMessages, siteProfiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { demoData, normalizeSiteData } from "@/lib/site-data";

export async function POST(request: Request) {
  try {
    const body = await request.json() as { name?: string; email?: string; phone?: string; message?: string; website?: string; captchaEnabled?: boolean; challengeMethod?: "math"|"checkbox"|"question"; a?: number; b?: number; answer?: string };
    if (body.website) return Response.json({ ok: true });
    const name = body.name?.trim() ?? ""; const email = body.email?.trim() ?? ""; const message = body.message?.trim() ?? "";
    if (!name || !email.includes("@") || message.length < 5) return Response.json({ error: "Completá nombre, correo y mensaje." }, { status: 400 });
    if (body.captchaEnabled && body.challengeMethod === "math" && Number(body.answer) !== Number(body.a) + Number(body.b)) return Response.json({ error: "La verificación no es correcta." }, { status: 400 });
    if (body.captchaEnabled && body.challengeMethod === "checkbox" && body.answer !== "true") return Response.json({ error: "Confirmá que sos una persona." }, { status: 400 });
    if (body.captchaEnabled && body.challengeMethod === "question") {
      const [row] = await getDb().select().from(siteProfiles).where(eq(siteProfiles.id,"demo")).limit(1);
      const profile = row ? normalizeSiteData(JSON.parse(row.publishedJson)) : demoData;
      if (body.answer?.trim().toLocaleLowerCase("es") !== profile.contactForm.challengeAnswer.trim().toLocaleLowerCase("es")) return Response.json({ error: "La respuesta de verificación no es correcta." }, { status: 400 });
    }
    await getDb().insert(contactMessages).values({ id: crypto.randomUUID(), name, email, phone: body.phone?.trim() ?? "", message, createdAt: new Date() });
    return Response.json({ ok: true });
  } catch { return Response.json({ error: "No pudimos enviar el mensaje. Intentá nuevamente." }, { status: 500 }); }
}
