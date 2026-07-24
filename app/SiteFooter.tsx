import { siteHref } from "./site-paths";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <a
          className="wordmark footer-wordmark"
          href={siteHref("/")}
          aria-label="OZ Visions USA home"
        >
          <span>OZ</span>
          <span>Visions</span>
        </a>
        <nav className="footer-nav" aria-label="Footer navigation">
          <a href={siteHref("/productions")}>Productions</a>
          <a href={siteHref("/services")}>Services</a>
          <a href={siteHref("/contact")}>Contact</a>
        </nav>
        <div className="footer-meta">
          <p>Austin, Texas</p>
          <p>&copy; 2026 OZ Visions USA</p>
        </div>
      </div>
    </footer>
  );
}
