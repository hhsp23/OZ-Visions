import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "../../PageHero";
import { getProduction, productions } from "../../site-data";

type ProductionPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return productions.map((production) => ({ slug: production.slug }));
}

export async function generateMetadata({
  params,
}: ProductionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const production = getProduction(slug);

  if (!production) {
    return { title: "Production not found | OZ Visions USA" };
  }

  return {
    title: `${production.title} | OZ Visions USA`,
    description: production.description,
  };
}

export default async function ProductionPage({ params }: ProductionPageProps) {
  const { slug } = await params;
  const production = getProduction(slug);

  if (!production) {
    notFound();
  }

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
          <Link className="back-link" href="/productions">
            ← All productions
          </Link>

          <figure className="media-frame production-detail-image">
            <Image
              src="/assets/production-still.webp"
              alt="A cinema camera and reflected studio light representing the OZ Visions production slate"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 90vw"
            />
          </figure>

          <div className="production-detail-grid">
            <h2>Overview</h2>
            <div>
              <p className="inner-lead">{production.description}</p>
              <p>
                This page is prepared to hold the project’s synopsis, trailer,
                stills, credits, and release information as each item is
                approved for publication.
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
          <Link className="button button-dark" href="/productions">
            All productions
          </Link>
        </div>
      </section>
    </>
  );
}
