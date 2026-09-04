import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faLinkedinIn, faYoutube } from "@fortawesome/free-brands-svg-icons";
const entries=[{key:"facebook",icon:faFacebookF,color:"#1877F2"},{key:"instagram",icon:faInstagram,color:"#E4405F"},{key:"linkedin",icon:faLinkedinIn,color:"#0A66C2"},{key:"youtube",icon:faYoutube,color:"#FF0000"}] as const;
export default function SocialIcons({socials}:{socials:Record<string,string>}){return <div>{entries.map(x=>socials[x.key]&&<a key={x.key} href={socials[x.key]} aria-label={x.key} style={{color:x.color}}><FontAwesomeIcon icon={x.icon}/></a>)}</div>}
