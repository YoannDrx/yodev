"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Database, MessageSquare, Shield, Check, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const icons = {
  Database,
  MessageSquare,
  Shield,
};

type UseCase = {
  icon: keyof typeof icons;
  title: string;
  description: string;
  features: string[];
};

type TabKey = "startup" | "pme" | "enterprise";

export function UseCasesSection() {
  const t = useTranslations("Home.useCases");
  const [activeTab, setActiveTab] = useState<TabKey>("pme");
  const useCases = t.raw("pme") as UseCase[];

  const tabs: { key: TabKey; label: string }[] = [
    { key: "startup", label: t("tabs.startup") },
    { key: "pme", label: t("tabs.pme") },
    { key: "enterprise", label: t("tabs.enterprise") },
  ];

  return (
    <section className="py-24">
      <Container>
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl font-display font-bold mb-4">{t("title")}</h2>
            <p className="text-muted">{t("subtitle")}</p>
          </div>

          {/* Tabs */}
          <div className="flex glass-panel p-1.5 rounded-2xl no-scrollbar overflow-x-auto whitespace-nowrap">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "px-6 py-3 rounded-xl transition-all font-medium",
                  activeTab === tab.key
                    ? "bg-primary text-dark font-bold"
                    : "text-muted hover:text-text"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Use Case Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => {
            const Icon = icons[useCase.icon];
            return (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassPanel
                  className="p-10 rounded-[2rem] hover:border-primary/50 transition-all duration-300 group h-full"
                  hover
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                    {Icon && <Icon className="w-8 h-8 text-primary" />}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{useCase.title}</h3>
                  <p className="text-muted mb-6 leading-relaxed">{useCase.description}</p>
                  <ul className="space-y-3 mb-8 text-sm">
                    {useCase.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/work"
                    className="text-primary font-bold inline-flex items-center group-hover:underline"
                  >
                    Découvrir le cas client
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </Link>
                </GlassPanel>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
