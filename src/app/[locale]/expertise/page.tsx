"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { FadeIn, Parallax } from "@/components/motion";
import { LogoDots } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

const techData = [
  {
    id: "nextjs",
    name: "React / Next.js",
    category: "frontend",
    version: "14.2 (App Router)",
    perf: 98,
    security: 94,
    useCase: "SaaS, dashboards, e-commerce",
    stack: ["TypeScript", "Tailwind", "Zustand"],
    code: "export default async function Page() {\n  const data = await getAnalytics();\n  return <Dashboard data={data} />;\n}",
  },
  {
    id: "nodejs",
    name: "Node.js / NestJS",
    category: "backend",
    version: "20.x LTS",
    perf: 92,
    security: 97,
    useCase: "Microservices, APIs temps reel",
    stack: ["Prisma", "PostgreSQL", "Redis"],
    code: "@Get(':id')\nasync findOne(@Param('id') id: string) {\n  return this.usersService.findById(id);\n}",
  },
  {
    id: "python",
    name: "Python / IA",
    category: "ai",
    version: "3.12 (PyTorch)",
    perf: 88,
    security: 91,
    useCase: "RAG, LLM agents, automation",
    stack: ["OpenAI API", "LangChain", "Pinecone"],
    code: "agent = create_react_agent(\n  llm=ChatOpenAI(model='gpt-4'),\n  tools=tools\n)",
  },
  {
    id: "swift",
    name: "Swift (iOS Native)",
    category: "mobile",
    version: "5.10 (SwiftUI)",
    perf: 99,
    security: 96,
    useCase: "Applications mobiles premium",
    stack: ["SwiftUI", "Combine", "CoreData"],
    code: "struct HomeView: View {\n  var body: some View {\n    VStack { Text('Hello Yodev') }\n  }\n}",
  },
  {
    id: "aws",
    name: "AWS Cloud",
    category: "infra",
    version: "Terraform v1.8",
    perf: 95,
    security: 99,
    useCase: "Scaling, serverless, DevSecOps",
    stack: ["Lambda", "RDS", "CloudFront"],
    code: "resource 'aws_lambda_function' 'app' {\n  function_name = 'yodev-api'\n  handler = 'index.handler'\n}",
  },
];

const categoryTabs = [
  { key: "all", label: "Tout voir" },
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "ai", label: "IA & Data" },
  { key: "mobile", label: "Mobile" },
  { key: "infra", label: "Infra" },
];

const techMatrix = [
  {
    project: "Startup MVP (SaaS)",
    stack: "Next.js + Supabase + Tailwind",
    strengths: "Vitesse de dev, couts infra reduits",
    team: "1-2 devs fullstack",
    speed: "Extreme (4-6 sem.)",
    tone: "primary",
  },
  {
    project: "PME logiciel critique",
    stack: "React + NestJS + PostgreSQL",
    strengths: "Robustesse, typage strict, scalabilite",
    team: "2-4 devs specialises",
    speed: "Standard (12-16 sem.)",
    tone: "warning",
  },
  {
    project: "Integration IA / LLM",
    stack: "Python + LangChain + VectorDB",
    strengths: "Expertise algorithmique, automation",
    team: "1 AI engineer + 1 dev",
    speed: "Rapide (8-10 sem.)",
    tone: "secondary",
  },
  {
    project: "Grande echelle / Cloud native",
    stack: "Microservices Go/Node + K8s",
    strengths: "Haute dispo, multi-tenant",
    team: "5+ devs (staff aug)",
    speed: "Long terme",
    tone: "danger",
  },
];

