"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Server,
  ShoppingBag,
  Cpu,
  Palette,
  Shield,
  TrendingUp,
  Check,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Link } from "@/i18n/navigation";
import { FadeIn, SlideIn } from "@/components/motion";
import { CtaSection, FaqList } from "@/components/sections";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: Globe,
    title: "Développement Web",
    description: "Applications haute performance avec Next.js & architectures scalables par défaut.",
    features: ["SPA & SSR Apps", "SEO & Performance", "APIs & Intégrations"],
    slug: "web",
    color: "primary",
  },
  {
    icon: Smartphone,
    title: "Développement Mobile",
    description: "Expériences fluides et natives sur iOS & Android pour une rétention maximale.",
    features: ["React Native / Flutter", "Swift & Kotlin Native", "PWA à forte valeur"],
    slug: "mobile",
    color: "primary",
  },
  {
    icon: Server,
    title: "Solutions SaaS",
    description: "Conception de plateformes multi-tenant avec gestion complexe d'abonnements.",
    features: ["Stripe Integration", "Infrastructure Multi-tenant", "Dashboard Analytic"],
    slug: "custom-software",
    color: "primary",
  },
  {
    icon: ShoppingBag,
    title: "E-Commerce",
    description: "Boutiques ultra-rapides via Headless Commerce pour un taux de conversion record.",
    features: ["Shopify Headless / Medusa", "Core Web Vitals", "Checkout Personnalisé"],
    slug: "ecommerce",
    color: "primary",
  },
];

const aiService = {
  icon: Cpu,
  title: "IA & LLM Integration",
  description: "Donnez des super-pouvoirs à votre infrastructure. Nous intégrons les derniers modèles (OpenAI, Claude, Llama 3) via RAG pour des agents IA métier performants et sécurisés.",
  features: [
    "Chatbots & Agents RAG",
    "Automatisation de workflow",
    "Analyse prédictive & Data",
    "Computer Vision & OCR",
  ],
  slug: "ai",
  badge: "Expertise 2026",
};

const moreServices = [
  {
    icon: Palette,
    title: "UX/UI Design",
    description: "Interfaces intuitives basées sur la psychologie utilisateur et l'accessibilité.",
    features: ["Audit UX & Heatmaps", "Design System Scalable", "Prototypes Haute-Fidélité"],
    slug: "ux-design",
    color: "primary",
  },
  {
    icon: Shield,
    title: "Cybersécurité",
    description: "Blindage de vos actifs numériques contre les vulnérabilités OWASP et conformité RGPD.",
    features: ["Pentesting & Audits", "Hardening Serveur", "Compliance (SOC2)"],
    slug: "cybersecurity",
    color: "primary",
  },
  {
    icon: TrendingUp,
    title: "Consulting & Stratégie",
    description: "Audit de votre stack technique et roadmap de transformation digitale sur 12-24 mois.",
    features: ["Modernisation Legacy", "Cloud Migration (AWS)", "CTO as a Service"],
    slug: null,
    color: "primary",
  },
];

const stats = [
  { value: "200+", label: "Projets Livrés" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "12 sem.", label: "Délai Moyen MVP" },
  { value: "15+", label: "Experts Seniors" },
];

const faqItems = [
  {
    question: "Quel est votre processus de développement ?",
    answer: "Nous fonctionnons en cycle Agile (Scrum). Nous divisons le projet en Sprints de 2 semaines avec des livrables testables à chaque fin de cycle. Vous avez accès à un environnement de staging et un dashboard de suivi en temps réel.",
  },
  {
    question: "Combien de temps faut-il pour un projet ?",
    answer: "Un MVP (Minimum Viable Product) robuste prend généralement entre 8 et 14 semaines. Les audits stratégiques ou missions d'intégration IA peuvent varier de 2 à 6 semaines selon la complexité des données.",
  },
  {
    question: "Travaillez-vous avec des startups early-stage ?",
    answer: "Oui, nous avons un framework dédié aux startups pour valider le Product-Market Fit rapidement sans sacrifier la qualité technique nécessaire pour les levées de fonds futures.",
  },
  {
    question: "Faites-vous du Staff Augmentation ?",
    answer: "Tout à fait. Nous pouvons intégrer un ou plusieurs experts (Dev, IA, Product) directement dans vos squads existantes pour accélérer vos roadmaps internes.",
  },
];

type ServiceType = {
  icon: typeof Globe;
  title: string;
  description: string;
  features: string[];
  slug: string | null;
  color: string;
};

