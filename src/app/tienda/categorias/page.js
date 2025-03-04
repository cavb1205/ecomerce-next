import Link from "next/link";
import { getCategoriasConStock } from "@/lib/categorias";
import ErrorMessage from "@/components/ErrorMessage";

export default async function Page() {
  try {
    const categorias = await getCategoriasConStock();

    return (
      <section className="container mx-auto p-2">
        <h1 className="text-2xl md:text-4xl text-center font-bold text-pink-400 mb-10">
          Categorías Disponibles
        </h1>
        {categorias.error ? (
          <ErrorMessage message={categorias.error} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-2">
            {categorias
              .filter((categoria) => categoria.count > 0)
              .map((categoria) => (
                <div
                  key={categoria.id}
                  className="p-4 bg-pink-100 rounded-lg shadow-md hover:shadow-lg"
                >
                  <Link
                    href={`/tienda/categorias/${categoria.slug}`}
                    className="text-pink-400 font-semibold text-xl hover:text-pink-500"
                  >
                    <h5>{categoria.name}</h5>
                    <span className="text-gray-500 text-sm">
                      {categoria.count} productos
                    </span>
                  </Link>
                </div>
              ))}
          </div>
        )}
      </section>
    );
  } catch (error) {
    return <ErrorMessage message={error.message} />;
  }
}
