import { useTranslations } from "next-intl";
import { PageIntro } from "@/components/site/page-intro";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

type ServiceItem = {
  title: string;
  description: string;
  bullets: string[];
};

export default function ServicesPage() {
  const t = useTranslations("ServicesPage");
  const home = useTranslations("Home");
  const services = home.raw("services.items") as ServiceItem[];

  return (
    <>
      <PageIntro title={t("title")} subtitle={t("subtitle")} />
      <Section
        eyebrow={t("title")}
        title={home("services.title")}
        subtitle={home("services.subtitle")}
      >
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="p-6">
              <h3 className="text-lg font-semibold text-text">
                {service.title}
              </h3>
              <p className="mt-3 text-sm text-muted">{service.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
