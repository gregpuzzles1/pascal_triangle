import React from "react";
import { formatYearRange } from "../../lib/yearRange";
import { LINKS } from "../../lib/links";

export default function Footer() {
  const yearText = formatYearRange(2026);
  return (
    <footer className="site-footer">
      <div className="footer-text">© {yearText} Greg Christian</div>
      <nav className="footer-links" aria-label="Footer links">
        <a href={LINKS.license} target="_blank" rel="noreferrer">
          MIT License
        </a>
        <a href={LINKS.repo} target="_blank" rel="noreferrer">
          Repository
        </a>
        <a href={LINKS.issues} target="_blank" rel="noreferrer">
          Open an issue
        </a>
      </nav>
    </footer>
  );
}
