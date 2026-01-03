"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Badge } from "@/components/ui/badge";
import { FadeIn, SlideIn } from "@/components/motion";
import { CtaSection } from "@/components/sections";
import {
  Users,
  Rocket,
  MessageSquare,
  Zap,
  BarChart3,
  Wrench,
  X,
  Sparkles,
  Code,
  Palette,
  Server,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ValueItem = {
  title: string;
  description: string;
};

type StatItem = {
  value: string;
  label: string;
};

const valueIcons = [Rocket, MessageSquare, Zap, BarChart3, Wrench, X];

const teamMembers = [
  {
    name: "Yoan Andrieux",
    role: "Lead Dev & IA",
    expertise: ["Architecture", "LLMs", "React", "Node.js"],
    icon: Code,
    color: "from-primary/20 to-blue-500/20",
  },
  {
    name: "Thomas Martin",
    role: "Full-Stack Senior",
    expertise: ["Next.js", "TypeScript", "AWS", "PostgreSQL"],
    icon: Server,
    color: "from-blue-500/20 to-purple-500/20",
  },
  {
    name: "Léa Dubois",
    role: "UX/UI Designer",
    expertise: ["Design Systems", "Figma", "Prototyping"],
    icon: Palette,
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    name: "Marc Laurent",
    role: "DevOps & Sécurité",
    expertise: ["Kubernetes", "CI/CD", "Pentests", "SOC2"],
    icon: Shield,
    color: "from-orange-500/20 to-red-500/20",
  },
];

export default function TeamPage() {
  const t = useTranslations("TeamPage");
  const values = t.raw("values") as ValueItem[];
  const stats = t.raw("stats") as StatItem[] | undefined;

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-500/10 via-transparent to-primary/10" />
        <div className="absolute inset-0 -z-10 opacity-30 bg-grid-dots" />

        {/* Decorative elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <Badge variant="primary" className="mb-6">
                <Users className="w-3 h-3 mr-1" />
                {t("eyebrow")}
              </Badge>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-[1.1] mb-6">
                <span className="text-gradient">{t("title")}</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto">
                {t("subtitle")}
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Stats Bar */}
      {stats && stats.length > 0 && (
        <section className="py-12 border-y border-white/5">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <p className="text-3xl md:text-4xl font-display font-black text-primary">
                    {stat.value}
                  </p>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Team Grid */}
      <section className="py-24">
        <Container>
          <div className="text-center mb-16">
            <FadeIn>
              <Badge variant="outline" className="mb-4">
                <Sparkles className="w-3 h-3 mr-1" />
                L'équipe
              </Badge>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-display font-bold">
                4 profils complémentaires
              </h2>
            </FadeIn>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => {
              const Icon = member.icon;
              return (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <GlassPanel className="p-6 rounded-2xl h-full hover:border-primary/30 transition-all duration-300 group">
                    {/* Avatar */}
                    <div
                      className={cn(
                        "w-20 h-20 rounded-2xl bg-gradient-to-br flex items-center justify-center mx-auto mb-4",
                        member.color
                      )}
                    >
                      <Icon className="w-10 h-10 text-white/60" />
                    </div>

                    <div className="text-center">
                      <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-sm text-primary font-medium mb-4">
                        {member.role}
                      </p>

                      {/* Expertise tags */}
                      <div className="flex flex-wrap justify-center gap-2">
                        {member.expertise.map((skill) => (
                          <span
                            key={skill}
                            className="text-xs px-2 py-1 rounded-full bg-white/5 text-muted"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </GlassPanel>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-dark/50">
        <Container>
          <div className="text-center mb-16">
            <FadeIn>
              <Badge variant="outline" className="mb-4">
                {t("valuesEyebrow")}
              </Badge>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-display font-bold">
                {t("valuesTitle")}
              </h2>
            </FadeIn>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => {
              const Icon = valueIcons[index] || Rocket;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  viewport={{ once: true }}
                >
                  <GlassPanel className="p-6 rounded-2xl h-full hover:border-primary/30 transition-all duration-300 group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-all">
                        <Icon className="w-6 h-6 text-primary group-hover:text-dark transition-colors" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-2">{value.title}</h3>
                        <p className="text-sm text-muted">{value.description}</p>
                      </div>
                    </div>
                  </GlassPanel>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Work Culture Section */}
      <section className="py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <Badge variant="outline" className="mb-4">
                Culture
              </Badge>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Remote-first, résultats-focused
              </h2>
              <div className="space-y-4 text-muted">
                <p>
                  On travaille d'où on veut, quand on veut. Ce qui compte, c'est
                  ce qu'on livre, pas le nombre d'heures passées devant l'écran.
                </p>
                <p>
                  Chaque semaine : un sync d'équipe de 30 minutes. Le reste du
                  temps ? Focus sur le code et les livrables.
                </p>
              </div>
            </FadeIn>

            <SlideIn direction="right">
              <GlassPanel className="p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-transparent">
                <h3 className="font-bold mb-6 text-lg">Ce qu'on offre :</h3>
                <div className="space-y-4">
                  {[
                    "100% remote (ou Paris si tu préfères)",
                    "Projets variés et stimulants",
                    "Stack moderne (Next.js, TypeScript, LLMs)",
                    "Équipe senior, pas de micro-management",
                    "Rémunération compétitive",
                    "Temps pour la veille et l'expérimentation",
                  ].map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-sm">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </GlassPanel>
            </SlideIn>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <CtaSection
        eyebrow={t("ctaEyebrow")}
        title={t("ctaTitle")}
        subtitle={t("ctaSubtitle")}
        ctaLabel={t("ctaButton")}
        ctaHref="/careers"
        variant="card"
      />
    </>
  );
}
