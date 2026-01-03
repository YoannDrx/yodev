"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Server, Cpu, Cloud } from "lucide-react";
import { Container } from "@/components/ui/container";
import { GlassPanel } from "@/components/ui/glass-panel";
import { cn } from "@/lib/utils";

type Step = {
  title: string;
  description: string;
};

export function ArchitectureSection() {
  const t = useTranslations("Home.architecture");
  const [currentStep, setCurrentStep] = useState(0);
  const steps = t.raw("steps") as Step[];

  return (
    <section className="py-24 bg-dark relative border-y border-white/5">
      <Container>
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            {t("title")}
          </h2>
          <p className="text-muted max-w-2xl mx-auto">{t("description")}</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Steps Description */}
          <div className="lg:col-span-4 space-y-4">
            {steps.map((step, index) => (
              <button
                key={step.title}
                onClick={() => setCurrentStep(index)}
                className={cn(
                  "w-full text-left p-6 border-l-4 transition-all duration-300 rounded-r-2xl",
                  currentStep === index
                    ? "step-active glass-panel scale-[1.02] border-l-primary text-primary"
                    : "border-transparent opacity-50 hover:opacity-75"
                )}
              >
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted">{step.description}</p>
              </button>
            ))}
          </div>

          {/* Visual Schema Display */}
          <div className="lg:col-span-8 bg-black/40 rounded-[2.5rem] border border-white/10 p-12 relative overflow-hidden h-[500px] flex items-center justify-center">
            {/* Grid background */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(#1BA896 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            <div className="relative w-full h-full flex items-center justify-between px-12">
              {/* Legacy Box */}
              <div className="z-10 group cursor-help">
                <GlassPanel
                  className={cn(
                    "w-32 h-32 flex flex-col items-center justify-center rounded-2xl transition-all duration-500",
                    currentStep === 0 && "border-primary/50 shadow-[0_0_30px_rgba(27,168,150,0.2)]"
                  )}
                >
                  <Server className="w-10 h-10 text-muted mb-2" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted">
                    LEGACY IT
                  </span>
                </GlassPanel>
              </div>

              {/* Connector 1 */}
              <div className="flex-grow mx-4 relative h-px bg-gradient-to-r from-muted/50 via-primary/50 to-primary">
                <motion.div
                  className="absolute top-1/2 left-0 w-2 h-2 -translate-y-1/2 bg-primary rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>

              {/* Yodev Engine / Core */}
              <div className="z-20 relative">
                <motion.div
                  className={cn(
                    "w-48 h-48 bg-primary rounded-3xl flex items-center justify-center",
                    currentStep === 1 && "shadow-[0_0_60px_rgba(27,168,150,0.4)]"
                  )}
                  animate={{ scale: currentStep === 1 ? [1, 1.02, 1] : 1 }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-40 h-40 border-2 border-white/20 rounded-2xl flex flex-col items-center justify-center p-4 text-center">
                    <Cpu className="w-8 h-8 text-dark mb-2" />
                    <span className="text-dark font-black text-xl mb-1">YODEV IA</span>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-dark rounded-full" />
                      <div className="w-1.5 h-1.5 bg-dark rounded-full" />
                      <div className="w-1.5 h-1.5 bg-dark rounded-full" />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Connector 2 */}
              <div className="flex-grow mx-4 h-px bg-gradient-to-r from-primary to-secondary/50 relative">
                <div className="absolute top-1/2 right-0 w-2 h-2 -translate-y-1/2 bg-secondary rounded-full" />
              </div>

              {/* Cloud/Modern UI Box */}
              <div className="z-10 group">
                <GlassPanel
                  className={cn(
                    "w-32 h-32 flex flex-col items-center justify-center rounded-2xl transition-all",
                    currentStep === 2 && "border-secondary shadow-[0_0_30px_rgba(255,107,53,0.2)]"
                  )}
                >
                  <Cloud className="w-10 h-10 text-secondary mb-2" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-secondary">
                    MODERN CLOUD
                  </span>
                </GlassPanel>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
