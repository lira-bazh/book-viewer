import { MoonStar, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "book-viewer-theme";

function getInitialTheme(): Theme {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const isDarkTheme = theme === "dark";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkTheme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [isDarkTheme, theme]);

  return (
    <button
      type="button"
      aria-label={isDarkTheme ? "Включить светлую тему" : "Включить темную тему"}
      className="inline-flex size-10 shrink-0 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      onClick={() => setTheme(isDarkTheme ? "light" : "dark")}
    >
      {isDarkTheme ? (
        <Sun className="size-5" aria-hidden="true" />
      ) : (
        <MoonStar className="size-5" aria-hidden="true" />
      )}
    </button>
  );
}

export default ThemeToggle;
