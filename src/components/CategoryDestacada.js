import Image from "next/image";
import { getCategorias, getCategoriasConStock } from "../lib/categorias";
import Link from "next/link";
export default async function CategoryDestacada() {
  const per_page = 100;
  // let categorias = await getCategoriasConStock(per_page);
  let categorias = await getCategorias(per_page);
  // Mezcla el array de categorías al azar
  categorias = categorias.sort(() => Math.random() - 0.5);

  // Selecciona las primeras 3 categorías
  categorias = categorias.slice(0, 3);

  if (!categorias || categorias.length === 0) {
    return (
      <div className="flex items-center justify-center">
        <h2 className="text-2xl text-primary font-semibold">
          No se encontraron categorías
        </h2>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl text-secondary font-bold my-4 text-center">
        Categorías Destacadas
      </h1>
      <div className="flex flex-col md:flex-row gap-4 p-2">
        {categorias
        .filter((categoria) => categoria.count > 0)
        .map((categoria) => (
          <div
            key={categoria.id}
            className="hover:shadow-lg transition duration-300 ease-in-out"
          >
            <Link href={`/tienda/categorias/${categoria.slug}`}>
              {categoria.image && (
                <Image
                  src={categoria.image.src}
                  alt={categoria.image.alt}
                  className="w-60 h-60 object-cover"
                  width={128}
                  height={128}
                />
              )}
              <h2 className="text-secondary text-xl font-semibold text-center hover:text-primary">
                {categoria.name}
              </h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
