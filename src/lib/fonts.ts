import { Plus_Jakarta_Sans } from "next/font/google";

// Self-hosted at build time: no request ever reaches Google Fonts from the visitor's browser.
export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

// Italic is only used for emphasis in long-form content, so it's fetched on demand instead of preloaded.
export const jakartaItalic = Plus_Jakarta_Sans({
  subsets: ["latin"],
  style: "italic",
  variable: "--font-jakarta-italic",
  display: "swap",
  preload: false,
});
