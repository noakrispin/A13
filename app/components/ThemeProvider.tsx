'use client';

// Import necessary modules and types
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ReactNode } from 'react';

// Define the props interface for ThemeProvider
interface ThemeProviderProps {
  children: ReactNode; // Children components
}
// Define the ThemeProvider component
const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Render the NextThemesProvider with the provided children and set the attribute to "class"
  return <NextThemesProvider attribute="class">{children}</NextThemesProvider>;
};
// Export the ThemeProvider component
export default ThemeProvider;