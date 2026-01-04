import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { BlogArticleContent } from "@/components/content/blog-article-content";

// Articles disponibles
const BLOG_POSTS = [
  "agrement-cii",
  "waf-efficacite",
  "integrite-logs-continu",
  "mvp-iteration",
  "core-web-vitals",
  "owasp-2024",
  "measuring-ai-roi-2026",
] as const;

type BlogSlug = (typeof BLOG_POSTS)[number];

export function generateStaticParams() {
  return BLOG_POSTS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "BlogArticles" });

  if (!BLOG_POSTS.includes(slug as BlogSlug)) {
    return { title: "Article non trouvé" };
  }

  return {
    title: t(`${slug}.title`),
    description: t(`${slug}.excerpt`),
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;

  if (!BLOG_POSTS.includes(slug as BlogSlug)) {
    notFound();
  }

  return <BlogArticleContent slug={slug} />;
}
