"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  
  const links = [
    { href: "/", label: "Inicio" },
    { href: "/tienda/productos", label: "Tienda" },
    { href: "/tienda/categorias", label: "Categorías" },
    { href: "/contacto", label: "Contacto" },
  ];
  return (
    <header className="mb-10 max-w-[100vw]">
      <div className="flex items-center justify-center">
        <Link href="/">
          <Image
            src="/img/diva-store-logo.webp"
            alt="Logo diva store"
            className="w-48"
            width={160}
            height={160}
            priority={true}
          />
        </Link>
      </div>
      <nav className="flex items-center justify-center bg-pink-100 p-2">
        <ul className="flex items-center gap-5 text-xl font-semibold">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`${
                  pathname === href ? `text-pink-400 font-bold` : `text-gray-500`
                } hover:text-pink-400 hover:scale-105 hover:font-bold inline-block`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
