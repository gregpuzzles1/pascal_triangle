import type { Theme } from "./types";

const THEME_KEY = "pt-theme";

export function getInitialTheme(): Theme {
  const stored = window.localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }
  return "light";
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
}

export function persistTheme(theme: Theme): void {
  window.localStorage.setItem(THEME_KEY, theme);
}
