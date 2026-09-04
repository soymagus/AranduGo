import { legalHtml } from "@/lib/site-data";
import { getPublished } from "@/lib/published";
import { SiteFooter, SiteHeader } from "./SiteChrome";

function safeHtml(html:string){return html.replace(/<(script|style|iframe)[\s\S]*?<\/\1>/gi,"").replace(/\son\w+\s*=\s*["'][^"']*["']/gi,"").replace(/javascript:/gi,"")}

export default async function LegalDocument({kind}:{kind:"terms"|"privacy"}){
 const data=await getPublished();const title=kind==="terms"?"Términos de Servicio":"Política de Privacidad";
 return <div className="public-shell"><SiteHeader data={data}/><main className="legal-main"><article className="public-section legal-document"><p className="eyebrow">Información legal</p><h1>{title}</h1><div className="rich-public" dangerouslySetInnerHTML={{__html:safeHtml(legalHtml(data,kind))}}/><a className="secondary-action" href="/">Volver al sitio</a></article></main><SiteFooter data={data}/></div>
}
