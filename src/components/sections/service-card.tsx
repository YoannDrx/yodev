"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  bullets?: string[];
  href?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function ServiceCard({
  title,
  description,
  bullets,
  href,
  icon,
  className,
}: ServiceCardProps) {
  const content = (
    <Card
      variant="default"
      className={cn(
        "group flex h-full flex-col overflow-hidden",
        href && "cursor-pointer",
        className
      )}
    >
      <CardHeader>
        {icon && (
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            {icon}
          </div>
        )}
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-xl">{title}</CardTitle>
          {href && (
            <motion.div
              className="flex-shrink-0 text-muted transition-colors group-hover:text-primary"
              whileHover={{ x: 2, y: -2 }}
            >
              <ArrowUpRight className="h-5 w-5" />
            </motion.div>
          )}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {bullets && bullets.length > 0 && (
        <CardContent className="mt-auto pt-0">
          <ul className="space-y-2">
            {bullets.map((bullet, index) => (
              <li key={index} className="flex items-center gap-2.5 text-sm text-muted">
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                {bullet}
              </li>
            ))}
          </ul>
        </CardContent>
      )}
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

interface ServiceGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function ServiceGrid({ children, columns = 3, className }: ServiceGridProps) {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-6", gridCols[columns], className)}>
      {children}
    </div>
  );
}
