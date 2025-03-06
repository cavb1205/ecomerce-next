"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
export default function MenuCategoryList({ categorias }) {
  const path = usePathname();
  const router = useRouter();
  const handleChange = (e) => {
    const selectedCategoryId = e.target.value;

    if (selectedCategoryId) {
      // Redirigimos a la página de la categoría seleccionada
      router.push(`/tienda/categorias/${selectedCategoryId}`);
    }
  };

  return (
    <>
      {/* Categorías en dispositivos moviles */}
      <div className="md:hidden flex flex-col gap-2 items-center justify-center h-auto mb-4 px-10">
        <h3 className="text-xl text-primary font-bold m2-4">Categorias</h3>
        {categorias.error ? (
          <div className="text-secondary font-semibold">{categorias.error}</div>
        ) : (
        <select onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">Selecciona</option>
          {categorias
            .filter((categoria) => categoria.count > 0) // Solo categorías con productos
            .map((categoria) => (
              <option key={categoria.id} value={categoria.slug}>
                {categoria.name}
              </option>
            ))}
        </select>
        )}
      </div>

      {/* Categorías en pantallas grandes */}
      <div className=" hidden md:block">
        <h2 className="text-xl text-pink-500 font-bold">Categorías</h2>
        {categorias.error ? (
          <div className="text-secondary font-semibold">{categorias.error}</div>
        ) : (
          <div className="text-base text-gray-500 font-semibold flex flex-col gap-1">
            {categorias
              .filter((categoria) => categoria.count > 0)
              .map((categoria) => (
                <Link
                  href={`/tienda/categorias/${categoria.slug}`}
                  key={categoria.id}
                  className={
                    path === `/tienda/categorias/${categoria.slug}`
                      ? "text-pink-400"
                      : "hover:text-pink-400"
                  }
                >
                  {categoria.name}
                </Link>
              ))}
          </div>
        )}
      </div>
    </>
  );
}
