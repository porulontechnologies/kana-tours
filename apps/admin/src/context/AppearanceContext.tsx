"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface AppearanceContextType {
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean) => void;
}

const AppearanceContext = createContext<AppearanceContextType>({
  darkMode: false,
  setDarkMode: () => {},
  sidebarCollapsed: false,
  setSidebarCollapsed: () => {},
});

export function AppearanceProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkModeState] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsedState] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const storedDark = localStorage.getItem("kana-dark-mode") === "true";
    const storedCompact = localStorage.getItem("kana-compact-sidebar") === "true";
    if (storedDark) {
      setDarkModeState(true);
      document.documentElement.classList.add("dark");
    }
    if (storedCompact) setSidebarCollapsedState(true);
  }, []);

  const setDarkMode = (v: boolean) => {
    setDarkModeState(v);
    localStorage.setItem("kana-dark-mode", String(v));
    if (v) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  const setSidebarCollapsed = (v: boolean) => {
    setSidebarCollapsedState(v);
    localStorage.setItem("kana-compact-sidebar", String(v));
  };

  return (
    <AppearanceContext.Provider value={{ darkMode, setDarkMode, sidebarCollapsed, setSidebarCollapsed }}>
      {children}
    </AppearanceContext.Provider>
  );
}

export const useAppearance = () => useContext(AppearanceContext);
