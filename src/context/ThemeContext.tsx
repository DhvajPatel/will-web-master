import { createContext, useContext, useState, ReactNode } from "react";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { blueTheme, vanilaTheme } from "../styles/theme"; // Import your themes (blue and vanilla)

// Define the type for ThemeContext
type ThemeContextType = {
  currentTheme: string; // e.g., "blue" or "vanilla"
  toggleTheme: () => void; // Function to toggle the theme
};

// Create the Context (default values are placeholders)
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ThemeProvider Component
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<string>("vanilla"); // Default theme name

  // Function to toggle the active theme
  const toggleTheme = () => {
    setCurrentTheme((prevTheme) => (prevTheme === "blue" ? "vanilla" : "blue"));
  };

  // Dynamically apply the correct theme based on currentTheme
  const appliedTheme = currentTheme === "blue" ? blueTheme : vanilaTheme;

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      <MuiThemeProvider theme={appliedTheme}>
        <CssBaseline /> {/* Reset CSS */}
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

// Custom hook to use the context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
