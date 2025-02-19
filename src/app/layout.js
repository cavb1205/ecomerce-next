import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

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
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
