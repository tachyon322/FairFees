import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Nav } from "@/components/Nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Fair Fees · The 3% is yours.",
  description:
    "3% creator tax → holders. Every 60s. $FEES on pons v2, Robinhood Chain.",
  openGraph: {
    title: "Fair Fees · $FEES",
    description: "The tax is the product. Hold $FEES, take your cut of every trade.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${serif.variable} antialiased`}
    >
      <body className="grain min-h-full">
        <Nav />
        {children}
      </body>
    </html>
  );
}
