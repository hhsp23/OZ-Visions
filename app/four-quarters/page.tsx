import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "../PageHero";

export const metadata: Metadata = {
  title: "The Four Quarters | OZ Visions USA",
  description:
    "The Four Quarters is an original OZ Visions story world currently in development.",
};

export default function FourQuartersPage() {
  return (
    <>
      <PageHero
        eyebrow="An original world"
        title="The Four Quarters"
        description="A growing universe of lore, characters, concept art, and long-form storytelling being developed by OZ Visions."
      >
        <span className="status page-status">In development</span>
      </PageHero>

      <section className="world-showcase">
        <div className="world-orbit showcase-orbit orbit-one" aria-hidden="true" />
        <div className="world-orbit showcase-orbit orbit-two" aria-hidden="true" />
        <div className="section-shell world-showcase-content">
          <p className="section-label">The world is taking shape</p>
          <h2>A dedicated home for the mythology as it grows.</h2>
          <p>
            This section is prepared for the approved story overview, lore,
            character introductions, and concept artwork. For now, it marks the
            world’s place within the wider OZ Visions slate.
          </p>
        </div>
      </section>

      <section className="page-cta paper-section">
        <div className="section-shell page-cta-grid">
          <h2>Return to the wider OZ Visions slate.</h2>
          <Link className="button button-dark" href="/productions">
            View productions
          </Link>
        </div>
      </section>
    </>
  );
}
