import { brandImage } from "@/brand/social-image";
export const alt = "Yodev";
export const size = {width:1200,height:630};
export const contentType = "image/png";
export default async function Image({params}:{params:Promise<{locale:string}>}) { const {locale}=await params; return brandImage("yodev",1200,630,locale === "en" ? "Useful software. From the first screen to launch." : "Des logiciels utiles. Du premier écran à la mise en ligne."); }