function ServiceCard({
  service,
  index,
  large = false,
}: {
  service: ServiceType;
  index: number;
  large?: boolean;
}) {
  const Icon = service.icon;
  const href = service.slug ? `/services/${service.slug}` : "/expertise";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Link href={href as "/services/web"}>
        <GlassPanel
          className={cn(
            "p-8 rounded-[2rem] flex flex-col group h-full",
            "hover:bg-white/5 hover:-translate-y-2 hover:border-primary/40 transition-all duration-300"
          )}
        >
          <div
            className={cn(
              "w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6",
              "group-hover:bg-primary group-hover:text-dark transition-all"
            )}
          >
            <Icon className="w-6 h-6" />
          </div>
          <h3 className={cn("font-bold mb-3", large ? "text-2xl" : "text-xl")}>
            {service.title}
          </h3>
          <p className="text-sm text-muted mb-6 leading-relaxed flex-grow">
            {service.description}
          </p>
          <ul className="space-y-2 mb-8 text-xs text-muted font-medium">
            {service.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <Check className="w-3 h-3 text-primary flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <span className="inline-flex items-center text-primary text-sm font-bold group-hover:translate-x-1 transition-transform">
            Découvrir
            <ArrowRight className="ml-2 w-4 h-4" />
          </span>
        </GlassPanel>
      </Link>
    </motion.div>
  );
}

export default function ServicesPage() {
  const t = useTranslations("ServicesPage");
  const common = useTranslations("Common");

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <FadeIn>
                <Badge variant="primary" className="mb-4">
                  Nos piliers d'excellence
                </Badge>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1 className="text-5xl lg:text-7xl font-display font-extrabold leading-[1.1]">
                  <span className="text-gradient">Services Digitaux</span>
                  <br />
                  <span className="text-primary italic">Complets.</span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
                  De la conception à la maintenance. Tout ce qu'il faut pour dominer votre marché grâce à une ingénierie de pointe et une approche centrée sur le ROI.
                </p>
              </FadeIn>
            </div>

            <SlideIn direction="right" className="hidden lg:block">
              <GlassPanel className="p-6 rounded-3xl border-primary/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  <span className="text-[10px] font-mono text-muted">yodev-stack-navigator.sh</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-dark/50 p-3 rounded-xl border border-white/5 text-[11px] font-mono">
                    <span className="text-primary font-bold">FE:</span> Next.js 14, React, Tailwind
                  </div>
                  <div className="bg-dark/50 p-3 rounded-xl border border-white/5 text-[11px] font-mono">
                    <span className="text-secondary font-bold">BE:</span> Node.js, Python, Go
                  </div>
                  <div className="bg-dark/50 p-3 rounded-xl border border-white/5 text-[11px] font-mono">
                    <span className="text-blue-400 font-bold">AI:</span> OpenAI, Claude, Llama 3
                  </div>
                  <div className="bg-dark/50 p-3 rounded-xl border border-white/5 text-[11px] font-mono">
                    <span className="text-purple-400 font-bold">OPS:</span> AWS, Vercel, Docker
                  </div>
                </div>
              </GlassPanel>
            </SlideIn>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="pb-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}

            {/* AI Service - Large Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <Link href={`/services/${aiService.slug}` as "/services/ai"}>
                <GlassPanel
                  className={cn(
                    "p-8 rounded-[2rem] flex flex-col group h-full",
                    "bg-gradient-to-br from-primary/5 via-transparent to-secondary/5",
                    "border-primary/30 hover:border-primary/50 transition-all duration-300"
                  )}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 bg-primary text-dark rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(27,168,150,0.4)] animate-pulse">
                      <Cpu className="w-8 h-8" />
                    </div>
                    <Badge variant="accent" size="sm">
                      {aiService.badge}
                    </Badge>
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-4">{aiService.title}</h3>
                  <p className="text-muted mb-8 text-lg leading-relaxed max-w-lg">
                    {aiService.description}
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {aiService.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-xs font-bold">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <ButtonLink
                    href={`/services/${aiService.slug}` as "/services/ai"}
                    className="mt-auto self-start"
                    size="lg"
                  >
                    Voir nos solutions IA
                  </ButtonLink>
                </GlassPanel>
              </Link>
            </motion.div>

            {/* More Services */}
            {moreServices.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index + 5} />
            ))}
          </div>
        </Container>
      </section>

      {/* Stats Bar */}
      <section className="pb-24">
        <Container>
          <GlassPanel className="rounded-3xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center flex-1">
                <motion.p
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-4xl font-display font-black text-text mb-1"
                >
                  {stat.value}
                </motion.p>
                <p className="text-xs font-bold uppercase tracking-widest text-primary">
                  {stat.label}
                </p>
                {index < stats.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-white/10" />
                )}
              </div>
            ))}
          </GlassPanel>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="pb-32">
        <Container className="max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              Questions Fréquentes
            </h2>
            <p className="text-muted">
              Tout ce qu'il faut savoir avant de démarrer notre partenariat.
            </p>
          </div>

          <FaqList items={faqItems} columns={1} />
        </Container>
      </section>

      {/* CTA Section */}
      <CtaSection
        title="Une vision technique sans compromis."
        subtitle="Nos experts sont prêts à auditer votre projet et proposer une roadmap d'accélération sous 48h."
        ctaLabel="Discutons de votre projet"
        ctaHref="/contact"
        secondaryLabel="Notre Tech Stack"
        secondaryHref="/expertise"
        variant="card"
      />
    </>
  );
}
