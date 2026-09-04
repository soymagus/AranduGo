import LegalDocument from "@/app/LegalDocument";
import { getPublished } from "@/lib/published";
import type { Metadata } from "next";
export async function generateMetadata():Promise<Metadata>{const d=await getPublished();return {title:`Política de Privacidad — ${d.business.name}`,robots:d.seo.allowIndexing?{index:true,follow:true}:{index:false,follow:false}}}
export default function PrivacyPage(){return <LegalDocument kind="privacy"/>}
