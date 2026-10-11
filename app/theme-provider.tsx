"use client";
import { createContext, useContext, useEffect, useSyncExternalStore, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_EVENT = "tokilo-theme-change";
let fallbackTheme: Theme = "light";

function getTheme(): Theme {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch { /* Storage may be unavailable in private or restricted browsers. */ }
  return fallbackTheme;
}

function subscribe(callback: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === "theme" || event.key === null) callback();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(THEME_EVENT, callback);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(THEME_EVENT, callback);
  };
}

const serverTheme = (): Theme => "light";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Hydration uses the same theme as the server before restoring the preference.
  const theme = useSyncExternalStore(subscribe, getTheme, serverTheme);

  useEffect(() => {
    // Apply the theme class to <html>
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  const toggleTheme = () => {
    fallbackTheme = getTheme() === "light" ? "dark" : "light";
    try { localStorage.setItem("theme", fallbackTheme); } catch { /* Use the in-memory preference. */ }
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
