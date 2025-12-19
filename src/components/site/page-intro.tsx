import { Container } from "@/components/ui/container";

type PageIntroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export function PageIntro({ eyebrow, title, subtitle }: PageIntroProps) {
  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      <div className="absolute inset-0 -z-10 bg-grid opacity-25" />
      <Container>
        <div className="max-w-2xl">
          {eyebrow && (
            <p className="text-xs uppercase tracking-[0.2em] text-muted">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-3 text-balance text-3xl font-semibold text-text md:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-base text-muted md:text-lg">{subtitle}</p>
          )}
        </div>
      </Container>
    </section>
  );
}
