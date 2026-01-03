"use client";

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
} from "lucide-react";
import { cn } from "@/lib/utils";

type BlogSlug = string;

const categoryColors: Record<string, string> = {
  IA: "text-purple-400 bg-purple-400/10",
  Sécurité: "text-red-400 bg-red-400/10",
  Performance: "text-green-400 bg-green-400/10",
  DevOps: "text-blue-400 bg-blue-400/10",
  Product: "text-orange-400 bg-orange-400/10",
  Tech: "text-primary bg-primary/10",
};

export function BlogArticleContent({ slug }: { slug: BlogSlug }) {
  const t = useTranslations("BlogArticles");
  const nav = useTranslations("Nav");
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

  return (
    <>
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
