"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Badge } from "@/components/ui/badge";
import { FadeIn, SlideIn } from "@/components/motion";
import { CtaSection } from "@/components/sections";
import {
  Send,
  Mail,
  Calendar,
  Clock,
  CheckCircle,
  ArrowRight,
  MessageSquare,
  Rocket,
  Wrench,
  Brain,
  Building2,
  User,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ProjectType = "nouveau" | "optimisation" | "ia" | null;

const projectTypes = [
  {
    id: "nouveau" as const,
    icon: Rocket,
    label: "Lancer un produit",
    description: "Site, app, SaaS...",
  },
  {
    id: "optimisation" as const,
    icon: Wrench,
    label: "Améliorer l'existant",
    description: "Performance, refonte...",
  },
  {
    id: "ia" as const,
    icon: Brain,
    label: "Explorer l'IA",
    description: "Chatbot, automation...",
  },
];

export default function ContactPage() {
  const t = useTranslations("ContactPage");
  const info = t.raw("info") as string[];
  const budgetOptions = t.raw("form.budgetOptions") as string[];

  const [selectedType, setSelectedType] = useState<ProjectType>(null);
  const [selectedBudget, setSelectedBudget] = useState<string>("");
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log({ ...formData, type: selectedType, budget: selectedBudget });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-orange-500/10" />
        <div className="absolute inset-0 -z-10 opacity-30 bg-grid-dots" />

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />

        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <Badge variant="primary" className="mb-6">
                <MessageSquare className="w-3 h-3 mr-1" />
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

      {/* Guarantees Bar */}
      <section className="py-8 border-y border-white/5">
        <Container>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {info.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <CheckCircle className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-sm font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <Container>
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-start">
            {/* Form Section */}
            <FadeIn>
              <GlassPanel className="p-8 md:p-10 rounded-3xl">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Project Type Selection */}
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-wider text-muted mb-4">
                      Type de projet
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {projectTypes.map((type) => {
                        const Icon = type.icon;
                        const isSelected = selectedType === type.id;
                        return (
                          <motion.button
                            key={type.id}
                            type="button"
                            onClick={() => setSelectedType(type.id)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={cn(
                              "p-4 rounded-xl border transition-all duration-300 text-left",
                              isSelected
                                ? "border-primary bg-primary/10"
                                : "border-white/10 bg-white/5 hover:border-white/20"
                            )}
                          >
                            <div
                              className={cn(
                                "w-10 h-10 rounded-lg flex items-center justify-center mb-3",
                                isSelected
                                  ? "bg-primary text-dark"
                                  : "bg-white/10"
                              )}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <p className="font-bold text-sm">{type.label}</p>
                            <p className="text-xs text-muted mt-1">
                              {type.description}
                            </p>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name & Email Row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-bold uppercase tracking-wider text-muted mb-2"
                      >
                        {t("form.nameLabel")}
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                        <input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-dark/50 border border-white/10 text-text placeholder:text-muted/50 focus:outline-none focus:border-primary/50 transition-colors"
                          placeholder={t("form.placeholders.name")}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-bold uppercase tracking-wider text-muted mb-2"
                      >
                        {t("form.emailLabel")}
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                        <input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-dark/50 border border-white/10 text-text placeholder:text-muted/50 focus:outline-none focus:border-primary/50 transition-colors"
                          placeholder={t("form.placeholders.email")}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Budget Selection */}
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-wider text-muted mb-2">
                      {t("form.budgetLabel")}
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsBudgetOpen(!isBudgetOpen)}
                        className={cn(
                          "w-full px-4 py-3 rounded-xl bg-dark/50 border border-white/10 text-left flex items-center justify-between transition-colors",
                          isBudgetOpen && "border-primary/50"
                        )}
                      >
                        <span
                          className={
                            selectedBudget ? "text-text" : "text-muted/50"
                          }
                        >
                          {selectedBudget || t("form.placeholders.budget")}
                        </span>
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 text-muted transition-transform",
                            isBudgetOpen && "rotate-180"
                          )}
                        />
                      </button>

                      {isBudgetOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute top-full left-0 right-0 mt-2 py-2 rounded-xl bg-dark border border-white/10 shadow-xl z-10"
                        >
                          {budgetOptions.map((option) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() => {
                                setSelectedBudget(option);
                                setIsBudgetOpen(false);
                              }}
                              className={cn(
                                "w-full px-4 py-2 text-left text-sm hover:bg-white/5 transition-colors",
                                selectedBudget === option &&
                                  "text-primary bg-primary/5"
                              )}
                            >
                              {option}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-bold uppercase tracking-wider text-muted mb-2"
                    >
                      {t("form.messageLabel")}
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-dark/50 border border-white/10 text-text placeholder:text-muted/50 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                      placeholder={t("form.placeholders.message")}
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-xl bg-primary text-dark font-bold text-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-[0_0_30px_rgba(27,168,150,0.3)]"
                  >
                    <Send className="w-5 h-5" />
                    {t("form.submit")}
                  </motion.button>
                </form>
              </GlassPanel>
            </FadeIn>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Direct Contact Card */}
              <SlideIn direction="right">
                <GlassPanel className="p-6 rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-muted">
                        {t("emailTitle")}
                      </p>
                      <p className="font-bold">{t("email")}</p>
                    </div>
                  </div>
                  <a
                    href={`mailto:${t("email")}`}
                    className="inline-flex items-center gap-2 text-primary font-bold hover:translate-x-1 transition-transform"
                  >
                    {t("emailCta")}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </GlassPanel>
              </SlideIn>

              {/* Calendar Card */}
              <SlideIn direction="right" delay={0.1}>
                <GlassPanel className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-muted">
                        {t("calendarTitle")}
                      </p>
                      <p className="font-bold">30 min offertes</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted mb-4">
                    Prenez directement rendez-vous avec notre équipe pour
                    discuter de votre projet.
                  </p>
                  <button className="w-full py-3 rounded-xl border border-primary text-primary font-bold hover:bg-primary hover:text-dark transition-colors flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {t("calendarCta")}
                  </button>
                </GlassPanel>
              </SlideIn>

              {/* Response Time Card */}
              <SlideIn direction="right" delay={0.2}>
                <GlassPanel className="p-6 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center">
                      <Clock className="w-7 h-7 text-green-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-display font-black text-green-400">
                        &lt;24h
                      </p>
                      <p className="text-sm text-muted">
                        Temps de réponse moyen
                      </p>
                    </div>
                  </div>
                </GlassPanel>
              </SlideIn>

              {/* Office Card */}
              <SlideIn direction="right" delay={0.3}>
                <GlassPanel className="p-6 rounded-2xl">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-5 h-5 text-muted" />
                    </div>
                    <div>
                      <p className="font-bold mb-1">Paris</p>
                      <p className="text-sm text-muted">
                        117 avenue des Champs-Élysées
                        <br />
                        75008 Paris, France
                      </p>
                    </div>
                  </div>
                </GlassPanel>
              </SlideIn>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <CtaSection
        title="Prêt à transformer votre vision en réalité ?"
        subtitle="Notre équipe d'experts est prête à relever vos défis les plus ambitieux."
        ctaLabel="Voir nos réalisations"
        ctaHref="/work"
        variant="card"
      />
    </>
  );
}
