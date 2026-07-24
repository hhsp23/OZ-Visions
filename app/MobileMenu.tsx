"use client";

import { useEffect, useRef, useState } from "react";
import { siteHref } from "./site-paths";

type NavigationItem = {
  label: string;
  href: string;
};

function isCurrentPath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MobileMenu({
  items,
  currentPath,
}: {
  items: readonly NavigationItem[];
  currentPath: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <div className="mobile-menu">
      <button
        ref={buttonRef}
        className="mobile-menu-button"
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-menu-panel"
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? "Close" : "Menu"}
      </button>
      <div
        className={`mobile-menu-panel${isOpen ? " is-open" : ""}`}
        id="mobile-menu-panel"
      >
        {items.map((item) => {
          const isActive = isCurrentPath(currentPath, item.href);

          return (
            <a
              className={isActive ? "is-active" : undefined}
              key={item.href}
              href={siteHref(item.href)}
              aria-current={isActive ? "page" : undefined}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          );
        })}
        <a
          className={currentPath === "/contact" ? "is-active" : undefined}
          href={siteHref("/contact")}
          aria-current={currentPath === "/contact" ? "page" : undefined}
          onClick={() => setIsOpen(false)}
        >
          Start a project
        </a>
      </div>
    </div>
  );
}
