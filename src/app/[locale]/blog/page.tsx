"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion";
import { CtaSection } from "@/components/sections";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Clock, Calendar, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime?: string;
  featured?: boolean;
};

const categoryColors: Record<string, string> = {
  "IA": "text-purple-400 bg-purple-400/10",
  "Sécurité": "text-red-400 bg-red-400/10",
  "Performance": "text-green-400 bg-green-400/10",
  "DevOps": "text-blue-400 bg-blue-400/10",
  "Product": "text-orange-400 bg-orange-400/10",
  "Tech": "text-primary bg-primary/10",
};

export default function BlogPage() {
  const t = useTranslations("BlogPage");
  const posts = t.raw("posts") as BlogPost[];

  // Premier post mis en avant
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-500/10 via-transparent to-primary/10" />
        <div className="absolute inset-0 -z-10 opacity-30 bg-grid-dots" />

        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <Badge variant="primary" className="mb-6">
                {t("eyebrow")}
              </Badge>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-[1.1] mb-6">
                <span className="text-gradient">{t("title")}</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-muted">
                {t("subtitle")}
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="pb-12">
          <Container>
            <FadeIn>
              <Link
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                href={`/blog/${featuredPost.slug}` as any}
                className="block group"
              >
                <GlassPanel className="p-8 md:p-12 rounded-3xl relative overflow-hidden hover:border-primary/40 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

                  <div className="relative grid lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <Badge variant="accent" size="sm">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          À la une
                        </Badge>
                        <Badge
                          variant="outline"
                          size="sm"
                          className={cn(
                            categoryColors[featuredPost.category] || categoryColors["Tech"]
                          )}
                        >
                          {featuredPost.category}
                        </Badge>
                      </div>

                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-4 group-hover:text-primary transition-colors">
                        {featuredPost.title}
                      </h2>

                      <p className="text-muted mb-6 line-clamp-3">
                        {featuredPost.excerpt}
                      </p>

                      <div className="flex items-center gap-6 text-sm text-muted mb-6">
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {featuredPost.date}
                        </span>
                        {featuredPost.readTime && (
                          <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {featuredPost.readTime}
                          </span>
                        )}
                      </div>

                      <span className="inline-flex items-center text-primary font-bold group-hover:translate-x-1 transition-transform">
                        Lire l'article
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </span>
                    </div>

                    {/* Decorative code block */}
                    <div className="hidden lg:block">
                      <div className="bg-dark/50 rounded-2xl p-6 border border-white/5">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-3 h-3 rounded-full bg-red-500/50" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                          <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        </div>
                        <div className="space-y-2 font-mono text-xs">
                          <p className="text-muted">// Yodev Insights</p>
                          <p><span className="text-purple-400">const</span> <span className="text-blue-400">article</span> = {`{`}</p>
                          <p className="pl-4"><span className="text-primary">topic</span>: "<span className="text-green-400">{featuredPost.category}</span>",</p>
                          <p className="pl-4"><span className="text-primary">impact</span>: "<span className="text-orange-400">high</span>",</p>
                          <p className="pl-4"><span className="text-primary">actionable</span>: <span className="text-purple-400">true</span></p>
                          <p>{`}`};</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassPanel>
              </Link>
            </FadeIn>
          </Container>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-16">
        <Container>
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-display font-bold">
              Tous les articles
            </h2>
            <Badge variant="outline">
              {posts.length} articles
            </Badge>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {otherPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  href={`/blog/${post.slug}` as any}
                  className="group block h-full"
                >
                  <GlassPanel className="p-6 rounded-2xl h-full flex flex-col hover:border-primary/30 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <Badge
                        variant="outline"
                        size="sm"
                        className={cn(
                          "text-xs",
                          categoryColors[post.category] || categoryColors["Tech"]
                        )}
                      >
                        {post.category}
                      </Badge>
                      <span className="text-xs text-muted">{post.date}</span>
                    </div>

                    <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-sm text-muted mb-4 flex-grow line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      {post.readTime && (
                        <span className="text-xs text-muted flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      )}
                      <span className="inline-flex items-center text-primary text-sm font-bold group-hover:translate-x-1 transition-transform">
                        {t("readMore")}
                        <ArrowRight className="ml-1 w-3 h-3" />
                      </span>
                    </div>
                  </GlassPanel>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16">
        <Container className="max-w-4xl">
          <GlassPanel className="p-8 md:p-12 rounded-3xl text-center">
            <Badge variant="primary" className="mb-4">
              Newsletter
            </Badge>
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Restez informé
            </h2>
            <p className="text-muted mb-8 max-w-lg mx-auto">
              Recevez nos derniers articles et insights tech directement dans votre boîte mail. Pas de spam, que du contenu utile.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="votre@email.com"
                className="flex-1 px-4 py-3 rounded-xl bg-dark/50 border border-white/10 text-text placeholder:text-muted focus:outline-none focus:border-primary/50 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-primary text-dark font-bold hover:bg-primary/90 transition-colors"
              >
                S'inscrire
              </button>
            </form>
          </GlassPanel>
        </Container>
      </section>

      {/* CTA Section */}
      <CtaSection
        title="Un projet tech en tête ?"
        subtitle="Discutons de vos enjeux et voyons comment on peut vous aider."
        ctaLabel="Prendre contact"
        ctaHref="/contact"
        variant="card"
      />
    </>
  );
}
