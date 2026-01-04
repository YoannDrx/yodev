"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { FadeIn, SlideIn } from "@/components/motion";
import { CtaSection } from "@/components/sections";
import { Link } from "@/i18n/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Bookmark,
  ArrowRight,
  AlertTriangle,
  Calculator,
  LineChart,
  Cpu,
} from "lucide-react";
import { cn } from "@/lib/utils";

type BlogSlug = string;

const categoryColors: Record<string, string> = {
  IA: "text-purple-400 bg-purple-400/10",
  "IA & LLM": "text-primary bg-primary/10",
  "AI & LLM": "text-primary bg-primary/10",
  Sécurité: "text-red-400 bg-red-400/10",
  Security: "text-red-400 bg-red-400/10",
  Performance: "text-green-400 bg-green-400/10",
  DevOps: "text-blue-400 bg-blue-400/10",
  Product: "text-orange-400 bg-orange-400/10",
  Tech: "text-primary bg-primary/10",
};

export function BlogArticleContent({ slug }: { slug: BlogSlug }) {
  const t = useTranslations("BlogArticles");
  const blogPage = useTranslations("BlogPage");

  const article = {
    title: t(`${slug}.title`),
    excerpt: t(`${slug}.excerpt`),
    category: t(`${slug}.category`),
    date: t(`${slug}.date`),
    readTime: t(`${slug}.readTime`),
    author: t(`${slug}.author`),
    content: t.raw(`${slug}.content`) as string[],
  };

  // Get other articles for "Related" section
  const posts = blogPage.raw("posts") as Array<{
    slug: string;
    title: string;
    category: string;
    date: string;
  }>;
  const relatedPosts = posts.filter((p) => p.slug !== slug).slice(0, 3);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const current = window.scrollY;
      const next = total > 0 ? (current / total) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, next)));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (slug === "measuring-ai-roi-2026") {
    return (
      <>
        <ReadingProgress progress={progress} />
        <AiRoiArticle article={article} relatedPosts={relatedPosts} />
      </>
    );
  }

  return (
    <>
      <ReadingProgress progress={progress} />
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10" />
        <div className="absolute inset-0 -z-10 opacity-30 bg-grid-dots" />

        <Container>
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <ButtonLink
                href="/blog"
                variant="ghost"
                size="sm"
                leftIcon={<ArrowLeft className="h-4 w-4" />}
                className="mb-8"
              >
                Retour au blog
              </ButtonLink>
            </FadeIn>

            <FadeIn delay={0.1}>
              <Badge
                variant="outline"
                className={cn(
                  "mb-4",
                  categoryColors[article.category] || categoryColors["Tech"]
                )}
              >
                {article.category}
              </Badge>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold leading-[1.1] mb-6">
                <span className="text-gradient">{article.title}</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-lg md:text-xl text-muted mb-8">
                {article.excerpt}
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <GlassPanel className="p-4 rounded-xl inline-flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium">{article.author}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted">
                  <Calendar className="w-4 h-4" />
                  {article.date}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted">
                  <Clock className="w-4 h-4" />
                  {article.readTime}
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <Share2 className="w-4 h-4 text-muted hover:text-primary" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <Bookmark className="w-4 h-4 text-muted hover:text-primary" />
                  </button>
                </div>
              </GlassPanel>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <Container>
          <div className="grid lg:grid-cols-[1fr_300px] gap-12 max-w-6xl mx-auto">
            {/* Main Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <GlassPanel className="p-8 md:p-12 rounded-2xl">
                <div className="prose prose-lg prose-invert max-w-none">
                  {article.content.map((paragraph, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 + index * 0.05 }}
                      className="mb-6 text-muted leading-relaxed"
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>

                {/* Article Footer */}
                <div className="mt-12 pt-8 border-t border-white/10">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted">Partager :</span>
                      <button className="p-2 rounded-lg bg-white/5 hover:bg-primary/20 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                    <ButtonLink href="/blog" variant="ghost" size="sm">
                      Voir tous les articles
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </ButtonLink>
                  </div>
                </div>
              </GlassPanel>
            </motion.article>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Author Card */}
              <SlideIn direction="right">
                <GlassPanel className="p-6 rounded-2xl">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted mb-4">
                    À propos de l'auteur
                  </h3>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold">{article.author}</p>
                      <p className="text-xs text-muted">Expert Tech @ Yodev</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted">
                    Passionné par les technologies web modernes et
                    l'intelligence artificielle.
                  </p>
                </GlassPanel>
              </SlideIn>

              {/* Related Articles */}
              {relatedPosts.length > 0 && (
                <SlideIn direction="right" delay={0.1}>
                  <GlassPanel className="p-6 rounded-2xl">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-muted mb-4">
                      Articles similaires
                    </h3>
                    <div className="space-y-4">
                      {relatedPosts.map((post) => (
                        <Link
                          key={post.slug}
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          href={`/blog/${post.slug}` as any}
                          className="block group"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                                {post.title}
                              </p>
                              <p className="text-xs text-muted mt-1">
                                {post.date}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </GlassPanel>
                </SlideIn>
              )}

              {/* Newsletter Mini */}
              <SlideIn direction="right" delay={0.2}>
                <GlassPanel className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent">
                  <h3 className="font-bold mb-2">Newsletter</h3>
                  <p className="text-sm text-muted mb-4">
                    Recevez nos derniers insights tech.
                  </p>
                  <input
                    type="email"
                    placeholder="votre@email.com"
                    className="w-full px-3 py-2 rounded-lg bg-dark/50 border border-white/10 text-sm mb-3 focus:outline-none focus:border-primary/50"
                  />
                  <button className="w-full py-2 rounded-lg bg-primary text-dark text-sm font-bold hover:bg-primary/90 transition-colors">
                    S'inscrire
                  </button>
                </GlassPanel>
              </SlideIn>
            </aside>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <CtaSection
        title={t("ctaTitle")}
        subtitle={t("ctaSubtitle")}
        ctaLabel={t("ctaButton")}
        ctaHref="/contact"
        variant="card"
      />
    </>
  );
}

type ArticleMeta = {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
};

type RelatedPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
};

