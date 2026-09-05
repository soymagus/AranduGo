<?php
use AranduGo\Support;
$logoStyle='height:'.min(250,max(28,(int)($d['header']['logoSize']??36))).'px;'.(!empty($d['header']['maintainAspect'])?'width:auto':'width:'.max(40,(int)($d['header']['logoWidth']??180)).'px');
?>
<header class="site-header" style="background:<?=Support::e($d['header']['background']??'#fff')?>;color:<?=Support::e($d['header']['text']??'#172033')?>">
 <a class="identity" href="<?=Support::url()?>"><?php if(($d['header']['identityType']??'initial')==='logo'&&!empty($d['header']['logo'])):?><img src="<?=Support::e($d['header']['logo'])?>" alt="Logo" style="<?=$logoStyle?>"><?php else:?><span class="identity-mark"><?=Support::e($d['header']['initial']??'A')?></span><?php endif;?><?php if(!empty($d['header']['showName'])):?><span><?=Support::e($d['header']['nameText']??$d['business']['name'])?></span><?php endif;?></a>
 <button class="button alt menu-toggle" type="button" aria-controls="mainMenu" aria-expanded="false">Menú</button>
 <nav id="mainMenu"><a href="<?=Support::url()?>#inicio">Inicio</a><a href="<?=Support::url()?>#nosotros">Nosotros</a><a href="<?=Support::url()?>#servicios">Servicios</a><a href="<?=Support::url()?>#galeria">Galería</a><a href="<?=Support::url()?>#contacto">Contacto</a></nav>
</header>
