<?php
return [
 'business'=>['name'=>'Ferretería San Martín','category'=>'Ferretería','slogan'=>'Todo para tu hogar, taller y construcción','description'=>'Calidad, cercanía y asesoramiento para resolver cada proyecto.','email'=>'ventas@sanmartin.com.py','address'=>'Av. San Martín 1234, Asunción','hours'=>'Lun. a vie. 08:00–18:30 · Sáb. 08:00–13:00','mapsUrl'=>'https://www.google.com/maps/search/?api=1&query=Asuncion%2C+Paraguay','mapsEmbedUrl'=>'https://www.google.com/maps?q=Asuncion%2C+Paraguay&output=embed'],
 'phones'=>[
  ['id'=>'phone-main','label'=>'Celular','number'=>'+595 981 123 456','type'=>'mobile','showInQuick'=>false,'showInContact'=>true],
  ['id'=>'phone-whatsapp','label'=>'WhatsApp','number'=>'+595 981 123 456','type'=>'whatsapp','showInQuick'=>true,'showInContact'=>true]
 ],
 'quickOrder'=>['address','hours','phone:phone-whatsapp'],'quickVisible'=>['address'=>true,'hours'=>true,'email'=>false],'quickLayout'=>['rows'=>1,'columns'=>3,'placement'=>'flow','positions'=>[]],
 'hero'=>['title'=>'Todo para tu hogar, taller y construcción','text'=>'Calidad, cercanía y asesoramiento para resolver cada proyecto.','image'=>'','showCategory'=>true,'showTitle'=>true,'showText'=>true,'showImage'=>true,'showWhatsappCta'=>true,'showCallCta'=>true,'showMapsCta'=>true],
 'about'=>['title'=>'Más que una ferretería','text'=>'Somos un negocio con experiencia, productos confiables y atención personalizada.','showInMenu'=>true],
 'services'=>[
  ['id'=>'s1','title'=>'Herramientas eléctricas','description'=>'Equipos y accesorios para profesionales.'],
  ['id'=>'s2','title'=>'Materiales de construcción','description'=>'Todo lo necesario para tu obra.'],
  ['id'=>'s3','title'=>'Pinturas y acabados','description'=>'Color, protección y terminaciones.']
 ],
 'gallery'=>[], 'galleryLayout'=>['rows'=>1,'columns'=>3],
 'socials'=>['facebook'=>'','instagram'=>'','x'=>'','linkedin'=>'','youtube'=>'','urlgo'=>'','whatsapp'=>''],
 'customSocial'=>['label'=>'','url'=>'','iconUrl'=>''],
 'menuOrder'=>['home','services','gallery','about','free1','free2','contact'],
 'menuSettings'=>['home'=>['visible'=>true,'parent'=>null],'services'=>['visible'=>true,'parent'=>null],'gallery'=>['visible'=>true,'parent'=>null],'about'=>['visible'=>true,'parent'=>null],'free1'=>['visible'=>false,'parent'=>null],'free2'=>['visible'=>false,'parent'=>null],'contact'=>['visible'=>true,'parent'=>null]],
 'menuDesign'=>['enabled'=>false,'background'=>'#ffffff','text'=>'#40506a','hoverBackground'=>'#eef4fc','hoverText'=>'#1769d2','animation'=>'none'],
 'contactForm'=>['enabled'=>true,'captchaType'=>'integrated','googleSiteKey'=>'','challengeMethod'=>'math','challengeQuestion'=>'¿Cuál es el color del cielo?','challengeAnswer'=>'azul','recipientEmail'=>'','keepMessageCopy'=>false,'timezone'=>'America/Asuncion'],
 'seo'=>['allowIndexing'=>true],
 'legal'=>['mode'=>'predefined','termsHtml'=>'','privacyHtml'=>'','showInHeaderMenu'=>false],
 'header'=>['identityType'=>'initial','initial'=>'F','logo'=>'','logoShape'=>'square','logoSize'=>36,'maintainAspect'=>true,'logoWidth'=>180,'showName'=>true,'nameText'=>'Ferretería San Martín','background'=>'#ffffff','text'=>'#172033'],
 'footer'=>['showLogo'=>true,'showName'=>true,'showContact'=>true,'showSocials'=>false,'showLegalLinks'=>true,'legalText'=>'© 2026 Ferretería San Martín. Todos los derechos reservados.','showPoweredBy'=>true,'background'=>'#ffffff','text'=>'#526078'],
 'freeSections'=>[
  ['id'=>'free1','title'=>'Nuestra experiencia','menuLabel'=>'Experiencia','publicLabel'=>'Experiencia','showInMenu'=>false,'html'=>'<p>Contá aquí una historia o novedad de tu negocio.</p>','media'=>[],'ctaLabel'=>'','ctaUrl'=>''],
  ['id'=>'free2','title'=>'Información adicional','menuLabel'=>'Más información','publicLabel'=>'Información','showInMenu'=>false,'html'=>'<p>Esta segunda sección puede activarse cuando la necesites.</p>','media'=>[],'ctaLabel'=>'','ctaUrl'=>'']
 ],
 'customCode'=>['css'=>'','analytics'=>''],
 'modules'=>[
  ['key'=>'hero','label'=>'Presentación','active'=>true,'background'=>'#eef6ff','text'=>'#13223a','accent'=>'#1769d2'],
  ['key'=>'quick','label'=>'Información rápida','active'=>true,'background'=>'#f1fbf5','text'=>'#173126','accent'=>'#159455'],
  ['key'=>'about','label'=>'Sobre el negocio','active'=>true,'background'=>'#fff8eb','text'=>'#352814','accent'=>'#d88a0a'],
  ['key'=>'services','label'=>'Servicios / Productos','active'=>true,'background'=>'#fff1f7','text'=>'#3a1b2b','accent'=>'#d92b79'],
  ['key'=>'gallery','label'=>'Galería','active'=>true,'background'=>'#eefbfb','text'=>'#173536','accent'=>'#119a9e'],
  ['key'=>'location','label'=>'Ubicación y horarios','active'=>true,'background'=>'#fff6eb','text'=>'#3b2918','accent'=>'#e57b16'],
  ['key'=>'contact','label'=>'Contacto','active'=>true,'background'=>'#eef5ff','text'=>'#17263e','accent'=>'#1769d2'],
  ['key'=>'social','label'=>'Redes sociales','active'=>true,'background'=>'#f6f1ff','text'=>'#291d3d','accent'=>'#7352c7'],
  ['key'=>'free1','label'=>'Sección libre 1','active'=>false,'background'=>'#ffffff','text'=>'#172033','accent'=>'#1769d2'],
  ['key'=>'free2','label'=>'Sección libre 2','active'=>false,'background'=>'#f4f7fb','text'=>'#172033','accent'=>'#1769d2']
 ]
];
