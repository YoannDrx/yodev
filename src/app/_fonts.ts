import { Geist, Geist_Mono } from "next/font/google";
const body = Geist({ variable: "--font-yodev-body", subsets: ["latin"], display: "swap" });
const mono = Geist_Mono({ variable: "--font-yodev-mono", subsets: ["latin"], display: "swap" });
export const fontVariables = `${body.variable} ${mono.variable} antialiased`;
