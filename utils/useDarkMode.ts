"use client";
import { useState, useEffect } from "react";

export default function useDarkmode() {
  const [theme, setTheme] = useState(
    (typeof window !== "undefined" && localStorage.getItem("theme")) || "light"
  );
  const currentTheme = theme === "dark" ? "light" : "dark";
  const toggleTheme = () => {
    setTheme(currentTheme);
  };
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(currentTheme);
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme, currentTheme]);

  return [theme, toggleTheme];
}
