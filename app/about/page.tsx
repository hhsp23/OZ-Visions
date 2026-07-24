import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "../PageHero";

export const metadata: Metadata = {
  title: "About | OZ Visions USA",
  description:
    "Meet the independent studio model behind OZ Visions USA and its original and commercial production work.",
};

const statements = [
  {
    title: "Mission",
    copy: "Develop original productions with a distinct point of view while offering thoughtful, flexible production support to clients and collaborators.",
  },
  {
    title: "Studio model",
    copy: "OZ Visions brings independent development and commercial production into one practice, allowing both sides of the studio to share craft, experience, and momentum.",
  },
  {
    title: "Direction",
    copy: "The company is building a lasting catalog of films and story worlds alongside a trusted creative-services practice.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About OZ Visions"
        title="An independent studio with two connected practices."
        description="We develop original productions and story worlds, then bring the same attention to narrative and craft into commercial film, media, sound, event, and brand work."
      />

      <section className="inner-section about-feature">
        <div className="section-shell inner-media-grid">
          <figure className="media-frame">
            <Image
              src="/assets/production-still.webp"
              alt="A cinema camera silhouetted in a dark production studio"
              width={1200}
              height={900}
              sizes="(max-width: 900px) 100vw, 56vw"
            />
          </figure>
          <div className="about-feature-copy">
            <p className="section-label">OZ Visions USA</p>
            <h2>Original work informs the client work, and the client work sharpens the studio.</h2>
            <p>
              This connected model keeps the company curious, practical, and
              close to the full production process.
            </p>
          </div>
        </div>
      </section>

      <section className="inner-section paper-section">
        <div className="section-shell statement-list">
          {statements.map((statement) => (
            <article key={statement.title}>
              <h2>{statement.title}</h2>
              <p>{statement.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-cta paper-section">
        <div className="section-shell page-cta-grid">
          <h2>Work with the studio.</h2>
          <Link className="button button-dark" href="/contact">
            Start a conversation
          </Link>
        </div>
      </section>
    </>
  );
}
