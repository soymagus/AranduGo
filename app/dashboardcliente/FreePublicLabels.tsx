"use client";
import type { SiteData } from "@/lib/site-data";

export default function FreePublicLabels({data,onChange}:{data:SiteData;onChange:(data:SiteData)=>void}){
 const update=(i:number,publicLabel:string)=>{const freeSections=[...data.freeSections];freeSections[i]={...freeSections[i],publicLabel};onChange({...data,freeSections})};
 return <section className="editor-card"><div className="card-head"><div><small>Nombre público</small><h2>Identificación de las tarjetas libres</h2><p>Este texto aparece sobre el título de cada tarjeta; es independiente del nombre del menú.</p></div></div><div className="form-grid">{data.freeSections.map((section,i)=><label className="field" key={section.id}><span>Contenido libre {i+1} · nombre público</span><input value={section.publicLabel} onChange={e=>update(i,e.target.value)} placeholder={`Contenido libre ${i+1}`}/></label>)}</div></section>;
}
