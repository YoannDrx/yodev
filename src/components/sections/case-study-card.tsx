"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CaseStudyCardProps {
  title: string;
  type: string;
  summary: string;
  result: string;
  image?: string;
  href?: string;
  className?: string;
}

export function CaseStudyCard({
  title,
  type,
  summary,
  result,
  image,
  href,
  className,
}: CaseStudyCardProps) {
  const content = (
    <Card
      variant="default"
      className={cn(
        "group flex h-full flex-col overflow-hidden",
        href && "cursor-pointer",
        className
      )}
    >
      {/* Image placeholder */}
      {image ? (
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent" />
        </div>
      ) : (
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary/5 to-primary/20">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-primary/10" />
          </div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {type}
          </Badge>
          {href && (
            <motion.div
              className="text-muted transition-colors group-hover:text-primary"
              whileHover={{ x: 2, y: -2 }}
            >
              <ArrowUpRight className="h-4 w-4" />
            </motion.div>
          )}
        </div>

        <h3 className="mt-4 text-xl font-semibold text-text transition-colors group-hover:text-primary">
          {title}
        </h3>

        <p className="mt-2 flex-1 text-sm text-muted">{summary}</p>

        <div className="mt-4 rounded-lg bg-bg-2/50 px-4 py-3">
          <p className="text-xs font-medium text-text">{result}</p>
        </div>
      </div>
    </Card>
  );

  if (href) {
    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <Link href={href as any} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
}

interface CaseStudyGridProps {
  children: React.ReactNode;
  className?: string;
}

export function CaseStudyGrid({ children, className }: CaseStudyGridProps) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-2 lg:grid-cols-3", className)}>
      {children}
    </div>
  );
}
