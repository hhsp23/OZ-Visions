import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "../PageHero";
import { productions } from "../site-data";

export const metadata: Metadata = {
  title: "Productions | OZ Visions USA",
  description:
    "Explore the first four independent titles in the growing OZ Visions USA production slate.",
};

export default function ProductionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Original productions"
        title="Four titles. One growing slate."
        description="The first independent productions being developed through OZ Visions, each with its own dedicated home as materials and release information become public."
      />

      <section className="inner-section production-index-section">
        <div className="section-shell production-index-layout">
          <figure className="media-frame production-index-image">
            <Image
              src="/assets/production-still.webp"
              alt="A cinema camera and reflected studio light"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 52vw"
            />
          </figure>

          <div className="production-index">
            {productions.map((production, index) => (
              <Link
                href={`/productions/${production.slug}`}
                key={production.slug}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h2>{production.title}</h2>
                  <p>{production.description}</p>
                </div>
                <strong>View</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="page-cta paper-section">
        <div className="section-shell page-cta-grid">
          <h2>Production updates will be added as the slate develops.</h2>
          <Link className="button button-dark" href="/about">
            About the studio
          </Link>
        </div>
      </section>
    </>
  );
}
