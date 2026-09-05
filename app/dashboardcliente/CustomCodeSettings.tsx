"use client";
import type { SiteData } from "@/lib/site-data";

export default function CustomCodeSettings({data,onChange}:{data:SiteData;onChange:(data:SiteData)=>void}){
 const update=(key:"css"|"analytics",value:string)=>onChange({...data,customCode:{...data.customCode,[key]:value}});
 return <section className="editor-card"><div className="card-head"><div><small>Configuración avanzada</small><h2>CSS adicional y analítica</h2><p>Estos campos están destinados a personal técnico. Los cambios se aplican al publicar.</p></div></div><div className="code-grid"><label className="field"><span>CSS adicional (sin etiquetas &lt;style&gt;)</span><textarea className="code-editor" value={data.customCode.css} onChange={e=>update("css",e.target.value)} spellCheck={false} placeholder={".public-shell {\n  /* reglas personalizadas */\n}"}/></label><label className="field"><span>Código de analítica</span><textarea className="code-editor" value={data.customCode.analytics} onChange={e=>update("analytics",e.target.value)} spellCheck={false} placeholder="Pegá aquí el código de Google Analytics, Tag Manager u otro proveedor."/></label></div></section>;
}
