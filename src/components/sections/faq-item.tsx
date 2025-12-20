"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
  className?: string;
}

export function FaqItem({
  question,
  answer,
  defaultOpen = false,
  className,
}: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface/80 transition-all duration-300",
        isOpen && "border-primary/20 shadow-sm",
        className
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-semibold text-text">{question}</span>
        <motion.div
          className={cn(
            "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border transition-colors",
            isOpen
              ? "border-primary bg-primary text-white"
              : "border-border bg-surface text-muted"
          )}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? (
            <Minus className="h-4 w-4" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">
              <p className="text-sm leading-relaxed text-muted">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface FaqListProps {
  items: Array<{ question: string; answer: string }>;
  columns?: 1 | 2;
  className?: string;
}

export function FaqList({ items, columns = 2, className }: FaqListProps) {
  const gridCols = columns === 2 ? "md:grid-cols-2" : "";

  return (
    <div className={cn("grid gap-4", gridCols, className)}>
      {items.map((item, index) => (
        <FaqItem
          key={index}
          question={item.question}
          answer={item.answer}
        />
      ))}
    </div>
  );
}
