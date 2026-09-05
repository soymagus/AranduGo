"use client";
import { Checkbox } from "@/components/ui/checkbox";
import type { PhoneEntry, PhoneType, SiteData } from "@/lib/site-data";
import { Plus, Trash2 } from "lucide-react";
import PhoneIcon from "../PhoneIcon";

export default function PhoneSettings({data,onChange}:{data:SiteData;onChange:(data:SiteData)=>void}){
 const update=(i:number,patch:Partial<PhoneEntry>)=>{const phones=[...data.phones];phones[i]={...phones[i],...patch};onChange({...data,phones})};
 const add=()=>{if(data.phones.length>=12)return;const id=`phone-${Date.now()}`;onChange({...data,phones:[...data.phones,{id,label:"Nuevo teléfono",number:"",type:"mobile",showInQuick:false,showInContact:true}],quickOrder:[...data.quickOrder,`phone:${id}`]})};
 const remove=(i:number)=>{const id=data.phones[i].id;onChange({...data,phones:data.phones.filter((_,n)=>n!==i),quickOrder:data.quickOrder.filter(k=>k!==`phone:${id}`)})};
 return <section className="editor-card"><div className="card-head"><div><small>Teléfonos</small><h2>Líneas y canales</h2><p>Podés registrar hasta 12 números y elegir en qué tarjetas se muestran.</p></div><button className="control-button primary" onClick={add} disabled={data.phones.length>=12}><Plus/>Agregar teléfono</button></div><div className="phone-editor">{data.phones.map((phone,i)=><article key={phone.id}><PhoneIcon type={phone.type}/><label className="field"><span>Nombre o etiqueta</span><input value={phone.label} onChange={e=>update(i,{label:e.target.value})}/></label><label className="field"><span>Número</span><input value={phone.number} onChange={e=>update(i,{number:e.target.value})}/></label><label className="field"><span>Tipo de línea</span><select value={phone.type} onChange={e=>update(i,{type:e.target.value as PhoneType})}><option value="landline">Línea fija · llamadas</option><option value="mobile">Celular · llamadas y SMS</option><option value="whatsapp">WhatsApp</option></select></label><label className="check-line"><Checkbox checked={phone.showInQuick} onCheckedChange={v=>update(i,{showInQuick:v===true})}/>Información rápida</label><label className="check-line"><Checkbox checked={phone.showInContact} onCheckedChange={v=>update(i,{showInContact:v===true})}/>Contacto</label><button className="control-button danger icon-only" aria-label="Eliminar teléfono" onClick={()=>remove(i)}><Trash2/></button></article>)}</div></section>;
}
