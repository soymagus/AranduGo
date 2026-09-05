"use client";
import { useEffect } from "react";

export default function AnalyticsCode({code}:{code:string}){
 useEffect(()=>{if(!code.trim())return;const host=document.createElement("div");host.dataset.aranduAnalytics="true";const template=document.createElement("template");template.innerHTML=code;for(const node of Array.from(template.content.childNodes)){if(node.nodeName.toLowerCase()==="script"){const source=node as HTMLScriptElement;const script=document.createElement("script");for(const attr of Array.from(source.attributes))script.setAttribute(attr.name,attr.value);script.text=source.text;host.appendChild(script)}else host.appendChild(node.cloneNode(true))}document.body.appendChild(host);return()=>host.remove()},[code]);
 return null;
}
