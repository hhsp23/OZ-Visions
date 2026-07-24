import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
  compact?: boolean;
};

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  compact = false,
}: PageHeroProps) {
  return (
    <section className={`page-hero${compact ? " page-hero-compact" : ""}`}>
      <div className="section-shell page-hero-grid">
        <p className="section-label">{eyebrow}</p>
        <div>
          <h1>{title}</h1>
          <p className="page-hero-description">{description}</p>
          {children}
        </div>
      </div>
    </section>
  );
}
