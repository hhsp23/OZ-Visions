"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileMenu } from "./MobileMenu";
import { navigation } from "./site-data";

function isCurrentPath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Primary navigation">
        <Link className="wordmark" href="/" aria-label="OZ Visions USA home">
          <span>OZ</span>
          <span>Visions</span>
        </Link>

        <div className="desktop-nav">
          {navigation.map((item) => {
            const isActive = isCurrentPath(pathname, item.href);

            return (
              <Link
                className={isActive ? "is-active" : undefined}
                href={item.href}
                key={item.href}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            className={`nav-cta${pathname === "/contact" ? " is-active" : ""}`}
            href="/contact"
            aria-current={pathname === "/contact" ? "page" : undefined}
          >
            Start a project
          </Link>
        </div>

        <MobileMenu items={navigation} currentPath={pathname} />
      </nav>
    </header>
  );
}
