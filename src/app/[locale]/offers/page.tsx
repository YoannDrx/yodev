"use client";

import { useTranslations } from "next-intl";
import { PageIntro } from "@/components/site/page-intro";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

type OfferItem = {
  name: string;
  description: string;
  price: string;
  bullets: string[];
};

export default function OffersPage() {
  const t = useTranslations("OffersPage");
  const home = useTranslations("Home");
  const offers = home.raw("offers.items") as OfferItem[];

  return (
    <>
      <PageIntro title={t("title")} subtitle={t("subtitle")} />
      <Section
        eyebrow={t("title")}
        title={home("offers.title")}
        subtitle={home("offers.subtitle")}
      >
        <div className="grid gap-6 md:grid-cols-3">
          {offers.map((offer) => (
            <Card key={offer.name} className="flex h-full flex-col p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-text">{offer.name}</h3>
                <Badge className="text-xs">{offer.price}</Badge>
              </div>
              <p className="mt-3 text-sm text-muted">{offer.description}</p>
              <ul className="mt-5 space-y-2 text-sm text-muted">
                {offer.bullets.map((bullet) => (
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