export default function ExpertisePage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredTech = useMemo(() => {
    if (activeCategory === "all") return techData;
    return techData.filter((tech) => tech.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 mesh-gradient overflow-hidden">
        <div className="hero-glow -top-20 -left-20" />
        <div
          className="hero-glow bottom-0 right-0 opacity-20"
          style={{
            background: "radial-gradient(circle, #FF6B35 0%, transparent 70%)",
          }}
        />

        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <FadeIn>
                <Badge variant="primary">Mastering the stack</Badge>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1 className="text-5xl lg:text-7xl font-display font-extrabold leading-tight text-gradient">
                  Excellence
                  <br />
                  <span className="text-primary">technologique</span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-lg text-muted max-w-lg">
                  Nous ne suivons pas les tendances, nous maitrisons les outils
                  qui construisent l'avenir. Decouvrez les fiches techniques de
                  notre stack de production.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="flex items-center gap-6 pt-4 text-sm text-muted">
                  <div>
                    <p className="text-2xl font-bold text-text">99.9%</p>
                    <p className="text-xs uppercase tracking-widest">Uptime garanti</p>
                  </div>
                  <div className="h-10 w-px bg-white/10" />
                  <div>
                    <p className="text-2xl font-bold text-text">&lt; 2s</p>
                    <p className="text-xs uppercase tracking-widest">Temps de chargement</p>
                  </div>
                  <div className="h-10 w-px bg-white/10" />
                  <div>
                    <p className="text-2xl font-bold text-text">SOC2</p>
                    <p className="text-xs uppercase tracking-widest">Compliance ready</p>
                  </div>
                </div>
              </FadeIn>
            </div>

            <Parallax className="hidden lg:block">
              <div className="w-full aspect-square border border-white/10 rounded-full flex items-center justify-center relative">
                <div className="absolute inset-0 animate-spin-slow opacity-20">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full blur-sm" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-secondary rounded-full blur-sm" />
                </div>
                <div className="w-2/3 h-2/3 border border-white/10 rounded-full flex items-center justify-center">
                  <div className="w-32 h-32 bg-dark glass-panel rounded-3xl flex items-center justify-center">
                    <LogoDots size="lg" />
                  </div>
                </div>
                <div className="absolute top-12 left-12 w-16 h-16 glass-panel rounded-2xl flex items-center justify-center animate-float">
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                    className="w-8 h-8"
                    alt="React"
                  />
                </div>
                <div
                  className="absolute bottom-16 right-4 w-16 h-16 glass-panel rounded-2xl flex items-center justify-center animate-float"
                  style={{ animationDelay: "0.8s" }}
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
                    className="w-8 h-8"
                    alt="Node.js"
                  />
                </div>
                <div
                  className="absolute top-1/2 -right-6 w-16 h-16 glass-panel rounded-2xl flex items-center justify-center animate-float"
                  style={{ animationDelay: "0.4s" }}
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
                    className="w-8 h-8"
                    alt="Python"
                  />
                </div>
              </div>
            </Parallax>
          </div>
        </Container>
      </section>

      {/* Tech fact sheets */}
      <section className="py-24">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div className="bg-white/5 border border-white/10 p-1 rounded-2xl flex flex-wrap justify-center">
              {categoryTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveCategory(tab.key)}
                  className={cn(
                    "px-5 py-2.5 rounded-xl text-sm transition-all",
                    activeCategory === tab.key
                      ? "bg-primary text-dark font-bold"
                      : "text-muted hover:text-text"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="text-sm text-muted font-mono">
              <span className="text-primary">{filteredTech.length}</span> technologies actives
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {filteredTech.map((tech) => (
              <GlassPanel
                key={tech.id}
                className="p-8 rounded-[2.5rem] relative group hover:border-primary/40 transition-all duration-500"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center">
                      <img
                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${
                          tech.id === "nextjs"
                            ? "nextjs/nextjs-original"
                            : tech.id === "aws"
                              ? "amazonwebservices/amazonwebservices-original-wordmark"
                              : `${tech.id}/${tech.id}-original`
                        }.svg`}
                        className="w-10 h-10"
                        alt={tech.name}
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{tech.name}</h3>
                      <p className="text-xs font-mono text-muted uppercase tracking-widest">
                        {tech.version}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs uppercase tracking-widest text-muted">
                    {tech.category}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-bold text-muted uppercase mb-3">
                        Cas d'usage optimal
                      </p>
                      <p className="text-sm text-muted leading-relaxed">
                        {tech.useCase}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted uppercase mb-3">
                        Core ecosystem
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {tech.stack.map((item) => (
                          <span
                            key={item}
                            className="px-2 py-1 bg-white/5 rounded text-[11px] font-mono text-primary border border-white/5"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "Performance", value: tech.perf, color: "bg-primary" },
                        { label: "Security", value: tech.security, color: "bg-secondary" },
                      ].map((metric) => (
                        <div key={metric.label}>
                          <div className="flex justify-between text-[10px] text-muted uppercase font-bold mb-1">
                            <span>{metric.label}</span>
                            <span className="text-primary">{metric.value}%</span>
                          </div>
                          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                            <div
                              className={cn("h-full", metric.color)}
                              style={{ width: `${metric.value}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -top-3 -right-3 text-[10px] font-mono text-muted bg-dark px-2">
                      snippet.code
                    </div>
                    <div className="bg-black/40 rounded-2xl p-4 h-full font-mono text-xs border border-white/5 overflow-hidden">
                      <pre className="text-muted leading-relaxed whitespace-pre-wrap">
                        {tech.code}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs text-muted">
                  <span>PROD READY</span>
                  <span className="inline-flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Stable
                  </span>
                </div>
              </GlassPanel>
            ))}
          </div>
        </Container>
      </section>

      {/* Tech Matrix */}
      <section className="py-24 bg-dark border-y border-white/5">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Quelle technologie pour votre projet ?
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Nous choisissons la stack selon vos objectifs, pas nos preferences.
            </p>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="text-left text-xs font-mono text-muted uppercase tracking-widest border-b border-white/10">
                  <th className="py-6 px-4">Type de projet</th>
                  <th className="py-6 px-4">Stack recommandee</th>
                  <th className="py-6 px-4">Points forts</th>
                  <th className="py-6 px-4">Equipe optimale</th>
                  <th className="py-6 px-4">Vitesse</th>
                </tr>
              </thead>
              <tbody>
                {techMatrix.map((row) => (
                  <tr
                    key={row.project}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-6 px-4 font-bold">{row.project}</td>
                    <td className="py-6 px-4">{row.stack}</td>
                    <td className="py-6 px-4 text-muted">{row.strengths}</td>
                    <td className="py-6 px-4">{row.team}</td>
                    <td className="py-6 px-4">
                      <span
                        className={cn(
                          "px-3 py-1 rounded-full text-xs font-bold",
                          row.tone === "primary" && "bg-primary/20 text-primary",
                          row.tone === "secondary" && "bg-secondary/20 text-secondary",
                          row.tone === "warning" && "bg-yellow-500/20 text-yellow-500",
                          row.tone === "danger" && "bg-red-500/20 text-red-500"
                        )}
                      >
                        {row.speed}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-28">
        <Container>
          <GlassPanel className="p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden">
            <div className="hero-glow -top-40 -left-40 opacity-30" />
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
              Une architecture prete pour demain ?
            </h2>
            <p className="text-xl text-muted mb-12 max-w-2xl mx-auto">
              Nos architectes auditent votre stack et construisent une roadmap
              sans dette technique.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <ButtonLink
                href="/bookings/technical-roadmap"
                size="lg"
                className="px-10 py-5 rounded-full shadow-[0_0_30px_rgba(27,168,150,0.4)]"
              >
                Demander un audit technique
              </ButtonLink>
              <ButtonLink
                href="/work"
                variant="glass"
                size="lg"
                className="px-10 py-5 rounded-full"
              >
                Voir nos realisations
              </ButtonLink>
            </div>
          </GlassPanel>
        </Container>
      </section>
    </>
  );
}
