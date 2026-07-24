import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "../PageHero";

export const metadata: Metadata = {
  title: "Contact | OZ Visions USA",
  description:
    "Start a conversation with OZ Visions USA about a production, media, podcast, event, brand, or consulting project.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Start a project"
        title="Bring us the idea."
        description="Share the brief, timeline, and the kind of production support you need. We can shape the next conversation from there."
      />

      <section className="inner-section paper-section contact-page">
        <div className="section-shell contact-page-grid">
          <div>
            <p className="section-label">Direct contact</p>
            <h2>Start with a short introduction.</h2>
          </div>
          <div className="contact-direct">
            <p>
              Until the project inquiry form and direct contact details are
              finalized, LinkedIn is the active route to the OZ Visions team.
            </p>
            <a
              className="button button-dark"
              href="https://www.linkedin.com/company/ozpictures"
              target="_blank"
              rel="noreferrer"
            >
              Contact OZ Visions on LinkedIn
            </a>
          </div>
        </div>
      </section>

      <section className="page-cta paper-section">
        <div className="section-shell page-cta-grid">
          <h2>Looking for a specific service?</h2>
          <Link className="button button-dark" href="/services">
            Explore services
          </Link>
        </div>
      </section>
    </>
  );
}
