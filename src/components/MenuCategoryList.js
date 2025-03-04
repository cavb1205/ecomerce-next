"use client";
import { getCategorias } from "@/lib/categorias";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MenuCategoryList({ categorias }) {
  const path = usePathname();
  console.log(categorias);

  return (
    <>
      <h2 className="text-xl text-pink-500 font-bold">Categorías</h2>
      {
        categorias.error ? <div className="text-secondary font-semibold">{categorias.error}</div>
        : 

        
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
      }
    </>
  );
}
