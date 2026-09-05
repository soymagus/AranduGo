import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { MessageSquareText, PhoneCall, Smartphone } from "lucide-react";
import type { PhoneType } from "@/lib/site-data";

export default function PhoneIcon({type}:{type:PhoneType}){
  if(type==="whatsapp") return <FontAwesomeIcon icon={faWhatsapp}/>;
  if(type==="mobile") return <span className="mobile-phone-icon"><Smartphone/><MessageSquareText/></span>;
  return <PhoneCall/>;
}
