import type { MenuKey, SiteData } from "@/lib/site-data";
import { Menu } from "lucide-react";
import SocialIcons from "./SocialIcons";

const ARANDU_BRANDING={showPoweredBy:true,text:"Powered by Arandu Cloud"};

function Identity({data,footer=false}:{data:SiteData;footer?:boolean}){
 const showSymbol=footer?data.footer.showLogo:true;const showName=footer?data.footer.showName:data.header.showName;
 return <>{showSymbol&&(data.header.identityType==="initial"?<span>{data.header.initial||data.business.name.charAt(0)}</span>:data.header.logo?<img className={`brand-logo ${data.header.logoShape}`} src={data.header.logo} alt={data.business.name} style={{height:footer?32:data.header.logoSize,width:footer?"auto":data.header.maintainAspect?"auto":data.header.logoWidth}}/>:null)}{showName&&<strong>{data.header.nameText||data.business.name}</strong>}</>
}

export function SiteHeader({data}:{data:SiteData}){
 const byKey=Object.fromEntries(data.modules.map(m=>[m.key,m]));const free=Object.fromEntries(data.freeSections.map(f=>[f.id,f]));
 const renderItem=(key:MenuKey)=>{
  if(key==="home")return <a key={key} href="/#inicio">Inicio</a>;
  if(key==="services"&&byKey.services?.active)return <a key={key} href="/#servicios">Servicios</a>;
  if(key==="gallery"&&byKey.gallery?.active)return <a key={key} href="/#galeria">Galería</a>;
  if(key==="contact"&&byKey.contact?.active)return <a key={key} href="/#contacto">Contacto</a>;
  if((key==="free1"||key==="free2")&&byKey[key]?.active&&free[key]?.showInMenu)return <a key={key} href={`/#${key}`}>{free[key].menuLabel}</a>;
  if(key==="about"&&((data.about.showInMenu&&byKey.about?.active)||data.legal.showInHeaderMenu))return <div className="nav-submenu" key={key}><a href="/#nosotros">Nosotros</a>{data.legal.showInHeaderMenu&&<div><a href="/terminos">Términos de Servicio</a><a href="/privacidad">Política de Privacidad</a></div>}</div>;
  return null;
 };
 return <header className="thin-header" style={{backgroundColor:data.header.background,color:data.header.text}}><a className="brand" href="/#inicio"><Identity data={data}/></a><nav>{data.menuOrder.map(renderItem)}</nav><a className="header-cta" href={`https://wa.me/${data.business.whatsapp}`}>WhatsApp</a><button className="mobile-menu" aria-label="Abrir menú"><Menu/></button></header>
}

export function SiteFooter({data}:{data:SiteData}){
 return <footer className="thin-footer" style={{backgroundColor:data.footer.background,color:data.footer.text}}>{(data.footer.showLogo||data.footer.showName)&&<div className="brand"><Identity data={data} footer/></div>}{data.footer.showContact&&<p>{data.business.email} · {data.business.phone}</p>}{data.footer.showSocials&&<div className="footer-socials"><SocialIcons socials={data.socials}/></div>}<div className="footer-legal"><p>{data.footer.legalText}{ARANDU_BRANDING.showPoweredBy&&<> · <strong>{ARANDU_BRANDING.text}</strong></>}</p>{data.footer.showLegalLinks&&<p><a href="/terminos">Términos de Servicio</a><a href="/privacidad">Política de Privacidad</a></p>}</div></footer>
}
