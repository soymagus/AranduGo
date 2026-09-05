"use client";
import type { SiteData } from "@/lib/site-data";
import { ArrowLeft, ArrowRight, GripVertical } from "lucide-react";

export default function QuickInfoOrganizer({data,onChange}:{data:SiteData;onChange:(data:SiteData)=>void}){
 const label=(key:string)=>key==="address"?"Dirección":key==="hours"?"Horarios":key==="email"?"Correo":data.phones.find(p=>`phone:${p.id}`===key)?.label||"Teléfono";
 const move=(i:number,dir:number)=>{const j=i+dir;if(j<0||j>=data.quickOrder.length)return;const quickOrder=[...data.quickOrder];[quickOrder[i],quickOrder[j]]=[quickOrder[j],quickOrder[i]];onChange({...data,quickOrder})};
 return <section className="editor-card"><div className="card-head"><div><small>Tarjeta de información rápida</small><h2>Orden de los datos</h2><p>La posición 1 aparece primero de izquierda a derecha.</p></div></div><div className="module-list">{data.quickOrder.map((key,i)=><div className="module-row" key={key}><GripVertical/><span className="menu-position">{i+1}</span><strong>{label(key)}</strong><div className="row-actions"><button onClick={()=>move(i,-1)} disabled={i===0} aria-label="Mover a la izquierda"><ArrowLeft/></button><button onClick={()=>move(i,1)} disabled={i===data.quickOrder.length-1} aria-label="Mover a la derecha"><ArrowRight/></button></div></div>)}</div></section>;
}
