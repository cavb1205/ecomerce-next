import ProductListItem from "./ProductListItem";
import { getProductos } from "@/lib/productos";

export default async function ProductList({ search, page }) {
  const productos = await getProductos(search, page);
  return (
    <>
      {productos.length === 0 && (
        <div className="flex flex-col items-center justify-center h-96">
          <h2 className="text-2xl text-center font-semibold text-gray-500">
            No se encontraron productos
          </h2>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 p-2">
        {productos.map((producto) => (
          <ProductListItem key={producto.id} producto={producto} />
        ))}
      </div>
    </>
  );
}
