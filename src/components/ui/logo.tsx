import { YodevBrand, BrandSymbol } from "@/brand/brand";
export function Logo({ size = "md", showText = true, className = "" }: { size?: "sm" | "md" | "lg"; showText?: boolean; className?: string }) { return showText ? <YodevBrand className={`${size === "sm" ? "text-lg" : size === "lg" ? "text-3xl" : "text-2xl"} ${className}`} /> : <BrandSymbol className={`y-symbol ${className}`} />; }
export function LogoDots({ className = "" }: { size?: string; className?: string }) { return <BrandSymbol className={`y-symbol ${className}`} />; }
export function LogoDotsSVG({ size = 32 }: { size?: number }) { return <BrandSymbol style={{ width: size, height: size }} />; }
