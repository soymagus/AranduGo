export type GalleryItem = { id: string; image: string; title: string; description: string; ctaLabel: string; ctaUrl: string; visible: boolean };
export type ModuleKey = "hero" | "quick" | "about" | "services" | "gallery" | "location" | "contact" | "social" | "free1" | "free2";
export type ModuleConfig = { key: ModuleKey; label: string; active: boolean; background: string; text: string; accent: string };
export type MenuKey = "home" | "services" | "gallery" | "about" | "free1" | "free2" | "contact";
export type MenuItemSetting = { visible: boolean; parent: MenuKey | null };
export type PhoneType = "landline" | "mobile" | "whatsapp";
export type PhoneEntry = { id: string; label: string; number: string; type: PhoneType; showInQuick: boolean; showInContact: boolean };
export type FreeMedia = { id: string; type: "image" | "youtube"; url: string; caption: string };
export type FreeSection = { id: "free1" | "free2"; title: string; menuLabel: string; publicLabel: string; showInMenu: boolean; html: string; images: string[]; media: FreeMedia[]; ctaLabel: string; ctaUrl: string };
export type SiteData = {
  business: { name: string; category: string; slogan: string; description: string; phone: string; whatsapp: string; email: string; address: string; hours: string; mapsUrl: string; mapsEmbedUrl: string };
  phones: PhoneEntry[];
  quickOrder: string[];
  quickVisible: { address: boolean; hours: boolean; email: boolean };
  quickLayout: { rows: number; columns: number; placement: "flow" | "center" | "manual"; positions: Record<string,string> };
  hero: { title: string; text: string; image: string; showCategory: boolean; showTitle: boolean; showText: boolean; showImage: boolean; showWhatsappCta: boolean; showCallCta: boolean; showMapsCta: boolean };
  about: { title: string; text: string; showInMenu: boolean };
  services: Array<{ id: string; title: string; description: string }>;
  gallery: GalleryItem[];
  socials: { facebook: string; instagram: string; x: string; linkedin: string; youtube: string; urlgo: string; whatsapp: string };
  customSocial: { label: string; url: string; iconUrl: string };
  menuOrder: MenuKey[];
  menuSettings: Record<MenuKey, MenuItemSetting>;
  menuDesign: { enabled: boolean; background: string; text: string; hoverBackground: string; hoverText: string; animation: "none" | "underline" | "fade" | "lift" };
  galleryLayout: { rows: number; columns: number };
  contactForm: { enabled: boolean; captchaEnabled: boolean; captchaType: "none" | "integrated" | "google_v2"; googleSiteKey: string; challengeMethod: "math" | "checkbox" | "question"; challengeQuestion: string; challengeAnswer: string; recipientLabel: string; recipientEmail: string; keepMessageCopy: boolean; timezone: string };
  seo: { allowIndexing: boolean };
  legal: { mode: "predefined" | "custom"; termsHtml: string; privacyHtml: string; showInHeaderMenu: boolean };
  header: { identityType: "initial" | "logo"; initial: string; logo: string; logoShape: "square" | "rectangle"; logoSize: number; maintainAspect: boolean; logoWidth: number; showName: boolean; nameText: string; background: string; text: string };
  footer: { showLogo: boolean; showName: boolean; showContact: boolean; showSocials: boolean; showLegalLinks: boolean; legalText: string; showPoweredBy: boolean; background: string; text: string };
  freeSections: FreeSection[];
  customCode: { css: string; analytics: string };
  modules: ModuleConfig[];
};

export const defaultModules: ModuleConfig[] = [
  { key: "hero", label: "Presentación", active: true, background: "#eef6ff", text: "#13223a", accent: "#1769d2" },
  { key: "quick", label: "Información rápida", active: true, background: "#f1fbf5", text: "#173126", accent: "#159455" },
  { key: "about", label: "Sobre el negocio", active: true, background: "#fff8eb", text: "#352814", accent: "#d88a0a" },
  { key: "services", label: "Servicios / Productos", active: true, background: "#fff1f7", text: "#3a1b2b", accent: "#d92b79" },
  { key: "gallery", label: "Galería", active: true, background: "#eefbfb", text: "#173536", accent: "#119a9e" },
  { key: "location", label: "Ubicación y horarios", active: true, background: "#fff6eb", text: "#3b2918", accent: "#e57b16" },
  { key: "contact", label: "Contacto", active: true, background: "#eef5ff", text: "#17263e", accent: "#1769d2" },
  { key: "social", label: "Redes sociales", active: true, background: "#f6f1ff", text: "#291d3d", accent: "#7352c7" },
  { key: "free1", label: "Sección libre 1", active: false, background: "#ffffff", text: "#172033", accent: "#1769d2" },
  { key: "free2", label: "Sección libre 2", active: false, background: "#f4f7fb", text: "#172033", accent: "#1769d2" },
];

