'use client';
import React, { ReactNode, createContext, useContext, useState } from "react";

export const ThemeContext = createContext({}); // Provide an empty object as default value

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
    children: ReactNode; // Define children prop as ReactNode type
  }

export const ThemeProvider = ({ children}: ThemeProviderProps) => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children} {/* Explicitly define the type of the children prop */}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => useContext(ThemeContext);
