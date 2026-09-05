import { type ModuleConfig } from "@/lib/site-data";
import { getPublished } from "@/lib/published";
import type { Metadata } from "next";
import { Clock3, Mail, MapPin, Wrench } from "lucide-react";
import PublicGallery from "./PublicGallery";
import SocialIcons from "./SocialIcons";
import ContactForm from "./ContactForm";
import { SiteFooter, SiteHeader } from "./SiteChrome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export const dynamic = "force-dynamic";
function safeHtml(html:string){return html.replace(/<(script|style|iframe)[\s\S]*?<\/\1>/gi,"").replace(/\son\w+\s*=\s*["'][^"']*["']/gi,"").replace(/javascript:/gi,"")}
function youtubeEmbed(url:string){const match=url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{6,})/);return match?`https://www.youtube-nocookie.com/embed/${match[1]}`:""}
export async function generateMetadata():Promise<Metadata>{const data=await getPublished();return {title:`${data.business.name} — ${data.business.category}`,description:data.business.description,robots:data.seo.allowIndexing?{index:true,follow:true}:{index:false,follow:false,nocache:true}}}

export default async function Home() {
  const data = await getPublished();
  const byKey = Object.fromEntries(data.modules.map((m) => [m.key, m]));
  const style = (m: ModuleConfig) => ({ backgroundColor: m.background, color: m.text, "--accent": m.accent } as React.CSSProperties);
  const sections: Record<string, React.ReactNode> = {
    hero: <section id="inicio" className={`public-section hero-section ${data.hero.image?"":"without-image"}`} style={style(byKey.hero)}><div><span className="eyebrow">{data.business.category}</span><h1>{data.hero.title}</h1><p>{data.hero.text}</p><div className="action-row"><a className="primary-action" href={`https://wa.me/${data.business.whatsapp}`}>WhatsApp</a><a className="secondary-action" href={`tel:${data.business.phone}`}>Llamar</a><a className="secondary-action" href="#ubicacion">Cómo llegar</a></div></div>{data.hero.image&&<img src={data.hero.image} alt={data.business.name} />}</section>,
    quick: <section className="public-section quick-grid" style={style(byKey.quick)}><div><MapPin/><strong>Dirección</strong><span>{data.business.address}</span></div><div><Clock3/><strong>Horarios</strong><span>{data.business.hours}</span></div><div><FontAwesomeIcon icon={faWhatsapp}/><strong>WhatsApp</strong><span>{data.business.phone}</span></div></section>,
    about: <section id="nosotros" className="public-section split-copy" style={style(byKey.about)}><span className="section-number">01</span><div><p className="eyebrow">Sobre el negocio</p><h2>{data.about.title}</h2><p>{data.about.text}</p></div></section>,
    services: <section id="servicios" className="public-section" style={style(byKey.services)}><div className="section-heading"><div><p className="eyebrow">Lo que hacemos</p><h2>Servicios y productos</h2></div><Wrench/></div><div className="service-grid">{data.services.map((s,i)=><article key={s.id}><span>{String(i+1).padStart(2,"0")}</span><h3>{s.title}</h3><p>{s.description}</p></article>)}</div></section>,
    gallery: <section id="galeria" className="public-section" style={style(byKey.gallery)}><div className="section-heading"><div><p className="eyebrow">Galería</p><h2>Conocé nuestro trabajo</h2></div><span>{data.gallery.filter(x=>x.visible).length} fotos</span></div><PublicGallery items={data.gallery} rows={data.galleryLayout.rows} columns={data.galleryLayout.columns}/></section>,
    location: <section id="ubicacion" className="public-section location-grid" style={style(byKey.location)}><iframe className="google-map" src={data.business.mapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={`Mapa de ${data.business.name}`}/><div><p className="eyebrow">Ubicación y horarios</p><h2>Estamos cerca</h2><p>{data.business.address}</p><p>{data.business.hours}</p><a className="secondary-action" href={data.business.mapsUrl} target="_blank" rel="noreferrer"><MapPin/> Abrir mapa</a></div></section>,
    contact: <section id="contacto" className="public-section contact-section" style={style(byKey.contact)}><div className="contact-intro"><p className="eyebrow">Contacto</p><h2>¿Tenés alguna consulta?</h2><p>Elegí el canal que te resulte más cómodo o dejanos tu mensaje.</p><div className="contact-methods"><a href={`https://wa.me/${data.business.whatsapp}`}><FontAwesomeIcon icon={faWhatsapp}/> <span><small>WhatsApp</small><strong>{data.business.phone}</strong></span></a><a href={`mailto:${data.business.email}`}><Mail/> <span><small>Correo</small><strong>{data.business.email}</strong></span></a></div></div>{data.contactForm.enabled&&<ContactForm captchaType={data.contactForm.captchaType} googleSiteKey={data.contactForm.googleSiteKey} challengeMethod={data.contactForm.challengeMethod} challengeQuestion={data.contactForm.challengeQuestion}/>}</section>,
    social: <section className="public-section social-band" style={style(byKey.social)}><strong>Seguinos</strong><SocialIcons socials={data.socials}/></section>,
    free1: null,
    free2: null,
  };
  for(const free of data.freeSections){const m=byKey[free.id];sections[free.id]=<section id={free.id} className="public-section free-section" style={style(m)}><div><p className="eyebrow">Sección especial</p><h2>{free.title}</h2><div className="rich-public" dangerouslySetInnerHTML={{__html:safeHtml(free.html)}}/>{free.ctaLabel&&<a className="primary-action" href={free.ctaUrl}>{free.ctaLabel}</a>}</div>{free.media.length>0&&<div className="free-images">{free.media.map((media,i)=>media.type==="image"?<figure key={media.id}><img src={media.url} alt={media.caption||`${free.title} ${i+1}`}/>{media.caption&&<figcaption>{media.caption}</figcaption>}</figure>:youtubeEmbed(media.url)?<figure key={media.id} className="video-frame"><iframe src={youtubeEmbed(media.url)} title={media.caption||`Video ${i+1}`} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>{media.caption&&<figcaption>{media.caption}</figcaption>}</figure>:null)}</div>}</section>}
  return <div className="public-shell"><SiteHeader data={data}/><main>{data.modules.filter(m=>m.active).map(m=><div key={m.key}>{sections[m.key]}</div>)}</main><SiteFooter data={data}/><div className="mobile-actions"><a href={`https://wa.me/${data.business.whatsapp}`}>WhatsApp</a><a href={`tel:${data.business.phone}`}>Llamar</a><a href="#ubicacion">Cómo llegar</a></div></div>;
}
