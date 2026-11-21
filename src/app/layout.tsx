import type { Metadata, Viewport } from "next";
import { Cinzel, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Attica Gold Company | Transparent Gold Valuation & Instant Payment",
  description:
    "Discover a transparent and professional gold-selling experience with Attica Gold Company. Explore gold purity testing, valuation, and nearby branches.",
  keywords: [
    "Attica Gold",
    "Sell Gold Instant Cash",
    "Gold Valuation Bangalore",
    "Release Pledged Gold",
    "German Karatmeter Testing",
    "Gold Buyers South India",
    "Highest Gold Rate Today",
  ],
  authors: [{ name: "Attica Gold Company" }],
  metadataBase: new URL("https://atticagoldcompany.com"),
  openGraph: {
    title: "Attica Gold Company | Transparent Gold Valuation & Instant Payment",
    description:
      "India's Most Trusted Organized Gold Buyers. Transparent German XRF testing, instant bank settlement, and release of pledged gold across 200+ branches.",
    url: "https://atticagoldcompany.com",
    siteName: "Attica Gold Company",
    images: [
      {
        url: "/media/images/attica-gold-bullion-velvet.jpg",
        width: 1200,
        height: 630,
        alt: "Attica Gold Company Luxury Valuation",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Attica Gold Company | Transparent Gold Valuation & Instant Payment",
    description:
      "Instant settlement, non-destructive German XRF testing, and highest market rates across 200+ branches.",
    images: ["/media/images/attica-gold-bullion-velvet.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#2A0202",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${plusJakarta.variable}`}>
      <body className="font-sans antialiased text-luxury-ivory selection:bg-gold-metallic selection:text-maroon-darkest">
        {children}
      </body>
    </html>
  );
}

