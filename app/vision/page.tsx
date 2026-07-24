import type { Metadata } from "next";
import { PageHero } from "../PageHero";
import { siteHref } from "../site-paths";

export const metadata: Metadata = {
  title: "Vision & Principles | OZ Visions USA",
  description:
    "The ideas and principles guiding OZ Visions USA and its independent production work.",
};

const principles = [
  {
    title: "Story before spectacle",
    description:
      "The visual language begins with the idea, emotion, and audience the work needs to serve.",
  },
  {
    title: "Purpose in every frame",
    description:
      "Strong production choices feel deliberate. Nothing is added simply to make the work look busy.",
  },
  {
    title: "Flexible by design",
    description:
      "The team and process adjust to the brief, keeping each project focused and appropriately scaled.",
  },
  {
    title: "Built for the long term",
    description:
      "Original productions and commercial practice grow together, strengthening the studio over time.",
  },
] as const;

export default function VisionPage() {
  return (
    <>
      <PageHero
        eyebrow="Vision and principles"
        title="Make the image mean something."
        description="OZ Visions exists to develop original stories and make production work with clarity, atmosphere, and emotional purpose."
      />

      <section className="inner-section paper-section">
        <div className="section-shell split-statement">
          <h2>Story gives the work its form.</h2>
          <div>
            <p className="inner-lead">
              Cinematic craft matters most when it carries an idea. That belief
              guides our films, media work, recorded conversations, live
              coverage, and brand collaborations.
            </p>
            <p>
              We aim to make work that feels considered without becoming
              distant, and ambitious without losing sight of the people it
              needs to reach.
            </p>
          </div>
        </div>
      </section>

      <section className="inner-section">
        <div className="section-shell">
          <div className="inner-heading">
            <p className="section-label">Working principles</p>
            <h2>A clear standard for every kind of project.</h2>
          </div>
          <div className="principle-index">
            {principles.map((principle, index) => (
              <article key={principle.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-cta paper-section">
        <div className="section-shell page-cta-grid">
          <h2>See how the vision becomes work.</h2>
          <a className="button button-dark" href={siteHref("/productions")}>
            View productions
          </a>
        </div>
      </section>
    </>
  );
}
