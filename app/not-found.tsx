import { siteHref } from "./site-paths";

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="section-shell">
        <p className="section-label">404</p>
        <h1>This page is outside the frame.</h1>
        <p>
          The address may have changed, or the page may not be part of the
          current OZ Visions site.
        </p>
        <a className="button button-primary" href={siteHref("/")}>
          Return home
        </a>
      </div>
    </section>
  );
}
