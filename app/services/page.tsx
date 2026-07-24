import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "../PageHero";
import { services } from "../site-data";

export const metadata: Metadata = {
  title: "Commercial Services | OZ Visions USA",
  description:
    "Creative production, media, podcasts, brand development, consulting, and event coverage from OZ Visions USA.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Commercial services"
        title="A focused production partner from first idea to final delivery."
        description="OZ Visions supports brands, artists, organizations, and collaborators with a flexible production practice built around the brief."
      />

      <section className="inner-section services-feature">
        <div className="section-shell">
          <figure className="media-frame services-page-image">
            <Image
              src="/assets/services-still.webp"
              alt="Camera, sound, and lighting equipment in a production studio"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 90vw"
            />
          </figure>

          <div className="service-index">
            {services.map((service, index) => (
              <article key={service.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2>{service.title}</h2>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="inner-section paper-section">
        <div className="section-shell split-statement">
          <h2>The process follows the project.</h2>
          <div>
            <p className="inner-lead">
              Some briefs need a complete production partner. Others need a
              focused team for one stage of the work.
            </p>
            <p>
              We define the useful scope first, assemble the right process, and
              keep communication direct from planning through delivery.
            </p>
          </div>
        </div>
      </section>

      <section className="page-cta paper-section">
        <div className="section-shell page-cta-grid">
          <h2>Tell us what the project needs.</h2>
          <Link className="button button-dark" href="/contact">
            Start a project
          </Link>
        </div>
      </section>
    </>
  );
}
