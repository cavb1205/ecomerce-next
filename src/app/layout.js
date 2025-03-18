import { Geist, Geist_Mono, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WhatsApp from "@/components/WhatsApp";
import { CartProvider } from "@/lib/CartContext";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Diva Store",
  description:
    "Diva Store Boutique - Tu destino de moda en Calama, Chile. Descubre nuestra exclusiva colección de ropa, diseñada para resaltar la belleza y elegancia de la mujer moderna. ¡Encuentra tu estilo con nosotros!",
  image: "/public/img/diva-store-logo.jpeg",
  url: "https://www.divastore.cl",
};

export default function RootLayout({ children }) {
  return (
    <CartProvider>
      <html lang="es">
        <Analytics />
        <head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
          <meta property="og:title" content={metadata.title} />
          <meta property="og:description" content={metadata.description} />
          <meta property="og:image" content={metadata.image} />
          <meta property="og:url" content={metadata.url} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={metadata.title} />
          <meta name="twitter:description" content={metadata.description} />
          <meta name="twitter:image" content={metadata.image} />
        </head>

        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Header />
          {children}
          <Footer />
          <WhatsApp />
          <Toaster />
        </body>
      </html>
    </CartProvider>
  );
}
