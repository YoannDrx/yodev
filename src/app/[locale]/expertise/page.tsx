"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { FadeIn, SlideIn } from "@/components/motion";
import { CtaSection } from "@/components/sections";
import { cn } from "@/lib/utils";
import {
  Code,
  Brain,
  Cloud,
  Shield,
  Palette,
  Database,
  Smartphone,
  Server,
  ArrowRight,
  CheckCircle,
  Zap,
  Award,
  Users,
  TrendingUp,
} from "lucide-react";
import { Link } from "@/i18n/navigation";

const techStacks = [
  {
    category: "Frontend",
    icon: Code,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    techs: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    icon: Server,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    techs: ["Node.js", "Python", "Go", "PostgreSQL", "Redis"],
  },
  {
    category: "IA & Data",
    icon: Brain,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    techs: ["GPT-4 / Claude", "LangChain", "TensorFlow", "PyTorch", "Pinecone"],
  },
  {
    category: "Cloud & DevOps",
    icon: Cloud,
    color: "text-primary",
    bgColor: "bg-primary/10",
    techs: ["AWS", "Vercel", "Docker", "Kubernetes", "Terraform"],
  },
  {
    category: "Mobile",
    icon: Smartphone,
    color: "text-pink-400",
    bgColor: "bg-pink-400/10",
    techs: ["React Native", "Flutter", "Swift", "Kotlin", "PWA"],
  },
  {
    category: "Sécurité",
    icon: Shield,
    color: "text-red-400",
    bgColor: "bg-red-400/10",
    techs: ["OWASP", "Pentest", "SOC2", "RGPD", "ISO 27001"],
  },
];

const certifications = [
  { name: "AWS Solutions Architect", icon: "🏆" },
  { name: "Google Cloud Professional", icon: "🎯" },
  { name: "OSCP Certified", icon: "🔐" },
  { name: "Kubernetes Administrator", icon: "⚡" },
];

const expertiseAreas = [
  {
    title: "Architecture Scalable",
    description:
      "Conception d'architectures cloud-native capables de supporter des millions d'utilisateurs.",
    icon: Server,
    metrics: "99.99% uptime",
    link: "/services/web",
  },
  {
    title: "Intelligence Artificielle",
    description:
      "Intégration de LLMs, RAG, et systèmes prédictifs dans vos applications métier.",
    icon: Brain,
    metrics: "+400K contenus/an",
    link: "/services/ai",
  },
  {
    title: "Cybersécurité",
    description:
      "Audits, pentests et mise en conformité pour protéger vos données sensibles.",
    icon: Shield,
    metrics: "0 breach post-audit",
    link: "/services/cybersecurity",
  },
  {
    title: "Expérience Utilisateur",
    description:
      "Design centré utilisateur, tests UX et interfaces accessibles pour maximiser l'engagement.",
    icon: Palette,
    metrics: "+60% conversion",
    link: "/services/ux-design",
  },
] as const;

const stats = [
  { value: "200+", label: "Projets livrés", icon: CheckCircle },
  { value: "15+", label: "Experts seniors", icon: Users },
  { value: "98%", label: "Satisfaction client", icon: TrendingUp },
  { value: "50+", label: "Projets IA en prod", icon: Brain },
];

