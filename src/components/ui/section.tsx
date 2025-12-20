import { cn } from "@/lib/utils";
import { Container } from "./container";

type SectionProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
};

export function Section({
  eyebrow,
  title,
  subtitle,
  children,
  className,
}: SectionProps) {
  const hasHeader = eyebrow || title || subtitle;

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <Container>
        {hasHeader && (
          <div className="max-w-2xl">
            {eyebrow && (
              <p className="text-xs uppercase tracking-[0.2em] text-muted">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="mt-3 text-3xl font-semibold text-text md:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-base text-muted md:text-lg">{subtitle}</p>
            )}
          </div>
        )}
        <div className={cn(hasHeader && "mt-10")}>{children}</div>
      </Container>
    </section>
  );
}
