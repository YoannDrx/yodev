import { DM_Sans, Fira_Code } from "next/font/google";
const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"], display: "swap" });
const firaCode = Fira_Code({ variable: "--font-fira", subsets: ["latin"], display: "swap" });
export const fontVariables = `${dmSans.variable} ${firaCode.variable} antialiased`;
