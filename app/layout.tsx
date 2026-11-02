import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Self-hosted so builds never depend on reaching Google Fonts
const josefin = localFont({
  variable: "--font-josefin",
  src: [
    { path: "./fonts/josefin-sans-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/josefin-sans-latin-600-normal.woff2", weight: "600" },
  ],
});
const limelight = localFont({
  variable: "--font-limelight",
  src: "./fonts/limelight-latin-400-normal.woff2",
});

export const metadata: Metadata = {
  title: "Links",
  description: "Reservations, events, menu and directions.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050405",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${josefin.variable} ${limelight.variable}`}>
      <body>{children}</body>
    </html>
  );
}
