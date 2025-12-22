"use client";

import { motion } from "framer-motion";
import { Quote, Play } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  videoUrl?: string;
  className?: string;
}

export function TestimonialCard({
  quote,
  author,
  role,
  company,
  avatar,
  videoUrl,
  className,
}: TestimonialCardProps) {
  const t = useTranslations("Common");
  return (
    <Card
      variant="elevated"
      className={cn("relative flex flex-col p-6 md:p-8", className)}
    >
      {/* Quote icon */}
      <div className="absolute right-6 top-6 text-primary/10">
        <Quote className="h-12 w-12" />
      </div>

      {/* Video badge if available */}
      {videoUrl && (
        <motion.button
          className="absolute right-6 top-6 flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-medium text-white shadow-glow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Play className="h-3 w-3" />
          {t("watchVideo")}
        </motion.button>
      )}

      {/* Quote text */}
      <blockquote className="relative flex-1">
        <p className="text-base leading-relaxed text-text md:text-lg">
          &ldquo;{quote}&rdquo;
        </p>
      </blockquote>

      {/* Author info */}
      <div className="mt-6 flex items-center gap-4">
        {avatar ? (
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            <Image
              src={avatar}
              alt={author}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <span className="text-lg font-semibold">
              {author.split(" ").map((n) => n[0]).join("")}
            </span>
          </div>
        )}
        <div>
          <p className="font-semibold text-text">{author}</p>
          <p className="text-sm text-muted">
            {role} · {company}
          </p>
        </div>
      </div>
    </Card>
  );
}

interface TestimonialFeaturedProps extends TestimonialCardProps {
  rating?: number;
}

export function TestimonialFeatured({
  quote,
  author,
  role,
  company,
  avatar,
  rating = 5,
  className,
}: TestimonialFeaturedProps) {
  return (
    <Card
      variant="elevated"
      className={cn(
        "relative overflow-hidden p-8 md:p-12",
        className
      )}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

      <div className="grid gap-8 md:grid-cols-[1fr_auto] md:gap-12">
        <div className="space-y-6">
          {/* Rating stars */}
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.svg
                key={i}
                className={cn(
                  "h-5 w-5",
                  i < rating ? "text-yellow-500" : "text-muted/30"
                )}
                fill="currentColor"
                viewBox="0 0 20 20"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </motion.svg>
            ))}
          </div>

          {/* Quote */}
          <blockquote>
            <p className="text-xl leading-relaxed text-text md:text-2xl">
              &ldquo;{quote}&rdquo;
            </p>
          </blockquote>

          {/* Author */}
          <div className="flex items-center gap-4">
            {avatar ? (
              <div className="relative h-14 w-14 overflow-hidden rounded-full">
                <Image
                  src={avatar}
                  alt={author}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="text-xl font-semibold">
                  {author.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>
            )}
            <div>
              <p className="font-semibold text-text">{author}</p>
              <p className="text-sm text-muted">
                {role} · {company}
              </p>
            </div>
          </div>
        </div>

        {/* Decorative quote icon */}
        <div className="hidden md:flex md:items-center">
          <Quote className="h-24 w-24 text-primary/10" />
        </div>
      </div>
    </Card>
  );
}
