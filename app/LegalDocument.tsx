import { legalHtml } from "@/lib/site-data";
import { getPublished } from "@/lib/published";

function safeHtml(html:string){return html.replace(/<(script|style|iframe)[\s\S]*?<\/\1>/gi,"").replace(/\son\w+\s*=\s*["'][^"']*["']/gi,"").replace(/javascript:/gi,"")}
const ARANDU_BRANDING={showPoweredBy:true,text:"Powered by Arandu Cloud"};

export default async function LegalDocument({kind}:{kind:"terms"|"privacy"}){
 const data=await getPublished();const title=kind==="terms"?"Términos de Servicio":"Política de Privacidad";
 const logo=<>{data.header.identityType==="initial"?<span>{data.header.initial||data.business.name.charAt(0)}</span>:data.header.logo?<img className={`brand-logo ${data.header.logoShape}`} src={data.header.logo} alt={data.business.name} style={{height:data.header.logoSize,width:data.header.maintainAspect?"auto":data.header.logoWidth}}/>:null}{data.header.showName&&<strong>{data.header.nameText||data.business.name}</strong>}</>;
 return <div className="public-shell"><header className="thin-header" style={{backgroundColor:data.header.background,color:data.header.text}}><a className="brand" href="/">{logo}</a><nav><a href="/">Inicio</a><a href="/#nosotros">Nosotros</a><a href="/terminos">Términos</a><a href="/privacidad">Privacidad</a></nav></header><main className="legal-main"><article className="public-section legal-document"><p className="eyebrow">Información legal</p><h1>{title}</h1><div className="rich-public" dangerouslySetInnerHTML={{__html:safeHtml(legalHtml(data,kind))}}/><a className="secondary-action" href="/">Volver al sitio</a></article></main><footer className="thin-footer" style={{backgroundColor:data.footer.background,color:data.footer.text}}><div className="brand">{logo}</div>{data.footer.showContact&&<p>{data.business.email} · {data.business.phone}</p>}<div className="footer-legal"><p>{data.footer.legalText}{ARANDU_BRANDING.showPoweredBy&&<> · <strong>{ARANDU_BRANDING.text}</strong></>}</p><p><a href="/terminos">Términos de Servicio</a><a href="/privacidad">Política de Privacidad</a></p></div></footer></div>
}
