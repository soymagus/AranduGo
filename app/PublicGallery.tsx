"use client";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryItem } from "@/lib/site-data";

export default function PublicGallery({items,rows,columns}:{items:GalleryItem[];rows:number;columns:number}) {
  const visible=useMemo(()=>items.filter(x=>x.visible),[items]); const pageSize=Math.max(1,Math.min(12,rows*columns)); const [page,setPage]=useState(0); const pages=Math.max(1,Math.ceil(visible.length/pageSize)); const safePage=Math.min(page,pages-1); const shown=visible.slice(safePage*pageSize,(safePage+1)*pageSize);
  return <><div className="gallery-grid dynamic-gallery" style={{gridTemplateColumns:`repeat(${Math.min(columns,4)},minmax(0,1fr))`}}>{shown.map(g=><article key={g.id}><img src={g.image} alt={g.title}/><div><h3>{g.title}</h3><p>{g.description}</p>{g.ctaLabel&&<a href={g.ctaUrl}>{g.ctaLabel} →</a>}</div></article>)}</div><div className="gallery-pagination"><button onClick={()=>setPage(Math.max(0,safePage-1))} disabled={safePage===0} aria-label="Galería anterior"><ChevronLeft/></button><strong>Mostrando {shown.length} de {visible.length}</strong><span>Página {safePage+1} de {pages}</span><button onClick={()=>setPage(Math.min(pages-1,safePage+1))} disabled={safePage===pages-1} aria-label="Galería siguiente"><ChevronRight/></button></div></>;
}
