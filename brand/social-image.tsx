import { ImageResponse } from "next/og";
import { signalPath, signalPoints, symbolPath, type YodevProduct } from "./brand";
import manifest from "./manifest.json";
export function brandImage(product: YodevProduct | "yodev", width: number, height: number, headline?: string) {
 const { accent, onAccent } = manifest.products[product];
 const label = product === "yodev" ? "yodev" : `yodev ${product[0].toUpperCase()+product.slice(1)}`;
 const mark = headline ? 56 : Math.min(width, height) * .72;
 const symbol = product === "yodev"
  ? <svg width={mark} height={mark} viewBox="0 0 32 32" fill={accent}><path d={symbolPath}/></svg>
  : <div style={{display:"flex",alignItems:"center",justifyContent:"center",width:mark,height:mark,borderRadius:mark*.25,background:accent}}><svg width={mark*.62} height={mark*.62} viewBox="0 0 32 32" fill={onAccent}><path d={symbolPath}/></svg></div>;
 const signal = signalPath(signalPoints({ width, baseline: 70, amplitude: 52, spikes: [width * .72], ripple: 0 }));
 return new ImageResponse(<div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:headline?"space-between":"center",alignItems:headline?"flex-start":"center",background:manifest.colors.background,color:manifest.colors.text,padding:headline?"64px 64px 0":width*.14}}><div style={{display:"flex",alignItems:"center",gap:20}}>{symbol}{headline && <span style={{fontSize:40,fontWeight:600,letterSpacing:"-0.04em"}}>{label}</span>}</div>{headline && <><div style={{fontSize:64,lineHeight:1.02,letterSpacing:"-0.05em",maxWidth:1040}}>{headline}</div><div style={{display:"flex",flexDirection:"column",width,marginLeft:-64}}><div style={{display:"flex",fontSize:22,color:manifest.colors.muted,padding:"0 64px 8px"}}>{product === "yodev" ? "yodev.fr" : `${product}.yodev.fr`}</div><svg width={width} height={120} viewBox={`0 0 ${width} 120`}><path d={signal} fill="none" stroke={accent} strokeWidth={3} strokeLinejoin="round" strokeLinecap="round"/><circle cx={width*.72} cy={18} r={7} fill={accent}/></svg></div></>}</div>,{width,height});
}
