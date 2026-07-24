import Image from "next/image";
import Link from "next/link";
import { HeroShader } from "./HeroShader";
import { productions, services } from "./site-data";

const chapters = [
  {
    title: "Vision and principles",
    description: "The ideas that guide the work and the company.",
    href: "/vision",
  },
  {
    title: "About OZ",
    description: "The mission, studio model, and long-term direction.",
    href: "/about",
  },
  {
    title: "Productions",
    description: "Four original titles in development.",
    href: "/productions",
  },
  {
    title: "Commercial services",
    description: "Film, media, podcast, brand, and event production.",
    href: "/services",
  },
  {
    title: "The Four Quarters",
    description: "A growing story world of lore and concept art.",
    href: "/four-quarters",
  },
] as const;

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <HeroShader src="/assets/oz-ghost-banner.webp" />
        <div className="hero-shade" aria-hidden="true" />

        <div className="hero-content">
          <h1 id="hero-title">
            <span className="hero-title-mark">OZ</span>
            <span className="hero-title-name">Visions</span>
          </h1>
          <div className="hero-lower">
            <p className="hero-tagline">
              Independent productions and creative media
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/productions">
                View productions
              </Link>
              <Link className="button button-secondary" href="/contact">
                Start a project
              </Link>
            </div>
          </div>
        </div>
        <span className="hero-interaction-hint" aria-hidden="true">
          Move across the image
        </span>
      </section>

      <div className="spectrum-rule" aria-hidden="true" />

      <section className="intro section" aria-labelledby="intro-title">
        <div className="section-shell intro-grid">
          <p className="section-label">OZ Visions USA</p>
          <div>
            <h2 id="intro-title">
              Original stories and production craft under one roof.
            </h2>
            <p className="intro-copy">
              OZ Visions develops independent films and story worlds while
              creating commercial work for brands, artists, and collaborators.
            </p>
          </div>
        </div>
      </section>

      <nav className="chapter-shell" aria-label="Explore OZ Visions">
        <div className="chapter-grid chapter-grid-full">
          {chapters.map((chapter, index) => (
            <Link
              className={`chapter chapter-${index + 1}`}
              href={chapter.href}
              key={chapter.href}
            >
              <span className="chapter-title">{chapter.title}</span>
              <span className="chapter-description">
                {chapter.description}
              </span>
              <span className="chapter-action">Explore</span>
            </Link>
          ))}
        </div>
      </nav>

      <section className="section vision" aria-labelledby="vision-title">
        <div className="section-shell vision-grid">
          <div className="vision-heading">
            <h2 id="vision-title">Make the image mean something.</h2>
          </div>
          <div className="vision-copy">
            <p className="lead">
              We believe cinematic work should feel clear, immersive, and
              emotionally exact. The spectacle matters, but the story gives it
              purpose.
            </p>
            <p>
              Our long-term vision joins original productions with a flexible
              studio practice, bringing the same narrative care to client work,
              podcasts, live coverage, and brand development.
            </p>
            <Link className="text-link dark-text-link" href="/vision">
              Read the vision
            </Link>
          </div>
        </div>
      </section>

      <section className="section productions" aria-labelledby="productions-title">
        <div className="section-shell">
          <div className="production-heading">
            <h2 id="productions-title">Four titles. One growing slate.</h2>
            <p>
              The first independent productions shaping the OZ Visions catalog.
            </p>
          </div>

          <div className="productions-grid">
            <figure className="media-frame production-image">
              <Image
                src="/assets/production-still.webp"
                alt="A cinema camera silhouetted in a dark studio beside reflected light"
                width={1200}
                height={900}
                sizes="(max-width: 980px) 100vw, 64vw"
              />
            </figure>

            <div className="production-list">
              {productions.map((production) => (
                <Link
                  href={`/productions/${production.slug}`}
                  key={production.slug}
                >
                  <article>
                    <h3>{production.title}</h3>
                    <p>View production</p>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section services" aria-labelledby="services-title">
        <div className="section-shell">
          <div className="services-heading">
            <h2 id="services-title">From first idea to final delivery.</h2>
            <p>
              A focused production partner for commercial stories, media,
              sound, events, and brand work.
            </p>
          </div>

          <figure className="media-frame services-image">
            <Image
              src="/assets/services-still.webp"
              alt="Cinema lighting, sound, and camera equipment arranged in a dark production studio"
              fill
              sizes="(max-width: 720px) 100vw, 90vw"
            />
          </figure>

          <div className="service-grid">
            {services.slice(0, 4).map((service, index) => (
              <article
                className={`service service-${index + 1}`}
                key={service.title}
              >
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>

          <Link className="section-text-link text-link" href="/services">
            See all services
          </Link>
        </div>
      </section>

      <section className="section world" aria-labelledby="world-title">
        <div className="world-orbit orbit-one" aria-hidden="true" />
        <div className="world-orbit orbit-two" aria-hidden="true" />
        <div className="section-shell world-content">
          <p className="section-label">An original world</p>
          <h2 id="world-title">The Four Quarters</h2>
          <p>
            A growing universe of lore, characters, concept art, and long-form
            storytelling.
          </p>
          <Link className="text-link" href="/four-quarters">
            Enter the world
          </Link>
        </div>
      </section>

      <section className="section contact" aria-labelledby="contact-title">
        <div className="section-shell contact-grid">
          <h2 id="contact-title">Bring us the idea.</h2>
          <div className="contact-action">
            <p>
              Share the brief, timeline, and the kind of production support you
              need.
            </p>
            <Link className="button button-dark" href="/contact">
              Start a project
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
