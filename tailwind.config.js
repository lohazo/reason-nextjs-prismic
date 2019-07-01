module.exports = {
  theme: {
    extend: {
      colors: {
        //Accent Colors
        "dark-blue": "#363687",

        info: {
          blue: "#376fdd",
          "blue-lighten-85": "rgba(55, 111, 221, 0.15)",
          "blue-lighten-90": "rgba(55, 111, 221, 0.1)",
          "blue-lighten-95": "rgba(55, 111, 221, 0.05)"
        },

        // Background Colors
        sand: "#f4f1e6",
        "sand-lighten-20": "rgba(249, 246, 243, 0.8)",

        // Primary Color
        primary: {
          default: "#f9543e",
          "dark-10": "#df4b37",
          "dark-5": "#ec4f3a",
          "lighten-90": "rgb(249, 84, 62, 0.1)",
          "lighten-50": "rgb(249, 84, 62, 0.5)"
        },
        
        main: {
          // Text Colors
          black: "#23242e",
          "lighten-10": "rgba(35, 36, 46, 0.90)",
          "lighten-15": "rgba(35,36,46,.85)",
          "lighten-20": "rgba(35, 36, 46, 0.80)",
          "lighten-50": "rgba(35, 36, 46, 0.5)",
          "lighten-65": "rgba(35, 36, 46, 0.35)",
          "lighten-90": "rgba(35, 36, 46, 0.1)",
          "lighten-95": "rgba(35, 36, 46, 0.05)"
        }
      }
    },
    /* Most of the time we customize the font-sizes,
     so we added the Tailwind default values here for
     convenience */
    fontSize: {
      xs: ".75rem",
      sm: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem"
    },
    /* We override the default font-families with our own default prefs  */
    fontFamily: {
      montserrat: [
        "Montserrat",
        "-apple-system",
        "BlinkMacSystemFont",
        "Helvetica Neue",
        "Arial",
        "sans-serif"
      ],
      sans: [
        "Overpass",
        "-apple-system",
        "BlinkMacSystemFont",
        "Helvetica Neue",
        "Arial",
        "sans-serif"
      ],
      serif: [
        "Georgia",
        "-apple-system",
        "BlinkMacSystemFont",
        "Helvetica Neue",
        "Arial",
        "sans-serif"
      ],
      mono: [
        "Overpass Mono",
        "Roboto Mono",
        "SFMono-Regular",
        "Segoe UI",
        "Courier",
        "monospace"
      ]
    }
  },
  variants: {
    color: ["hover"],
    width: ["responsive"],
    border: ["hover"]
  },
  plugins: []
};
