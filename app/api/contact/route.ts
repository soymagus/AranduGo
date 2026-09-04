import { getDb } from "@/db";
import { contactMessages } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json() as { name?: string; email?: string; phone?: string; message?: string; website?: string; captchaEnabled?: boolean; a?: number; b?: number; answer?: number };
    if (body.website) return Response.json({ ok: true });
    const name = body.name?.trim() ?? ""; const email = body.email?.trim() ?? ""; const message = body.message?.trim() ?? "";
    if (!name || !email.includes("@") || message.length < 5) return Response.json({ error: "Completá nombre, correo y mensaje." }, { status: 400 });
    if (body.captchaEnabled && Number(body.answer) !== Number(body.a) + Number(body.b)) return Response.json({ error: "La verificación no es correcta." }, { status: 400 });
    await getDb().insert(contactMessages).values({ id: crypto.randomUUID(), name, email, phone: body.phone?.trim() ?? "", message, createdAt: new Date() });
    return Response.json({ ok: true });
  } catch { return Response.json({ error: "No pudimos enviar el mensaje. Intentá nuevamente." }, { status: 500 }); }
}
