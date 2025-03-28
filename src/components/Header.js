/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Search from "./Search";
import { Suspense, useState } from "react";
import { useCart } from "@/lib/CartContext";

export default function Header() {
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const pathname = usePathname();
  const toggleMobileMenu = () => setIsOpenMobileMenu(!isOpenMobileMenu);

  const { cartItems } = useCart();

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/tienda/productos", label: "Tienda" },
    { href: "/tienda/categorias", label: "Categorías" },
    { href: "/tienda/ofertas", label: "Ofertas" },
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
        <Image
          src="/img/diva-store-logo.jpeg"
          alt="Logo diva store"
          className="w-48"
          width={160}
          height={160}
          priority={true}
        />
      </div>
      {/* barra de navegación movil */}
      <div className="md:hidden bg-pink-100 p-1 flex flex-row gap-2 justify-evenly items-center text-xl font-semibold text-gray-500">
        <Suspense fallback={<span>cargando..</span>}>
          <Search />{" "}
        </Suspense>

        <Link href="/carrito" className="relative">
          <img
            src="/img/icons/shopping-bag.svg"
            alt="Carrito de compras"
            className="w-5 md:w-8 hover:scale-105 hover:opacity-80"
          />
          {cartItems.length > 0 && (
            <span className="text-xs bg-white px-2 py-1 rounded-full text-primary font-semibold absolute -top-3 -right-5">
              {cartItems.length}
            </span>
          )}
        </Link>
        <Link href="/cuenta">
          <img
            src="/img/icons/user.svg"
            alt="Iniciar sesión"
            className="w-6 hover:scale-105 hover:opacity-80"
          />
        </Link>
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
        <div className="flex flex-row ml-20 gap-5 items-center text-xl font-semibold text-gray-500">
          <Suspense fallback={<span>cargando..</span>}>
            <Search />{" "}
          </Suspense>
          <Link href="/carrito" className="relative">
            <img
              src="/img/icons/shopping-bag.svg"
              alt="Carrito de compras"
              className="w-6 hover:scale-105 hover:opacity-80"
            />
            {cartItems.length > 0 && (
              <span className="text-xs bg-white px-2 py-1 rounded-full text-primary font-semibold absolute -top-3 -right-5">
                {cartItems.length}
              </span>
            )}
          </Link>
          <Link href="/cuenta">
            <img
              src="/img/icons/user.svg"
              alt="Iniciar sesión"
              className="w-6 hover:scale-105 hover:opacity-80"
            />
          </Link>
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
