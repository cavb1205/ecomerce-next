"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Search from "./Search";
import { useState } from "react";

export default function Header() {
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const pathname = usePathname();
  const toggleMobileMenu = () => setIsOpenMobileMenu(!isOpenMobileMenu);

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/tienda/productos", label: "Tienda" },
    { href: "/tienda/categorias", label: "Categorías" },
    { href: "/contacto", label: "Contacto" },
  ];
  return (
    <header className="mb-10 max-w-[100vw]">
      <button
        onClick={toggleMobileMenu}
        className="block md:hidden text-gray-500 hover:text-pink-400 focus:outline-none mr-2 my-2 mx-auto"
      >
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>
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
      <div className="md:hidden text-xl font-semibold text-gray-500 bg-pink-200 text-center p-2">
        <Search />
      </div>
      <nav className="hidden md:flex md:items-center md:justify-center bg-pink-100 p-2">
        <ul className="flex items-center gap-5 text-xl font-semibold">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`${
                  pathname === href
                    ? `text-pink-400 font-bold`
                    : `text-gray-500`
                } hover:text-pink-400 hover:scale-105 hover:font-bold inline-block`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="text-xl font-semibold text-gray-500 ml-20">
          <Search />
        </div>
      </nav>
      {isOpenMobileMenu && (
        <div className="md:hidden bg-pink-100 p-4">
          <ul className="flex flex-col gap-3 text-xl font-semibold">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`${
                    pathname === href
                      ? "text-pink-400 font-bold"
                      : "text-gray-500"
                  } hover:text-pink-400 hover:scale-105 hover:font-bold inline-block`}
                  onClick={toggleMobileMenu} // Cerrar el menú al hacer clic en un enlace
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
