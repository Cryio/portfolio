"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type TransitionState = {
  isTransitioning: boolean;
  newTheme: Theme | null;
  x: number;
  y: number;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  startTransition: (newTheme: Theme, x: number, y: number) => void;
  transitionState: TransitionState;
};

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
  startTransition: () => null,
  transitionState: { isTransitioning: false, newTheme: null, x: 0, y: 0 },
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "portfolio-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [transitionState, setTransitionState] = useState<TransitionState>({
    isTransitioning: false,
    newTheme: null,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey) as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Check system preference
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      setTheme(systemTheme);
    }
  }, [storageKey]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  const startTransition = (newTheme: Theme, x: number, y: number) => {
    setTransitionState({
      isTransitioning: true,
      newTheme,
      x,
      y,
    });

    // After animation completes, apply the theme change
    setTimeout(() => {
      setTheme(newTheme);
      setTimeout(() => {
        setTransitionState({
          isTransitioning: false,
          newTheme: null,
          x: 0,
          y: 0,
        });
      }, 50);
    }, 800); // Match animation duration
  };

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      setTheme(theme);
    },
    startTransition,
    transitionState,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
}; 