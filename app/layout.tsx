import type { Metadata } from "next";
import { Work_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import CartDrawer from "@/components/ui/CartDrawer";
import InstallBanner from "@/components/pwa/InstallBanner";
import UpdateToast from "@/components/pwa/UpdateToast";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import OfferPopup from "@/components/ui/OfferPopup";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://d2pfoods.pk"),
  title: {
    default: "D2P Foods — Order Food Online",
    template: "%s | D2P Foods",
  },
  description:
    "Order food online from D2P Foods. Fast delivery across Pakistan. 100% Halal.",
  keywords: ["D2P Foods", "order online", "burgers", "wings", "halal", "Pakistan", "food delivery"],
  authors: [{ name: "D2P Foods" }],
  creator: "D2P Foods",
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://d2pfoods.pk",
    siteName: "D2P Foods",
    title: "D2P Foods — Order Food Online",
    description:
      "Order food online from D2P Foods. Delivery across Pakistan.",
    images: [
      {
        url: "/images/hero_burger.png",
        width: 1200,
        height: 630,
        alt: "D2P Foods",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "D2P Foods — Order Food Online",
    description: "Order food online from D2P Foods. Delivery across Pakistan.",
    images: ["/images/hero_burger.png"],
    creator: "@d2pfoods",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "D2P Foods",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
};

export const viewport = {
  themeColor: "#E23744",
};

const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "D2P Foods",
  description: "Fast food chain — burgers, wings, combos, and sides.",
  url: "https://d2pfoods.pk",
  telephone: "+923704604266",
  email: "hello@d2pfoods.pk",
  servesCuisine: ["Pakistani", "Fast Food", "Burgers", "Grilled Chicken"],
  hasMenu: "https://d2pfoods.pk/menu",
  priceRange: "Rs. 200 – Rs. 3,500",
  currenciesAccepted: "PKR",
  paymentAccepted: "Cash, JazzCash, Easypaisa, Credit Card",
  openingHours: ["Mo-Fr 11:00-00:00", "Sa-Su 11:00-01:00"],
  address: {
    "@type": "PostalAddress",
    addressCountry: "PK",
    addressLocality: "Lahore",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${workSans.variable} ${ibmPlexMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
      </head>
      <body
        className="bg-white text-char font-body selection:bg-ember selection:text-white"
      >
        <Header />
        <InstallBanner />
        {children}
        <CartDrawer />
        <UpdateToast />
        <WhatsAppButton />
        <BottomNav />
        <OfferPopup />
        <Footer />
      </body>
    </html>
  );
}
