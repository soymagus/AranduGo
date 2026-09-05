"use client";
import type { SiteData } from "@/lib/site-data";

export default function CustomSocialSettings({data,onChange}:{data:SiteData;onChange:(data:SiteData)=>void}){
 const update=(key:keyof SiteData["customSocial"],value:string)=>onChange({...data,customSocial:{...data.customSocial,[key]:value}});
 return <section className="editor-card"><div className="card-head"><div><small>Canal adicional</small><h2>Red social personalizada</h2><p>Se muestra únicamente cuando tiene nombre, enlace e icono.</p></div></div><div className="form-grid"><label className="field"><span>Nombre de la red</span><input value={data.customSocial.label} onChange={e=>update("label",e.target.value)} placeholder="Ej.: Threads"/></label><label className="field"><span>URL de la red</span><input value={data.customSocial.url} onChange={e=>update("url",e.target.value)} placeholder="https://..."/></label><label className="field"><span>URL pública del icono</span><input value={data.customSocial.iconUrl} onChange={e=>update("iconUrl",e.target.value)} placeholder="https://.../icono.png"/></label>{data.customSocial.iconUrl&&<div className="custom-social-preview"><img src={data.customSocial.iconUrl} alt="Vista previa"/><span>Vista previa del icono</span></div>}</div></section>;
}
