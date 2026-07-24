import Link from "next/link";

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
        <Link className="button button-primary" href="/">
          Return home
        </Link>
      </div>
    </section>
  );
}
