import Image from "next/image";
import { PageHero } from "../PageHero";
import type { Production } from "../site-data";
import { siteAsset, siteHref } from "../site-paths";

type ProductionDetailProps = {
  production: Production;
};

export function ProductionDetail({ production }: ProductionDetailProps) {
  return (
    <>
      <PageHero
        compact
        eyebrow="OZ Visions production"
        title={production.title}
        description={production.description}
      >
        <span className="status page-status">In development</span>
      </PageHero>

      <section className="inner-section production-detail">
        <div className="section-shell">
          <a className="back-link" href={siteHref("/productions")}>
            ← All productions
          </a>

          <figure className="media-frame production-detail-image">
            <Image
              src={siteAsset("/assets/production-still.webp")}
              alt="A cinema camera and reflected studio light representing the OZ Visions production slate"
              fill
              priority
              unoptimized
              sizes="(max-width: 900px) 100vw, 90vw"
            />
          </figure>

          <div className="production-detail-grid">
            <h2>Overview</h2>
            <div>
              <p className="inner-lead">{production.description}</p>
              <p>
                This page is prepared to hold the project&apos;s synopsis,
                trailer, stills, credits, and release information as each item
                is approved for publication.
              </p>
              <dl className="project-facts">
                <div>
                  <dt>Status</dt>
                  <dd>In development</dd>
                </div>
                <div>
                  <dt>Studio</dt>
                  <dd>OZ Visions USA</dd>
                </div>
                <div>
                  <dt>Category</dt>
                  <dd>Independent production</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="page-cta paper-section">
        <div className="section-shell page-cta-grid">
          <h2>Explore the complete production slate.</h2>
          <a className="button button-dark" href={siteHref("/productions")}>
            All productions
          </a>
        </div>
      </section>
    </>
  );
}
