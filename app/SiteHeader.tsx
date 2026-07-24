"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { MobileMenu } from "./MobileMenu";
import { navigation } from "./site-data";
import { siteAsset, siteBasePath, siteHref } from "./site-paths";

function isCurrentPath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const currentPath = pathname.startsWith(siteBasePath)
    ? pathname.slice(siteBasePath.length) || "/"
    : pathname;

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Primary navigation">
        <a
          className="header-logo"
          href={siteHref("/")}
          aria-label="OZ Visions USA home"
        >
          <Image
            src={siteAsset("/assets/oz-visions-logo.png")}
            alt=""
            width={469}
            height={358}
            priority
            unoptimized
          />
        </a>

        <div className="desktop-nav">
          {navigation.map((item) => {
            const isActive = isCurrentPath(currentPath, item.href);

            return (
              <a
                className={isActive ? "is-active" : undefined}
                href={siteHref(item.href)}
                key={item.href}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </a>
            );
          })}
          <a
            className={`nav-cta${currentPath === "/contact" ? " is-active" : ""}`}
            href={siteHref("/contact")}
            aria-current={currentPath === "/contact" ? "page" : undefined}
          >
            Start a project
          </a>
        </div>

        <MobileMenu items={navigation} currentPath={currentPath} />
      </nav>
    </header>
  );
}
