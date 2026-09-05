import type { MenuKey, SiteData } from "@/lib/site-data";
import { ChevronDown, Menu } from "lucide-react";
import SocialIcons from "./SocialIcons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const ARANDU_BRANDING={showPoweredBy:true,text:"Powered by Arandu Cloud"};

function Identity({data,footer=false}:{data:SiteData;footer?:boolean}){const showSymbol=footer?data.footer.showLogo:true;const showName=footer?data.footer.showName:data.header.showName;return <>{showSymbol&&(data.header.identityType==="initial"?<span>{data.header.initial||data.business.name.charAt(0)}</span>:data.header.logo?<img className={`brand-logo ${data.header.logoShape}`} src={data.header.logo} alt={data.business.name} style={{height:footer?32:data.header.logoSize,width:footer?"auto":data.header.maintainAspect?"auto":data.header.logoWidth}}/>:null)}{showName&&<strong>{data.header.nameText||data.business.name}</strong>}</>}

export function SiteHeader({data}:{data:SiteData}){
 const byKey=Object.fromEntries(data.modules.map(m=>[m.key,m]));const free=Object.fromEntries(data.freeSections.map(f=>[f.id,f]));const order=[...new Set(data.menuOrder)];
 const available=(key:MenuKey)=>{if(key==="home")return true;if(key==="services")return Boolean(byKey.services?.active);if(key==="gallery")return Boolean(byKey.gallery?.active);if(key==="contact")return Boolean(byKey.contact?.active);if(key==="about")return Boolean((data.about.showInMenu&&byKey.about?.active)||data.legal.showInHeaderMenu);return Boolean(byKey[key]?.active&&free[key]?.showInMenu)};
 const label=(key:MenuKey)=>({home:"Inicio",services:"Servicios",gallery:"Galería",about:"Nosotros",free1:free.free1?.menuLabel||"Sección libre 1",free2:free.free2?.menuLabel||"Sección libre 2",contact:"Contacto"})[key];
 const href=(key:MenuKey)=>({home:"/#inicio",services:"/#servicios",gallery:"/#galeria",about:"/#nosotros",free1:"/#free1",free2:"/#free2",contact:"/#contacto"})[key];
 const visible=(key:MenuKey)=>available(key)&&(key==="home"||data.menuSettings[key]?.visible!==false);const roots=order.filter(k=>visible(k)&&!data.menuSettings[k]?.parent);
 const children=(parent:MenuKey)=>order.filter(k=>visible(k)&&data.menuSettings[k]?.parent===parent&&k!==parent);
 const legalChildren=(key:MenuKey)=>key==="about"&&data.legal.showInHeaderMenu?[{href:"/terminos",label:"Términos de Servicio"},{href:"/privacidad",label:"Política de Privacidad"}]:[];
 const navStyle=data.menuDesign.enabled?({"--menu-bg":data.menuDesign.background,"--menu-text":data.menuDesign.text,"--menu-hover-bg":data.menuDesign.hoverBackground,"--menu-hover-text":data.menuDesign.hoverText} as React.CSSProperties):undefined;
 const whatsapp=data.phones.find(p=>p.type==="whatsapp"&&p.number);return <header className="thin-header" style={{backgroundColor:data.header.background,color:data.header.text}}><a className="brand" href="/#inicio"><Identity data={data}/></a><nav className={`${data.menuDesign.enabled?"menu-custom":""} menu-anim-${data.menuDesign.enabled?data.menuDesign.animation:"none"}`} style={navStyle}>{roots.map(key=>{const sub=[...children(key).map(k=>({href:href(k),label:label(k)})),...legalChildren(key)];return sub.length?<div className="nav-submenu" key={key}><a href={href(key)}>{label(key)}<ChevronDown/></a><div>{sub.map(item=><a key={item.href} href={item.href}>{item.label}</a>)}</div></div>:<a key={key} href={href(key)}>{label(key)}</a>})}</nav>{whatsapp&&<a className="header-cta whatsapp-cta" href={`https://wa.me/${whatsapp.number.replace(/\D/g,"")}`}><FontAwesomeIcon icon={faWhatsapp}/>WhatsApp</a>}<button className="mobile-menu" aria-label="Abrir menú"><Menu/></button></header>
}

export function SiteFooter({data}:{data:SiteData}){return <footer className="thin-footer" style={{backgroundColor:data.footer.background,color:data.footer.text}}>{(data.footer.showLogo||data.footer.showName)&&<div className="brand"><Identity data={data} footer/></div>}{data.footer.showContact&&<p>{data.business.email} · {data.business.phone}</p>}{data.footer.showSocials&&<div className="footer-socials"><SocialIcons socials={data.socials} customSocial={data.customSocial}/></div>}<div className="footer-legal"><p>{data.footer.legalText}{ARANDU_BRANDING.showPoweredBy&&<> · <strong>{ARANDU_BRANDING.text}</strong></>}</p>{data.footer.showLegalLinks&&<p><a href="/terminos">Términos de Servicio</a><a href="/privacidad">Política de Privacidad</a></p>}</div></footer>}
