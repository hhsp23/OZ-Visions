"use client";

import { useEffect, useRef, useState } from "react";

type NavigationItem = {
  label: string;
  href: string;
};

export function MobileMenu({ items }: { items: NavigationItem[] }) {
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
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </a>
        ))}
        <a href="#contact" onClick={() => setIsOpen(false)}>
          Start a project
        </a>
      </div>
    </div>
  );
}
