import { getTranslations } from "next-intl/server";
import { getPageLocale, type LocalizedPageProps } from "@/i18n/page-locale";
import { pageMetadata } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function LegalPage({ params }: LocalizedPageProps) {
  const locale = await getPageLocale(params);
  const t = await getTranslations({ locale, namespace: "LegalPage" });
  const sections = t.raw("sections") as Array<{ title: string; content: string }>;

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 -z-10 bg-grid opacity-30" />
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div>
              <Badge variant="primary" className="mb-4">
                {t("eyebrow")}
              </Badge>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-text md:text-5xl">
                {t("title")}
              </h1>
            </div>
            <div>
              <p className="mt-6 text-lg text-muted">{t("lastUpdated")}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Content Section */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <Card className="p-8 md:p-12">
            <div className="space-y-8">
              {sections.map((section, index) => (
                <div key={index}>
                  <div>
                    <h2 className="text-xl font-semibold text-text">
                      {section.title}
                    </h2>
                    <p className="mt-4 text-muted leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}

export async function generateMetadata({ params }: LocalizedPageProps) { return pageMetadata("legal", await getPageLocale(params)); }
