<?php
use AranduGo\Support;
$system=is_file(__DIR__.'/../config/system.php')?require __DIR__.'/../config/system.php':[];
$socialLabels=$socialLabels??['facebook'=>'Facebook','instagram'=>'Instagram','x'=>'X','linkedin'=>'LinkedIn','youtube'=>'YouTube','tiktok'=>'TikTok','urlgo'=>'URLGO.me','whatsapp'=>'WhatsApp'];
$footerSocials='';if(!empty($d['footer']['showSocials']))foreach($d['socials']??[] as $network=>$url)if($url)$footerSocials.='<a class="social-icon social-'.Support::e($network).'" href="'.Support::e($url).'" target="_blank" rel="noopener" aria-label="'.Support::e($socialLabels[$network]??$network).'"><span aria-hidden="true">'.Support::e($socialLabels[$network]??$network).'</span></a>';
?>
<footer class="site-footer" style="background:<?=Support::e($d['footer']['background']??'#fff')?>;color:<?=Support::e($d['footer']['text']??'#526078')?>">
 <?php if(!empty($d['footer']['showLogo'])||!empty($d['footer']['showName'])):?><div class="footer-identity"><?php if(!empty($d['footer']['showLogo'])):?><?php if(($d['header']['identityType']??'initial')==='logo'&&!empty($d['header']['logo'])):?><img src="<?=Support::e($d['header']['logo'])?>" alt=""><?php else:?><span class="identity-mark"><?=Support::e($d['header']['initial']??'A')?></span><?php endif;?><?php endif;?><?php if(!empty($d['footer']['showName'])):?><strong><?=Support::e($d['header']['nameText']??$d['business']['name'])?></strong><?php endif;?></div><?php endif;?>
 <?php if(!empty($d['footer']['showContact'])):?><p class="footer-contact"><?=Support::e($d['business']['email']??'')?></p><?php endif;?>
 <div class="footer-links"><?=$footerSocials?><?php if(!empty($d['footer']['showLegalLinks'])):?><a href="<?=Support::url('terminos.php')?>">Términos de Servicio</a><a href="<?=Support::url('privacidad.php')?>">Política de Privacidad</a><?php endif;?></div>
 <p><?=Support::e($d['footer']['legalText']??'')?><?php if(!empty($system['branding']['show_powered_by'])):?> · <strong><?=Support::e($system['branding']['powered_by_text']??'Powered by Arandu Cloud')?></strong><?php endif;?></p>
</footer>
