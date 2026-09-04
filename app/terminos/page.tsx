import LegalDocument from "@/app/LegalDocument";
import { getPublished } from "@/lib/published";
import type { Metadata } from "next";
export async function generateMetadata():Promise<Metadata>{const d=await getPublished();return {title:`Términos de Servicio — ${d.business.name}`,robots:d.seo.allowIndexing?{index:true,follow:true}:{index:false,follow:false}}}
export default function TermsPage(){return <LegalDocument kind="terms"/>}
