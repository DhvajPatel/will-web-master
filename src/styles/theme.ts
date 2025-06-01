import { createTheme } from "@mui/material/styles";
// this comment is just for gitlab's problem solving.
// this comment is just for gitlab's problem solving(2).
// Define the Colors Type
type Colors = {
  primaryMain: string;
  secondaryMain: string;
  backgroundDefault: string;
  backgroundPaper: string;
  textPrimary: string;
  textSecondary: string;
  errorMain: string;
  warningMain: string;
  infoMain: string;
  successMain: string;
};

// Function to dynamically generate a theme based on given colors
const generateTheme = (colors: Colors) => {
  return createTheme({
    palette: {
      mode: "light", // You can make this dynamic if needed
      primary: { main: colors.primaryMain },
      secondary: { main: colors.secondaryMain },
      background: {
        default: colors.backgroundDefault,
        paper: colors.backgroundPaper,
      },
      text: { primary: colors.textPrimary, secondary: colors.textSecondary },
      error: { main: colors.errorMain },
      warning: { main: colors.warningMain },
      info: { main: colors.infoMain },
      success: { main: colors.successMain },
    },
    typography: {
      fontFamily: "'DM Sans', 'Poppins', sans-serif",
      h1: {
        fontSize: "1.75rem",
        fontWeight: 700,
        lineHeight: 1.2,
        fontFamily: "'Poppins', sans-serif",
      }, // Page Heading
      h2: {
        fontSize: "1.5rem",
        fontWeight: 600,
        lineHeight: 1.3,
        fontFamily: "'Poppins', sans-serif",
      }, // Subheading
      h3: {
        fontSize: "1.25rem",
        fontWeight: 500,
        lineHeight: 1.4,
        fontFamily: "'Poppins', sans-serif",
      },
      h4: {
        fontSize: "1rem",
        fontWeight: 500,
        lineHeight: 1.5,
      },
      h5: {
        fontSize: "0.875rem",
        fontWeight: 400,
        lineHeight: 1.6,
      },
      h6: {
        fontSize: "0.75rem",
        fontWeight: 400,
        lineHeight: 1.7,
      },
      body1: {
        fontSize: "1rem",
        fontWeight: 400,
        lineHeight: 1.8,
        fontFamily: "'DM Sans', sans-serif",
      }, // Standard Text
      body2: {
        fontSize: "0.875rem",
        fontWeight: 400,
        lineHeight: 1.9,
        fontFamily: "'DM Sans', sans-serif",
      },
      button: {
        fontSize: "0.875rem",
        fontWeight: 500,
        textTransform: "uppercase",
        fontFamily: "'DM Sans', sans-serif",
      },
      caption: {
        fontSize: "0.75rem",
        fontWeight: 400,
        lineHeight: 1.5,
      },
      overline: {
        fontSize: "0.75rem",
        fontWeight: 400,
        textTransform: "uppercase",
      },
    },
  });
};

// Harmonized Blue Theme
const blueColors: Colors = {
  primaryMain: "#64B5F6", // softer blue
  secondaryMain: "#4FC3F7", // bright sky blue
  backgroundDefault: "#E3F2FD", // very light blue
  backgroundPaper: "#BBDEFB", // faded sky blue
  textPrimary: "#0D47A1", // strong but not too harsh
  textSecondary: "#1976D2",
  errorMain: "#E57373",
  warningMain: "#FFB74D",
  infoMain: "#4FC3F7",
  successMain: "#81C784",
};

// Fresh and Modern Vanilla Theme
const vanilaColors: Colors = {
  primaryMain: "#ff7f11", // bold but calm orange
  secondaryMain: "#4dabf5", // complementary blue
  backgroundDefault: "#ffffff", // crisp white
  backgroundPaper: "#f9f9f9", // soft contrast for content areas
  textPrimary: "#212121", // dark gray for text
  textSecondary: "#757575", // medium gray for secondary text
  errorMain: "#E57373",
  warningMain: "#FFB74D",
  infoMain: "#64B5F6",
  successMain: "#81C784",
};

// Generate themes
export const blueTheme = generateTheme(blueColors);
export const vanilaTheme = generateTheme(vanilaColors);

// Default theme (set vanilla as default)
const colors = vanilaColors; // Current default is vanilla
const theme = generateTheme(colors);

// Keep the old logic intact by exporting the default theme
export default theme;
