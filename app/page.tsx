import Image from "next/image";
import { MobileMenu } from "./MobileMenu";

const navigation = [
  { label: "Vision", href: "#vision" },
  { label: "Productions", href: "#productions" },
  { label: "Services", href: "#services" },
  { label: "The Four Quarters", href: "#world" },
];

const chapters = [
  {
    title: "Vision and principles",
    description: "The ideas that guide the work and the company.",
    href: "#vision",
  },
  {
    title: "Productions",
    description: "Four original titles in development.",
    href: "#productions",
  },
  {
    title: "Commercial services",
    description: "Film, media, podcast, brand, and event production.",
    href: "#services",
  },
  {
    title: "The Four Quarters",
    description: "A growing story world of lore and concept art.",
    href: "#world",
  },
];

const productions = [
  "Manhood",
  "Exegesis",
  "Ideophobia",
  "The Primus Voyage",
];

const services = [
  {
    title: "Creative and media production",
    items: ["Creative production", "Media production", "Event coverage"],
  },
  {
    title: "Sound and conversation",
    items: ["Podcast production"],
  },
  {
    title: "Brand and direction",
    items: ["Brand development", "Consulting"],
  },
  {
    title: "Built around the brief",
    items: ["Custom services"],
  },
];

function Wordmark({ footer = false }: { footer?: boolean }) {
  return (
    <a
      className={`wordmark${footer ? " footer-wordmark" : ""}`}
      href="#top"
      aria-label="OZ Visions USA home"
    >
      <span>OZ</span>
      <span>Visions</span>
    </a>
  );
}

function PrimaryNavigation() {
  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Primary navigation">
        <Wordmark />

        <div className="desktop-nav">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          <a className="nav-cta" href="#contact">
            Start a project
          </a>
        </div>

        <MobileMenu items={navigation} />
      </nav>
    </header>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <PrimaryNavigation />

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <Image
            className="hero-image"
            src="/assets/oz-horizon.webp"
            alt=""
            fill
            priority
            sizes="100vw"
          />
          <div className="hero-shade" aria-hidden="true" />

          <div className="hero-content">
            <h1 id="hero-title">
              <span>OZ</span>
              <span>Visions</span>
            </h1>
            <p className="hero-tagline">
              Independent productions and creative media
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#productions">
                View productions
              </a>
              <a className="button button-secondary" href="#contact">
                Start a project
              </a>
            </div>
          </div>
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
                creating commercial work for brands, artists, and
                collaborators.
              </p>
            </div>
          </div>
        </section>

        <nav className="chapter-shell" aria-label="Explore OZ Visions">
          <div className="chapter-grid">
            {chapters.map((chapter, index) => (
              <a
                className={`chapter chapter-${index + 1}`}
                href={chapter.href}
                key={chapter.href}
              >
                <span className="chapter-title">{chapter.title}</span>
                <span className="chapter-description">
                  {chapter.description}
                </span>
                <span className="chapter-action">Explore</span>
              </a>
            ))}
          </div>
        </nav>

        <section
          className="section vision"
          id="vision"
          aria-labelledby="vision-title"
        >
          <div className="section-shell vision-grid">
            <div className="vision-heading">
              <h2 id="vision-title">Make the image mean something.</h2>
            </div>
            <div className="vision-copy">
              <p className="lead">
                We believe cinematic work should feel clear, immersive, and
                emotionally exact. The spectacle matters, but the story gives
                it purpose.
              </p>
              <p>
                Our long-term vision joins original productions with a flexible
                studio practice, bringing the same narrative care to client
                work, podcasts, live coverage, and brand development.
              </p>
              <div className="principles">
                <article>
                  <h3>Story gives form</h3>
                  <p>
                    Every visual and production choice begins with the idea it
                    needs to carry.
                  </p>
                </article>
                <article>
                  <h3>Craft serves the brief</h3>
                  <p>
                    We build the right team and process around the work instead
                    of forcing every project through one template.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section
          className="section productions"
          id="productions"
          aria-labelledby="productions-title"
        >
          <div className="section-shell">
            <div className="production-heading">
              <h2 id="productions-title">Four titles. One growing slate.</h2>
              <p>
                The first independent productions shaping the OZ Visions
                catalog.
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
                  <article key={production}>
                    <h3>{production}</h3>
                    <p>Independent production</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          className="section services"
          id="services"
          aria-labelledby="services-title"
        >
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
              {services.map((service, index) => (
                <article
                  className={`service service-${index + 1}`}
                  key={service.title}
                >
                  <h3>{service.title}</h3>
                  <ul>
                    {service.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="section world"
          id="world"
          aria-labelledby="world-title"
        >
          <div className="world-orbit orbit-one" aria-hidden="true" />
          <div className="world-orbit orbit-two" aria-hidden="true" />
          <div className="section-shell world-content">
            <p className="section-label">An original world</p>
            <h2 id="world-title">The Four Quarters</h2>
            <p>
              A growing universe of lore, characters, concept art, and
              long-form storytelling. The first public look will arrive here.
            </p>
            <span className="status">In development</span>
          </div>
        </section>

        <section
          className="section contact"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="section-shell contact-grid">
            <h2 id="contact-title">Bring us the idea.</h2>
            <div className="contact-action">
              <p>
                Share the brief, timeline, and the kind of production support
                you need.
              </p>
              <a
                className="button button-dark"
                href="https://www.linkedin.com/company/ozpictures"
                target="_blank"
                rel="noreferrer"
              >
                Start a project
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-shell">
          <Wordmark footer />
          <p>Austin, Texas</p>
          <p>© 2026 OZ Visions USA</p>
        </div>
      </footer>
    </>
  );
}
