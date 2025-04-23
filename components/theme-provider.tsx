"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import { useEffect } from "react";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Apply the saved theme on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem("taptalk-theme") as
      | "dark"
      | "light"
      | null;
    if (savedTheme) {
      document.documentElement.classList.add(savedTheme);
      document.documentElement.classList.remove(
        savedTheme === "dark" ? "light" : "dark"
      );
    } else {
      // Default to dark theme if no preference is saved
      document.documentElement.classList.add("dark");
    }
  }, []);

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
