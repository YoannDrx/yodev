"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { FadeIn } from "@/components/motion";
import { CtaSection } from "@/components/sections";
import {
  Zap,
  Rocket,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Star,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type OfferExample = {
  type: string;
  price: string;
};

type OfferItem = {
  name: string;
  description: string;
  price: string;
  duration?: string;
  idealFor?: string;
  bullets: string[];
  featured?: boolean;
  examples?: OfferExample[];
  cta?: string;
};

const offerIcons = [Zap, Rocket, Users, Building2];
const offerColors = [
  "from-blue-500/20 to-primary/10",
  "from-primary/20 to-purple-500/10",
  "from-purple-500/20 to-pink-500/10",
  "from-orange-500/20 to-red-500/10",
];

export default function OffersPage() {
  const t = useTranslations("OffersPage");
  const home = useTranslations("Home");
  const offers = home.raw("offers.items") as OfferItem[];

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10" />
        <div className="absolute inset-0 -z-10 opacity-30 bg-grid-dots" />

        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <Badge variant="primary" className="mb-6">
                <Sparkles className="w-3 h-3 mr-1" />
                {t("eyebrow")}
              </Badge>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-[1.1] mb-6">
                <span className="text-gradient">{t("title")}</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto">
                {t("subtitle")}
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Offers Grid */}
      <section className="py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            {offers.map((offer, index) => {
              const Icon = offerIcons[index] || Zap;
              const isFeatured = offer.featured;

              return (
                <motion.div
                  key={offer.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={cn(isFeatured && "lg:col-span-2")}
                >
                  <GlassPanel
                    className={cn(
                      "p-8 md:p-10 rounded-3xl relative overflow-hidden",
                      "hover:border-primary/30 transition-all duration-500",
                      isFeatured && "border-primary/20"
                    )}
                  >
                    {/* Background gradient */}
                    <div
                      className={cn(
                        "absolute inset-0 -z-10 bg-gradient-to-br opacity-50",
                        offerColors[index] || offerColors[0]
                      )}
                    />

                    {/* Featured badge */}
                    {isFeatured && (
                      <div className="absolute top-6 right-6">
                        <Badge variant="accent" size="sm">
                          <Star className="w-3 h-3 mr-1" />
                          Recommandé
                        </Badge>
                      </div>
                    )}

                    <div
                      className={cn(
                        isFeatured
                          ? "grid lg:grid-cols-[1.2fr_1fr] gap-8"
                          : ""
                      )}
                    >
                      <div>
                        {/* Header */}
                        <div className="flex items-start gap-4 mb-6">
                          <div
                            className={cn(
                              "w-14 h-14 rounded-2xl flex items-center justify-center",
                              isFeatured
                                ? "bg-primary text-dark"
                                : "bg-primary/10"
                            )}
                          >
                            <Icon
                              className={cn(
                                "w-7 h-7",
                                isFeatured ? "" : "text-primary"
                              )}
                            />
                          </div>
                          <div>
                            <h3 className="text-2xl font-display font-bold">
                              {offer.name}
                            </h3>
                            <p className="text-muted">{offer.description}</p>
                          </div>
                        </div>

                        {/* Price & Duration */}
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                          <p className="text-2xl md:text-3xl font-display font-black text-primary">
                            {offer.price}
                          </p>
                          {offer.duration && (
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5">
                              <Clock className="w-4 h-4 text-muted" />
                              <span className="text-sm text-muted">
                                {offer.duration}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Ideal for */}
                        {offer.idealFor && (
                          <p className="text-sm text-muted mb-6">
                            <span className="font-bold text-text">
                              Idéal pour :
                            </span>{" "}
                            {offer.idealFor}
                          </p>
                        )}

                        {/* Bullets */}
                        <ul className="space-y-3 mb-8">
                          {offer.bullets
                            .slice(0, isFeatured ? undefined : 5)
                            .map((bullet) => (
                              <li
                                key={bullet}
                                className="flex items-start gap-3"
                              >
                                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-muted">
                                  {bullet}
                                </span>
                              </li>
                            ))}
                        </ul>

                        {/* CTA Button */}
                        <ButtonLink
                          href="/contact"
                          variant={isFeatured ? "primary" : "outline"}
                          size="lg"
                          className={cn(
                            "w-full sm:w-auto",
                            isFeatured &&
                              "shadow-[0_0_30px_rgba(27,168,150,0.3)]"
                          )}
                        >
                          {offer.cta || "Demander un devis"}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </ButtonLink>
                      </div>

                      {/* Examples (for featured offer) */}
                      {isFeatured && offer.examples && (
                        <div className="hidden lg:block">
                          <GlassPanel className="p-6 rounded-2xl">
                            <h4 className="text-sm font-bold uppercase tracking-wider text-muted mb-4">
                              Exemples de tarifs
                            </h4>
                            <div className="space-y-4">
                              {offer.examples.map((example) => (
                                <div
                                  key={example.type}
                                  className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
                                >
                                  <span className="text-sm">
                                    {example.type}
                                  </span>
                                  <span className="font-bold text-primary">
                                    {example.price}
                                  </span>
                                </div>
                              ))}
                            </div>

                            <div className="mt-6 p-4 rounded-xl bg-primary/10">
                              <p className="text-xs text-muted">
                                Les prix varient selon la complexité. On vous
                                fait un devis détaillé sous 48h.
                              </p>
                            </div>
                          </GlassPanel>
                        </div>
                      )}
                    </div>
                  </GlassPanel>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Why Us Section */}
      <section className="py-24 bg-dark/50">
        <Container>
          <div className="text-center mb-16">
            <FadeIn>
              <Badge variant="outline" className="mb-4">
                Pourquoi nous ?
              </Badge>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-display font-bold">
                Ce que vous obtenez vraiment
              </h2>
            </FadeIn>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Propriété du code",
                description:
                  "Le code source est à vous. Pas de vendor lock-in.",
                icon: CheckCircle,
              },
              {
                title: "Prix fixes",
                description:
                  "Le devis est ferme. Pas de surprise en fin de projet.",
                icon: CheckCircle,
              },
              {
                title: "Équipe senior",
                description: "Pas de junior sur vos projets. 10+ ans XP moyen.",
                icon: CheckCircle,
              },
              {
                title: "Garantie 30 jours",
                description: "Bug après livraison ? On corrige gratis.",
                icon: CheckCircle,
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassPanel className="p-6 rounded-2xl h-full text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted">{item.description}</p>
                </GlassPanel>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <Container className="max-w-4xl">
          <div className="text-center mb-16">
            <FadeIn>
              <Badge variant="outline" className="mb-4">
                FAQ
              </Badge>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                Questions fréquentes
              </h2>
            </FadeIn>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Comment se passe le paiement ?",
                a: "30% à la signature, 40% à mi-parcours, 30% à la livraison. On peut adapter selon vos contraintes.",
              },
              {
                q: "Vous travaillez avec des clients à l'étranger ?",
                a: "Oui, on a des clients en Europe et aux US. On s'adapte aux fuseaux horaires.",
              },
              {
                q: "Et si je veux modifier le scope en cours de route ?",
                a: "Ça arrive souvent. On fait un avenant au devis et on ajuste. Pas de prise d'otage.",
              },
              {
                q: "Vous faites de la maintenance après ?",
                a: "Oui, via notre offre Scale ou en TMA ponctuelle. On ne vous abandonne pas après le lancement.",
              },
            ].map((faq, index) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassPanel className="p-6 rounded-2xl">
                  <h3 className="font-bold mb-2">{faq.q}</h3>
                  <p className="text-sm text-muted">{faq.a}</p>
                </GlassPanel>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <CtaSection
        title="Prêt à démarrer ?"
        subtitle="On vous fait un devis détaillé sous 48h. Sans engagement."
        ctaLabel="Demander un devis"
        ctaHref="/contact"
        secondaryLabel="Voir nos réalisations"
        secondaryHref="/work"
        variant="card"
      />
    </>
  );
}
