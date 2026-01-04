"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion";
import { CtaSection } from "@/components/sections";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Calendar, Clock, Search } from "lucide-react";
import { cn } from "@/lib/utils";

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime?: string;
};

const categoryColors: Record<string, string> = {
  IA: "text-purple-400 bg-purple-400/10",
  "IA & LLM": "text-primary bg-primary/10",
  "AI & LLM": "text-primary bg-primary/10",
  "Sécurité": "text-red-400 bg-red-400/10",
  Security: "text-red-400 bg-red-400/10",
  Performance: "text-green-400 bg-green-400/10",
  DevOps: "text-blue-400 bg-blue-400/10",
  Product: "text-orange-400 bg-orange-400/10",
  Tech: "text-primary bg-primary/10",
};

export default function BlogPage() {
  const t = useTranslations("BlogPage");
  const posts = t.raw("posts") as BlogPost[];
  const allLabel = t("allCategories");
  const [activeCategory, setActiveCategory] = useState(allLabel);
  const [query, setQuery] = useState("");

  const categories = useMemo(() => {
    const unique = Array.from(new Set(posts.map((post) => post.category)));
    return [allLabel, ...unique];
  }, [allLabel, posts]);

  const filteredPosts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory =
        activeCategory === allLabel || post.category === activeCategory;
      const matchesQuery =
        !normalized ||
        post.title.toLowerCase().includes(normalized) ||
        post.excerpt.toLowerCase().includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, posts, query]);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 -z-10 mesh-gradient" />
        <div className="absolute inset-0 -z-10 opacity-30 bg-grid-dots" />

        <Container>
          <div className="max-w-4xl mx-auto text-center">
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
              <p className="text-lg md:text-xl text-muted mb-10">
                {t("subtitle")}
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.3}>
            <GlassPanel className="p-4 rounded-[2.5rem] max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-4">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Rechercher un insight..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-primary transition-all"
                />
              </div>
              <div className="hidden md:block h-8 w-px bg-white/10" />
              <div className="flex-1 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                      "px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all",
                      activeCategory === category
                        ? "bg-primary text-dark shadow-[0_0_15px_rgba(27,168,150,0.4)]"
                        : "bg-white/5 text-muted hover:text-text"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </GlassPanel>
          </FadeIn>
        </Container>
      </section>

      {/* Posts Grid */}
      <section className="py-16">
        <Container>
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-display font-bold">Tous les articles</h2>
            <Badge variant="outline">{filteredPosts.length} articles</Badge>
          </div>

          {filteredPosts.length === 0 ? (
            <GlassPanel className="p-10 rounded-3xl text-center text-muted">
              Aucun article ne correspond a votre recherche.
            </GlassPanel>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post, index) => (
                <FadeIn key={post.slug} delay={index * 0.05}>
                  <Link
                    href={`/blog/${post.slug}` as any}
                    className="group block h-full"
                  >
                    <GlassPanel className="p-6 rounded-2xl h-full flex flex-col hover:border-primary/30 transition-all duration-300">
                      <div className="rounded-2xl h-40 mb-6 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-secondary/30" />
                        <div className="absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <Badge
                            variant="outline"
                            size="sm"
                            className={cn(
                              "text-xs",
                              categoryColors[post.category] || categoryColors.Tech
                            )}
                          >
                            {post.category}
                          </Badge>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted mb-6 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="mt-auto flex items-center justify-between text-xs text-muted">
                        <span className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5" />
                          {post.date}
                        </span>
                        {post.readTime && (
                          <span className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readTime}
                          </span>
                        )}
                      </div>
                      <span className="inline-flex items-center text-primary text-sm font-bold mt-6 group-hover:translate-x-1 transition-transform">
                        {t("readMore")}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </span>
                    </GlassPanel>
                  </Link>
                </FadeIn>
              ))}
            </div>
          )}
        </Container>
      </section>

      <CtaSection
        title="Un sujet en tete ?"
        subtitle="Discutons de vos enjeux tech et IA avec un expert."
        ctaLabel="Nous contacter"
        ctaHref="/contact"
        variant="card"
      />
    </>
  );
}