export const demoData: SiteData = {
  business: { name: "Ferretería San Martín", category: "Ferretería", slogan: "Todo para tu hogar, taller y construcción", description: "Herramientas, materiales y asesoramiento para que cada proyecto sea un éxito.", phone: "+595 981 123 456", whatsapp: "595981123456", email: "ventas@sanmartin.com.py", address: "Av. San Martín 1234, Asunción", hours: "Lun. a vie. 08:00–18:30 · Sáb. 08:00–13:00", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Asunción%2C+Paraguay", mapsEmbedUrl: "https://www.google.com/maps?q=Asunción%2C+Paraguay&output=embed" },
  phones: [
    { id:"phone-main", label:"Celular", number:"+595 981 123 456", type:"mobile", showInQuick:false, showInContact:true },
    { id:"phone-whatsapp", label:"WhatsApp", number:"+595 981 123 456", type:"whatsapp", showInQuick:true, showInContact:true },
  ],
  quickOrder: ["address","hours","phone:phone-whatsapp"],
  quickVisible: { address:true, hours:true, email:false },
  quickLayout: { rows:1, columns:3, placement:"flow", positions:{} },
  hero: { title: "Todo para tu hogar, taller y construcción", text: "Calidad, cercanía y asesoramiento para resolver cada proyecto.", image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=1400&q=82", showCategory:true, showTitle:true, showText:true, showImage:true, showWhatsappCta:true, showCallCta:true, showMapsCta:true },
  about: { title: "Más que una ferretería", text: "Somos un negocio familiar con más de 15 años de experiencia. Nos enfocamos en brindar soluciones prácticas y atención personalizada.", showInMenu: true },
  services: [
    { id: "s1", title: "Herramientas eléctricas", description: "Equipos y accesorios para profesionales." },
    { id: "s2", title: "Materiales de construcción", description: "Todo lo necesario para tu obra." },
    { id: "s3", title: "Pinturas y acabados", description: "Color, protección y terminaciones." },
    { id: "s4", title: "Plomería y electricidad", description: "Soluciones para instalaciones y reparaciones." },
  ],
  gallery: [
    { id: "g1", image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=1000&q=80", title: "Herramientas para cada proyecto", description: "Una selección pensada para el trabajo diario.", ctaLabel: "Consultar", ctaUrl: "https://wa.me/595981123456", visible: true },
    { id: "g2", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80", title: "Asesoramiento cercano", description: "Te ayudamos a elegir los materiales adecuados.", ctaLabel: "Escribir por WhatsApp", ctaUrl: "https://wa.me/595981123456", visible: true },
    { id: "g3", image: "https://images.unsplash.com/photo-1426927308491-6380b6a9936f?auto=format&fit=crop&w=1000&q=80", title: "Soluciones profesionales", description: "Productos confiables para obra y mantenimiento.", ctaLabel: "Ver servicios", ctaUrl: "#servicios", visible: true },
  ],
  socials: { facebook: "https://facebook.com", instagram: "https://instagram.com", x: "", linkedin: "https://linkedin.com", youtube: "https://youtube.com", urlgo: "", whatsapp: "" },
  customSocial: { label:"", url:"", iconUrl:"" },
  menuOrder: ["home","services","gallery","about","free1","free2","contact"],
  menuSettings: { home:{visible:true,parent:null}, services:{visible:true,parent:null}, gallery:{visible:true,parent:null}, about:{visible:true,parent:null}, free1:{visible:true,parent:null}, free2:{visible:true,parent:null}, contact:{visible:true,parent:null} },
  menuDesign: { enabled:false, background:"#ffffff", text:"#40506a", hoverBackground:"#eef4fc", hoverText:"#1769d2", animation:"none" },
  galleryLayout: { rows: 1, columns: 3 },
  contactForm: { enabled: true, captchaEnabled: true, captchaType: "integrated", googleSiteKey: "", challengeMethod: "math", challengeQuestion: "¿Cuál es el color del cielo en un día despejado?", challengeAnswer: "azul", recipientLabel: "Atención comercial", recipientEmail:"", keepMessageCopy:false, timezone:"America/Asuncion" },
  seo: { allowIndexing: true },
  legal: { mode: "predefined", termsHtml: "", privacyHtml: "", showInHeaderMenu: false },
  header: { identityType: "initial", initial: "F", logo: "", logoShape: "square", logoSize: 36, maintainAspect: true, logoWidth: 180, showName: true, nameText: "Ferretería San Martín", background: "#ffffff", text: "#172033" },
  footer: { showLogo: true, showName: true, showContact: true, showSocials: false, showLegalLinks: true, legalText: "© 2026 Ferretería San Martín. Todos los derechos reservados.", showPoweredBy: true, background: "#ffffff", text: "#526078" },
  freeSections: [
    { id: "free1", title: "Nuestra experiencia", menuLabel: "Experiencia", publicLabel: "Experiencia", showInMenu: true, html: "<p>Contá aquí una historia, novedad o información especial de tu negocio.</p>", images: [], media: [], ctaLabel: "", ctaUrl: "" },
    { id: "free2", title: "Información adicional", menuLabel: "Más información", publicLabel: "Información", showInMenu: false, html: "<p>Esta segunda sección puede activarse cuando la necesites.</p>", images: [], media: [], ctaLabel: "", ctaUrl: "" },
  ],
  customCode: { css:"", analytics:"" },
  modules: defaultModules,
};

export function normalizeSiteData(input: Partial<SiteData> | null | undefined): SiteData {
  const incomingModules=input?.modules ?? [];
  const normalizedModules=[...incomingModules,...defaultModules.filter(d=>!incomingModules.some(m=>m.key===d.key))];
  const uniqueMenu=[...new Set(input?.menuOrder ?? demoData.menuOrder)].filter((k):k is MenuKey=>demoData.menuOrder.includes(k as MenuKey));
  const legacyPhones:PhoneEntry[]=[
    {id:"phone-main",label:"Teléfono",number:input?.business?.phone||demoData.business.phone,type:"mobile",showInQuick:false,showInContact:true},
    {id:"phone-whatsapp",label:"WhatsApp",number:input?.business?.whatsapp||demoData.business.whatsapp,type:"whatsapp",showInQuick:true,showInContact:true},
  ];
  const phones=(input?.phones?.length?input.phones:legacyPhones).slice(0,12);
  const validQuick=new Set(["address","hours","email",...phones.map(p=>`phone:${p.id}`)]);
  const requestedOrder=input?.quickOrder??["address","hours",...phones.filter(p=>p.showInQuick).map(p=>`phone:${p.id}`)];
  const quickOrder=[...new Set(requestedOrder)].filter(key=>validQuick.has(key));
  return {
    ...demoData,
    ...input,
    business: { ...demoData.business, ...(input?.business ?? {}) },
    phones,
    quickOrder:[...quickOrder,...["address","hours","email",...phones.map(p=>`phone:${p.id}`)].filter(key=>!quickOrder.includes(key))],
    quickVisible: { ...demoData.quickVisible, ...(input?.quickVisible ?? {}) },
    quickLayout: { ...demoData.quickLayout, ...(input?.quickLayout ?? {}), positions:{...demoData.quickLayout.positions,...(input?.quickLayout?.positions??{})} },
    hero: { ...demoData.hero, ...(input?.hero ?? {}) },
    about: { ...demoData.about, ...(input?.about ?? {}) },
    socials: { ...demoData.socials, ...(input?.socials ?? {}) },
    customSocial: { ...demoData.customSocial, ...(input?.customSocial ?? {}) },
    menuOrder: [...uniqueMenu, ...demoData.menuOrder.filter(k=>!uniqueMenu.includes(k))],
    menuSettings: { ...demoData.menuSettings, ...(input?.menuSettings ?? {}), home:{...demoData.menuSettings.home,...(input?.menuSettings?.home??{}),visible:true} },
    menuDesign: { ...demoData.menuDesign, ...(input?.menuDesign ?? {}) },
    galleryLayout: { ...demoData.galleryLayout, ...(input?.galleryLayout ?? {}) },
    contactForm: { ...demoData.contactForm, ...(input?.contactForm ?? {}) },
    seo: { ...demoData.seo, ...(input?.seo ?? {}) },
    legal: { ...demoData.legal, ...(input?.legal ?? {}) },
    header: { ...demoData.header, ...(input?.header ?? {}), identityType: input?.header?.identityType === "initial" ? "initial" : input?.header?.identityType ? "logo" : demoData.header.identityType },
    footer: { ...demoData.footer, ...(input?.footer ?? {}) },
    freeSections: (input?.freeSections ?? demoData.freeSections).map((f,i) => ({ ...demoData.freeSections[i], ...f, media: f.media ?? (f.images ?? []).map((url,j)=>({id:`legacy-${j}`,type:"image" as const,url,caption:""})) })),
    customCode: { ...demoData.customCode, ...(input?.customCode ?? {}) },
    services: input?.services ?? demoData.services,
    gallery: input?.gallery ?? demoData.gallery,
    modules: normalizedModules,
  };
}

export function resetDesign(data: SiteData): SiteData {
  return { ...data, modules: defaultModules.map((m) => ({ ...m })) };
}

export function predefinedTerms(businessName: string) {
  return `<h2>Términos de Servicio</h2><p>Al utilizar este sitio aceptás hacerlo de manera lícita y responsable. La información, disponibilidad, precios y condiciones de los productos o servicios de ${businessName} pueden actualizarse sin previo aviso.</p><p>Las consultas enviadas no constituyen una contratación ni una reserva hasta recibir confirmación expresa del comercio. Los enlaces externos se brindan como referencia y se rigen por las condiciones de sus respectivos proveedores.</p>`;
}

export function predefinedPrivacy(businessName: string) {
  return `<h2>Política de Privacidad</h2><p>${businessName} utiliza los datos enviados mediante sus canales de contacto únicamente para responder consultas, brindar información y gestionar solicitudes relacionadas con sus productos o servicios.</p><p>No se comercializan los datos personales. La persona interesada puede solicitar su actualización o eliminación utilizando los medios de contacto publicados en este sitio.</p>`;
}

export function legalHtml(data: SiteData, kind: "terms" | "privacy") {
  if (data.legal.mode === "custom") return kind === "terms" ? data.legal.termsHtml || predefinedTerms(data.business.name) : data.legal.privacyHtml || predefinedPrivacy(data.business.name);
  return kind === "terms" ? predefinedTerms(data.business.name) : predefinedPrivacy(data.business.name);
}

export const colorSchemes = [
  { id: "original", name: "Original Arandu Go", colors: ["#eef6ff","#f1fbf5","#fff8eb","#fff1f7","#eefbfb","#fff6eb","#eef5ff","#f6f1ff"], text: "#172033", accent: "#1769d2", header: "#ffffff", footer: "#ffffff", chromeText: "#172033" },
  { id: "blue", name: "Azul profesional", colors: ["#eaf2ff","#f1f6ff","#e5efff","#f5f8ff","#edf4ff","#e8f1ff","#f3f7ff","#e7f0ff"], text: "#102443", accent: "#0757c8", header: "#0d1c36", footer: "#0d1c36", chromeText: "#ffffff" },
  { id: "dark", name: "Tecnología oscura", colors: ["#121d31","#17243c","#1b2942","#142136","#1a2b42","#132237","#1d2d46","#16263f"], text: "#edf4ff", accent: "#57a1ff", header: "#091426", footer: "#091426", chromeText: "#ffffff" },
  { id: "green", name: "Verde natural", colors: ["#edf8f1","#e6f5eb","#f4faed","#eaf7ef","#eef9f3","#f4f8e9","#e9f6ee","#f0f8ed"], text: "#173326", accent: "#1d7b4c", header: "#173d2d", footer: "#173d2d", chromeText: "#ffffff" },
  { id: "warm", name: "Cálido comercial", colors: ["#fff5e7","#fff9ed","#fff0dc","#fff6e9","#ffefda","#fff8ea","#fff1df","#fff7eb"], text: "#3a2818", accent: "#d66b12", header: "#492b19", footer: "#492b19", chromeText: "#ffffff" },
  { id: "neutral", name: "Elegante neutro", colors: ["#f4f4f5","#fafafa","#eeeeef","#f7f7f8","#f1f1f2","#f8f8f8","#ededee","#f5f5f6"], text: "#202126", accent: "#555a65", header: "#202126", footer: "#202126", chromeText: "#ffffff" },
] as const;

export function applyColorScheme(data: SiteData, schemeId: string): SiteData {
  const s=colorSchemes.find(x=>x.id===schemeId) ?? colorSchemes[0];
  return { ...data, modules:data.modules.map((m,i)=>({...m,background:s.colors[Math.min(i,s.colors.length-1)],text:s.text,accent:s.accent})), header:{...data.header,background:s.header,text:s.chromeText}, footer:{...data.footer,background:s.footer,text:s.chromeText} };
}
