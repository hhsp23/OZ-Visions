import Image from "next/image";
import { MobileMenu } from "./MobileMenu";

const productions = [
  "Manhood",
  "Exegesis",
  "Ideophobia",
  "The Primus Voyage",
];

const serviceGroups = [
  {
    title: "Creative production",
    description:
      "Commercials, music videos, narrative film, creative direction, and custom production.",
  },
  {
    title: "Media and podcast",
    description:
      "Podcast production, digital media, event coverage, interviews, and multi-camera capture.",
  },
  {
    title: "Brand and consulting",
    description:
      "Brand development, campaign planning, production strategy, and focused creative consulting.",
  },
];

const navigation = [
  { label: "About", href: "#about" },
  { label: "Productions", href: "#productions" },
  { label: "Services", href: "#services" },
  { label: "The Four Quarters", href: "#world" },
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
            <div className="spectral-line" aria-hidden="true" />
            <h1 id="hero-title">
              <span>Independent stories.</span>
              <span>Commercial craft.</span>
            </h1>
            <p>
              OZ Visions creates film, media, podcasts, brands, and live
              coverage from Austin, Texas.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contact">
                Start a project
              </a>
              <a className="button button-secondary" href="#productions">
                View productions
              </a>
            </div>
          </div>
        </section>

        <section
          className="section about"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="section-shell about-grid">
            <div>
              <p className="section-label">OZ Visions USA</p>
              <h2 id="about-title">
                A production company for ambitious ideas.
              </h2>
            </div>
            <div className="about-copy">
              <p className="lead">
                We develop original worlds and help clients shape clear,
                cinematic work across film, sound, brand, and live media.
              </p>
              <div className="principles" aria-label="Company principles">
                <div>
                  <h3>Story first</h3>
                  <p>
                    Narrative thinking guides every format, from a short
                    campaign to a long-form production.
                  </p>
                </div>
                <div>
                  <h3>Built together</h3>
                  <p>
                    Flexible teams bring the right creative and production
                    expertise to each project.
                  </p>
                </div>
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
            <div className="section-heading">
              <h2 id="productions-title">Original work in development.</h2>
              <p>
                A first look at the independent stories shaping the OZ Visions
                slate.
              </p>
            </div>

            <div className="productions-grid">
              <figure className="media-frame">
                <Image
                  src="/assets/production-still.webp"
                  alt="A cinema camera silhouetted in a dark studio beside a pool of reflected light"
                  width={1200}
                  height={900}
                  sizes="(max-width: 1024px) 100vw, 65vw"
                />
              </figure>

              <div className="production-list">
                {productions.map((production) => (
                  <article key={production}>
                    <h3>{production}</h3>
                    <p>Narrative production</p>
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
            <div className="services-intro">
              <h2 id="services-title">One team from idea to delivery.</h2>
              <p>
                Practical production support, shaped around the story and the
                audience.
              </p>
            </div>

            <figure className="services-image">
              <Image
                src="/assets/services-still.webp"
                alt="Cinema lighting, sound, and camera equipment arranged in a dark production studio"
                fill
                sizes="(max-width: 720px) 100vw, 90vw"
              />
            </figure>

            <div className="service-groups">
              {serviceGroups.map((service) => (
                <article key={service.title}>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
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
          <div className="world-orbit" aria-hidden="true" />
          <div className="section-shell world-content">
            <p className="section-label">An original world</p>
            <h2 id="world-title">The Four Quarters</h2>
            <p>
              Lore, concept art, and a growing story world. A first public look
              will arrive here.
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
            <div>
              <h2 id="contact-title">Have a project in mind?</h2>
            </div>
            <div className="contact-action">
              <p>
                Tell us what you are making, who it is for, and where you need
                support.
              </p>
              <a
                className="button button-primary"
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