export default function ExpertisePage() {
  const t = useTranslations("ExpertisePage");

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10" />
        <div className="absolute inset-0 -z-10 opacity-30 bg-grid-dots" />

        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <Badge variant="primary" className="mb-6">
                Expertise Technique
              </Badge>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-extrabold leading-[1.1] mb-6">
                <span className="text-gradient">Stack Moderne.</span>
                <br />
                <span className="text-primary">Équipe Senior.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10">
                De la conception à la production, nous maîtrisons les
                technologies qui font la différence. Pas de juniors, que des
                experts avec +10 ans d'expérience.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-wrap justify-center gap-4">
                <ButtonLink
                  href="/contact"
                  size="lg"
                  className="px-8 shadow-[0_0_30px_rgba(27,168,150,0.3)]"
                >
                  Discuter de votre projet
                  <ArrowRight className="ml-2 h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="/work" variant="glass" size="lg">
                  Voir nos réalisations
                </ButtonLink>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Stats Bar */}
      <section className="py-12 border-y border-white/5">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <p className="text-3xl md:text-4xl font-display font-black text-text">
                    {stat.value}
                  </p>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Tech Stack Grid */}
      <section className="py-24">
        <Container>
          <div className="text-center mb-16">
            <FadeIn>
              <Badge variant="outline" className="mb-4">
                Stack Technique
              </Badge>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
                Technologies Maîtrisées
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-muted max-w-xl mx-auto">
                Nous choisissons les meilleures technologies pour chaque projet,
                pas celles qui sont à la mode.
              </p>
            </FadeIn>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {techStacks.map((stack, index) => {
              const Icon = stack.icon;
              return (
                <motion.div
                  key={stack.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <GlassPanel className="p-6 rounded-2xl h-full hover:border-primary/30 transition-all duration-300">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                        stack.bgColor
                      )}
                    >
                      <Icon className={cn("w-6 h-6", stack.color)} />
                    </div>
                    <h3 className="text-lg font-bold mb-4">{stack.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {stack.techs.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          size="sm"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </GlassPanel>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Expertise Areas */}
      <section className="py-24 bg-dark/50">
        <Container>
          <div className="text-center mb-16">
            <FadeIn>
              <Badge variant="outline" className="mb-4">
                Domaines d'Excellence
              </Badge>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
                Nos Spécialités
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-muted max-w-xl mx-auto">
                Des expertises pointues pour répondre aux défis techniques les
                plus complexes.
              </p>
            </FadeIn>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {expertiseAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={area.link}>
                    <GlassPanel className="p-8 rounded-2xl h-full group hover:border-primary/40 transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-dark transition-all">
                          <Icon className="w-7 h-7" />
                        </div>
                        <Badge variant="accent" size="sm">
                          {area.metrics}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{area.title}</h3>
                      <p className="text-sm text-muted mb-4">
                        {area.description}
                      </p>
                      <span className="inline-flex items-center text-primary text-sm font-bold group-hover:translate-x-1 transition-transform">
                        En savoir plus
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </span>
                    </GlassPanel>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Certifications */}
      <section className="py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <FadeIn>
                <Badge variant="outline" className="mb-4">
                  Certifications
                </Badge>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                  Des Experts Certifiés
                </h2>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-muted mb-8">
                  Notre équipe maintient ses certifications à jour pour vous
                  garantir les meilleures pratiques du marché. Pas de juniors
                  sur vos projets, uniquement des seniors expérimentés.
                </p>
              </FadeIn>

              <div className="grid grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <GlassPanel className="p-4 rounded-xl flex items-center gap-3">
                      <span className="text-2xl">{cert.icon}</span>
                      <span className="text-sm font-medium">{cert.name}</span>
                    </GlassPanel>
                  </motion.div>
                ))}
              </div>
            </div>

            <SlideIn direction="right">
              <GlassPanel className="p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />

                <div className="relative">
                  <Award className="w-16 h-16 text-primary mb-6" />
                  <h3 className="text-2xl font-bold mb-4">
                    Pourquoi nos certifications comptent
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Expertise validée par les éditeurs",
                      "Accès aux dernières best practices",
                      "Support technique prioritaire",
                      "Formations continues obligatoires",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-3 text-sm text-muted"
                      >
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassPanel>
            </SlideIn>
          </div>
        </Container>
      </section>

      {/* Approach */}
      <section className="py-24 bg-dark/50">
        <Container>
          <div className="text-center mb-16">
            <FadeIn>
              <Badge variant="outline" className="mb-4">
                Notre Approche
              </Badge>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-display font-bold">
                Comment On Travaille
              </h2>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Audit & Cadrage",
                description:
                  "On comprend votre métier, vos contraintes et vos objectifs avant d'écrire une seule ligne de code.",
              },
              {
                step: "02",
                title: "Architecture & POC",
                description:
                  "Conception technique solide et validation rapide avec un prototype fonctionnel.",
              },
              {
                step: "03",
                title: "Développement & Itérations",
                description:
                  "Sprints de 2 semaines, démos régulières, feedback continu jusqu'au lancement.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassPanel className="p-8 rounded-2xl h-full">
                  <div className="w-12 h-12 rounded-full bg-primary text-dark font-bold text-lg flex items-center justify-center mb-6">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-sm text-muted">{item.description}</p>
                </GlassPanel>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <CtaSection
        eyebrow="Prêt ?"
        title="Discutons de votre projet technique"
        subtitle="Un appel de 30 minutes pour comprendre vos enjeux et voir comment on peut vous aider."
        ctaLabel="Prendre rendez-vous"
        ctaHref="/contact"
        secondaryLabel="Voir nos réalisations"
        secondaryHref="/work"
        variant="card"
      />
    </>
  );
}
