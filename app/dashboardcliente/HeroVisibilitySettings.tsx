"use client";
import { Checkbox } from "@/components/ui/checkbox";
import type { SiteData } from "@/lib/site-data";

export default function HeroVisibilitySettings({data,onChange}:{data:SiteData;onChange:(data:SiteData)=>void}){
 const options=[['showCategory','Categoría del comercio'],['showTitle','Título principal'],['showText','Texto de portada'],['showImage','Imagen de portada'],['showWhatsappCta','Botón WhatsApp'],['showCallCta','Botón Llamar'],['showMapsCta','Botón Cómo llegar']] as const;
 const update=(key:typeof options[number][0],checked:boolean)=>onChange({...data,hero:{...data.hero,[key]:checked}});
 return <section className="editor-card hero-visibility"><div className="card-head"><div><small>Presentación</small><h2>Elementos visibles en la portada</h2></div></div><div>{options.map(([key,label])=><label className="check-line" key={key}><Checkbox checked={data.hero[key]} onCheckedChange={v=>update(key,v===true)}/>{label}</label>)}</div><p className="help-text">Aunque estén seleccionados, los textos, imágenes o botones sin datos válidos se ocultan automáticamente.</p></section>;
}