function ReadingProgress({ progress }: { progress: number }) {
  return (
    <div
      className="fixed top-0 left-0 z-[60] h-1 bg-gradient-to-r from-primary to-secondary transition-[width] duration-150"
      style={{ width: `${progress}%` }}
    />
  );
}

function AiRoiArticle({
  article,
  relatedPosts,
}: {
  article: ArticleMeta;
  relatedPosts: RelatedPost[];
}) {
  const t = useTranslations("BlogArticles");
  const [employees, setEmployees] = useState(10);
  const [automationRate, setAutomationRate] = useState(25);
  const [efficiencyGain, setEfficiencyGain] = useState(40);
  const hourlyRate = 55;

  const annualSavings = Math.round(
    employees * 1600 * (automationRate / 100) * (efficiencyGain / 100) * hourlyRate
  );

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10 mesh-gradient" />
        <div className="absolute inset-0 -z-10 opacity-30 bg-grid-dots" />
        <Container>
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <ButtonLink
                href="/blog"
                variant="ghost"
                size="sm"
                leftIcon={<ArrowLeft className="h-4 w-4" />}
                className="mb-8"
              >
                Retour au blog
              </ButtonLink>
            </FadeIn>
            <FadeIn delay={0.1}>
              <Badge
                variant="outline"
                className={cn(
                  "mb-4",
                  categoryColors[article.category] || categoryColors["Tech"]
                )}
              >
                {article.category}
              </Badge>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-[1.1] mb-6">
                <span className="text-gradient">{article.title}</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="text-lg md:text-xl text-muted mb-8">
                {article.excerpt}
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <GlassPanel className="p-4 rounded-xl inline-flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium">{article.author}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted">
                  <Calendar className="w-4 h-4" />
                  {article.date}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted">
                  <Clock className="w-4 h-4" />
                  {article.readTime}
                </div>
              </GlassPanel>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <Container>
          <div className="grid lg:grid-cols-[1fr_280px] gap-12 max-w-6xl mx-auto">
            <article className="space-y-10">
              <p id="intro" className="text-xl text-text leading-relaxed">
                En 2026, l'integration de l'IA n'est plus une option, mais sa
                rentabilite reste le point de friction majeur pour les PME. Le
                ROI se cache souvent dans la reduction des erreurs et la vitesse
                d'execution, plus que dans un simple remplacement d'equipes.
              </p>

              <section>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  L'illusion du gain immediat
                </h2>
                <p className="text-muted leading-relaxed">
                  L'IA agit comme un multiplicateur de competences. Les gains
                  reels se mesurent sur la qualite, la retention client et la
                  reduction des incidents critiques.
                </p>
                <GlassPanel className="p-6 mt-6 rounded-2xl border-l-4 border-secondary bg-secondary/5">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-secondary/20 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <p className="font-bold mb-2">Alerte metrique</p>
                      <p className="text-sm text-muted">
                        Evitez les vanity metrics. Un chatbot rapide n'est pas
                        rentable s'il cree 200 tickets de support supplementaires.
                      </p>
                    </div>
                  </div>
                </GlassPanel>
              </section>

              <section id="costs">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  Le cout total de possession (TCO)
                </h2>
                <p className="text-muted leading-relaxed">
                  Les couts IA se repartissent entre tokens, data engineering
                  (RAG) et conduite du changement. Sans donnees propres, l'IA
                  reste sterile.
                </p>
                <ul className="mt-6 space-y-2 text-sm text-muted">
                  <li>• Infrastructures & tokens (cloud ou on-prem).</li>
                  <li>• Data engineering et indexation vectorielle.</li>
                  <li>• Adoption, formation et supervision des equipes.</li>
                </ul>
                <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                  <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
                    <span className="text-xs font-mono uppercase text-muted">
                      Exemple d'optimisation (Python)
                    </span>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-red-500/50" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                      <div className="w-2 h-2 rounded-full bg-green-500/50" />
                    </div>
                  </div>
                  <pre className="p-6 text-xs text-primary overflow-x-auto">
{`# Optimisation du cache pour reduire les couts tokens
async def get_ai_response(prompt_hash):
    cached = await db.cache.find_one({"hash": prompt_hash})
    if cached and not is_expired(cached.timestamp):
        return cached.response

    return await llm.generate(prompt)`}
                  </pre>
                </div>
              </section>

              <section id="calculator">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  Simulateur de ROI IA
                </h2>
                <p className="text-muted">
                  Utilisez ce simulateur pour projeter vos gains potentiels.
                </p>
                <GlassPanel className="p-8 md:p-10 rounded-[2.5rem] mt-8 bg-gradient-to-br from-white/5 to-transparent">
                  <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-xs font-bold text-muted mb-3 uppercase tracking-wider">
                          Employes concernes
                        </label>
                        <input
                          type="range"
                          min={1}
                          max={100}
                          value={employees}
                          onChange={(event) =>
                            setEmployees(Number(event.target.value))
                          }
                          className="w-full"
                        />
                        <div className="flex justify-between mt-2 text-sm">
                          <span className="text-primary font-bold">
                            {employees}
                          </span>
                          <span className="text-muted">personnes</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-muted mb-3 uppercase tracking-wider">
                          Taches automatisables (%)
                        </label>
                        <input
                          type="range"
                          min={5}
                          max={80}
                          value={automationRate}
                          onChange={(event) =>
                            setAutomationRate(Number(event.target.value))
                          }
                          className="w-full"
                        />
                        <div className="flex justify-between mt-2 text-sm">
                          <span className="text-primary font-bold">
                            {automationRate}%
                          </span>
                          <span className="text-muted">des workflows</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-muted mb-3 uppercase tracking-wider">
                          Gain d'efficacite IA (%)
                        </label>
                        <input
                          type="range"
                          min={10}
                          max={90}
                          value={efficiencyGain}
                          onChange={(event) =>
                            setEfficiencyGain(Number(event.target.value))
                          }
                          className="w-full"
                        />
                        <div className="flex justify-between mt-2 text-sm">
                          <span className="text-primary font-bold">
                            {efficiencyGain}%
                          </span>
                          <span className="text-muted">plus rapide</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-dark/50 p-8 rounded-3xl border border-white/5 text-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-primary/5 opacity-0 hover:opacity-100 transition-opacity" />
                      <p className="text-xs uppercase font-bold text-muted mb-4">
                        Economies potentielles / an
                      </p>
                      <div className="text-4xl md:text-5xl font-display font-black text-text mb-4">
                        {annualSavings.toLocaleString()}€
                      </div>
                      <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-xs font-bold">
                        <Calculator className="h-4 w-4" />
                        ROI estime : +240%
                      </div>
                      <p className="mt-6 text-xs text-muted leading-relaxed">
                        * Base sur un cout moyen charge de {hourlyRate}€/h. Le
                        projet est amorti en 4 a 7 mois.
                      </p>
                    </div>
                  </div>
                </GlassPanel>
              </section>

              <section id="metrics">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  KPIs pragmatiques
                </h2>
                <p className="text-muted">
                  Nous suivons trois indicateurs pour piloter un ROI reel.
                </p>
                <div className="grid sm:grid-cols-3 gap-6 mt-8">
                  {[
                    { label: "TTR", subtitle: "Time to Resolution", goal: "-30%" },
                    { label: "AHR", subtitle: "Auto-Help Rate", goal: "45%" },
                    { label: "ER", subtitle: "Error Reduction", goal: "-80%" },
                  ].map((kpi) => (
                    <GlassPanel key={kpi.label} className="p-6 rounded-2xl text-center">
                      <div className="text-3xl font-black text-text mb-2">
                        {kpi.label}
                      </div>
                      <p className="text-xs text-muted uppercase font-bold">
                        {kpi.subtitle}
                      </p>
                      <p className="text-sm mt-3 text-muted italic">
                        {kpi.goal}
                      </p>
                    </GlassPanel>
                  ))}
                </div>
              </section>

              <section id="conclusion">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  Vers une IA responsable
                </h2>
                <p className="text-muted leading-relaxed">
                  Le ROI ne se limite pas aux chiffres. L'IA doit etre
                  securisee, explicable et conforme. Les entreprises qui
                  negligent ces aspects s'exposent a des risques majeurs.
                </p>
              </section>

              <footer className="pt-10 border-t border-white/10">
                <GlassPanel className="p-8 rounded-[2rem] flex flex-col md:flex-row items-center gap-8">
                  <div className="w-28 h-28 rounded-3xl bg-white/5 flex items-center justify-center text-primary">
                    <Cpu className="w-10 h-10" />
                  </div>
                  <div className="text-center md:text-left">
                    <h4 className="text-2xl font-bold mb-2">Alexandre Dupont</h4>
                    <p className="text-muted mb-4">
                      Alexandre accompagne les ETI dans leur transition IA
                      depuis 8 ans. Expert architectures LLM et RAG.
                    </p>
                    <a
                      href="#"
                      className="text-primary hover:text-text transition-colors font-bold inline-flex items-center gap-2"
                    >
                      Suivre sur LinkedIn
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </GlassPanel>
              </footer>
            </article>

            <aside className="space-y-6">
              <GlassPanel className="p-6 rounded-2xl sticky top-28">
                <p className="text-xs uppercase tracking-widest text-muted mb-4">
                  Sommaire
                </p>
                <nav className="space-y-3 text-sm">
                  <a href="#intro" className="block text-primary font-semibold">
                    L'illusion du gain immediat
                  </a>
                  <a href="#costs" className="block text-muted hover:text-text">
                    Cout total de possession
                  </a>
                  <a href="#calculator" className="block text-muted hover:text-text">
                    Simulateur de ROI IA
                  </a>
                  <a href="#metrics" className="block text-muted hover:text-text">
                    KPIs pragmatiques
                  </a>
                  <a href="#conclusion" className="block text-muted hover:text-text">
                    IA responsable
                  </a>
                </nav>
                <div className="mt-6 rounded-xl bg-white/5 p-4 text-xs text-muted">
                  <LineChart className="h-4 w-4 text-primary mb-2" />
                  Un ROI clair = une adoption durable.
                </div>
              </GlassPanel>
            </aside>
          </div>
        </Container>
      </section>

      {/* Related posts */}
      <section className="py-12">
        <Container>
          <h4 className="text-2xl font-display font-bold mb-8 flex items-center gap-3">
            <span className="w-10 h-px bg-primary" />
            Articles recommandes
          </h4>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}` as any}
                className="group"
              >
                <GlassPanel className="rounded-3xl overflow-hidden mb-5 h-48 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-secondary/30" />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent" />
                </GlassPanel>
                <span className="text-xs font-bold text-primary uppercase mb-2 block">
                  {post.category}
                </span>
                <h5 className="text-lg font-bold group-hover:text-primary transition-colors leading-snug">
                  {post.title}
                </h5>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection
        title={t("ctaTitle")}
        subtitle={t("ctaSubtitle")}
        ctaLabel={t("ctaButton")}
        ctaHref="/contact"
        variant="card"
      />
    </>
  );
}
