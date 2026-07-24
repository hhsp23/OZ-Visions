import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <Link
          className="wordmark footer-wordmark"
          href="/"
          aria-label="OZ Visions USA home"
        >
          <span>OZ</span>
          <span>Visions</span>
        </Link>
        <nav className="footer-nav" aria-label="Footer navigation">
          <Link href="/productions">Productions</Link>
          <Link href="/services">Services</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="footer-meta">
          <p>Austin, Texas</p>
          <p>&copy; 2026 OZ Visions USA</p>
        </div>
      </div>
    </footer>
  );
}
