import { getPageLocale, type LocalizedPageProps } from "@/i18n/page-locale";
import { pageMetadata } from "@/lib/site";
import { ContactSection } from "@/components/site/contact-section";
export default async function ContactPage({ params }: LocalizedPageProps) { await getPageLocale(params); return <ContactSection />; }

export async function generateMetadata({ params }: LocalizedPageProps) { return pageMetadata("contact", await getPageLocale(params)); }
