import { useTranslations } from "next-intl";
import { PageIntro } from "@/components/site/page-intro";
import { buttonClassName } from "@/components/ui/button-styles";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

export default function ContactPage() {
  const t = useTranslations("ContactPage");
  const info = t.raw("info") as string[];

  return (
    <>
      <PageIntro title={t("title")} subtitle={t("subtitle")} />
      <Section eyebrow={t("title")} title={t("title")}>
        <div className="grid gap-8 md:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4 text-sm text-muted">
            {info.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-accent" />
                {item}
              </div>
            ))}
            <Card className="p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">
                {t("emailTitle")}
              </p>
              <p className="mt-2 text-sm text-text">hello@yodev.studio</p>
            </Card>
            <a
              href="mailto:hello@yodev.studio"
              className={buttonClassName({ variant: "secondary", size: "lg" })}
            >
              {t("emailCta")}
            </a>
          </div>

          <Card className="p-6">
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="full-name"
                  className="text-xs uppercase tracking-[0.2em] text-muted"
                >
                  {t("form.nameLabel")}
                </label>
                <input
                  id="full-name"
                  type="text"
                  className="mt-2 w-full rounded-[var(--radius-md)] border border-border bg-surface px-4 py-3 text-sm text-text outline-none focus:border-accent/60"
                  placeholder={t("form.placeholders.name")}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-xs uppercase tracking-[0.2em] text-muted"
                >
                  {t("form.emailLabel")}
                </label>
                <input
                  id="email"
                  type="email"
                  className="mt-2 w-full rounded-[var(--radius-md)] border border-border bg-surface px-4 py-3 text-sm text-text outline-none focus:border-accent/60"
                  placeholder={t("form.placeholders.email")}
                />
              </div>
              <div>
                <label
                  htmlFor="budget"
                  className="text-xs uppercase tracking-[0.2em] text-muted"
                >
                  {t("form.budgetLabel")}
                </label>
                <input
                  id="budget"
                  type="text"
                  className="mt-2 w-full rounded-[var(--radius-md)] border border-border bg-surface px-4 py-3 text-sm text-text outline-none focus:border-accent/60"
                  placeholder={t("form.placeholders.budget")}
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="text-xs uppercase tracking-[0.2em] text-muted"
                >
                  {t("form.messageLabel")}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="mt-2 w-full resize-none rounded-[var(--radius-md)] border border-border bg-surface px-4 py-3 text-sm text-text outline-none focus:border-accent/60"
                  placeholder={t("form.placeholders.message")}
                />
              </div>
              <button
                type="submit"
                className="h-11 w-full rounded-[var(--radius-lg)] bg-accent text-sm font-semibold text-black shadow-glow transition hover:brightness-110"
              >
                {t("form.submit")}
              </button>
            </form>
          </Card>
        </div>
      </Section>
    </>
  );
}
