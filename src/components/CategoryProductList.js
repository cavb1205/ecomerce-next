import ProductListItem from "./ProductListItem";
import { getProductosCategoria } from "@/lib/productos";
import { getCategoria } from "@/lib/categorias";

export default async function CategoryProductList({ slug, page }) {
    
    const categoria = await getCategoria(slug);
    
    const { id, name, count } = categoria[0];
    const productos = await getProductosCategoria(id, page);
    if (!productos || productos.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-96">
                <h2 className="text-2xl text-center font-semibold text-gray-500">
                    No se encontraron productos
                </h2>
            </div>
        );
    }
  return(

  <>
    <h1 className="text-pink-400 text-4xl text-center font-semibold ">
      {name}
    </h1>
    <span className="text-gray-500 text-sm text-center block font-semibold">
      {count} productos
    </span>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 p-2 my-2">
      {productos.map((producto) => (
        <ProductListItem key={producto.id} producto={producto} />
      ))}
    </div>
  </>
  )
}
