import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import ThemeToggle from "@/pages/Main/ui/ThemeToggle";

const THEME_STORAGE_KEY = "book-viewer-theme";

function mockPreferredColorScheme(prefersDark: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn((query: string) => ({
      matches: prefersDark,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );
}

beforeEach(() => {
  localStorage.clear();
  document.documentElement.className = "";
  mockPreferredColorScheme(false);
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("ThemeToggle", () => {
  it("uses the theme stored in localStorage", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");

    render(<ThemeToggle />);

    expect(document.documentElement).toHaveClass("dark");
    expect(screen.getByRole("button", { name: "Включить светлую тему" })).toBeInTheDocument();
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
  });

  it("falls back to the preferred color scheme when there is no stored theme", () => {
    mockPreferredColorScheme(true);

    render(<ThemeToggle />);

    expect(window.matchMedia).toHaveBeenCalledWith("(prefers-color-scheme: dark)");
    expect(document.documentElement).toHaveClass("dark");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
  });

  it("toggles from light to dark theme", () => {
    render(<ThemeToggle />);

    fireEvent.click(screen.getByRole("button", { name: "Включить темную тему" }));

    expect(document.documentElement).toHaveClass("dark");
    expect(screen.getByRole("button", { name: "Включить светлую тему" })).toBeInTheDocument();
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
  });

  it("toggles from dark to light theme", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");
    render(<ThemeToggle />);

    fireEvent.click(screen.getByRole("button", { name: "Включить светлую тему" }));

    expect(document.documentElement).not.toHaveClass("dark");
    expect(screen.getByRole("button", { name: "Включить темную тему" })).toBeInTheDocument();
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("light");
  });
});
