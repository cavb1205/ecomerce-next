"use client";
import { getCategorias } from "@/lib/categorias";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MenuCategory({ categorias }) {
  const path = usePathname();
  if (!categorias || categorias.length === 0) {
    return (
      <div className="animate-pulse space-y-4">
        {/* Skeleton de categorías */}
        <div className="h-8 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-8 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-8 bg-gray-300 rounded w-3/4 mb-2"></div>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-xl text-pink-500 font-bold">Categorías</h2>
      <div className="text-base text-gray-500 font-semibold flex flex-col gap-1">
        {categorias
          .filter((categoria) => categoria.count > 0)
          .map((categoria) => (
            <Link
              href={`/tienda/categorias/${categoria.slug}`}
              key={categoria.id}
              className= {path === `/tienda/categorias/${categoria.slug}` ? "text-pink-400" : "hover:text-pink-400"}
            >
              {categoria.name}
            </Link>
          ))}
      </div>
    </>
  );
}
