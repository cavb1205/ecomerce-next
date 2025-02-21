import ProductListItem from "@/components/ProductListItem";
import ErrorMessage from "@/components/ErrorMessage";
import { getProducto, getProductos } from "@/lib/productos";


export default async function Productos({searchParams}) {
  try {
    const search = searchParams?.search || "";
    const productos = await getProductos(search);
    
    
    return (
      <>
        <h1 className="text-2xl md:text-4xl text-center font-bold text-pink-400 mb-10">
          Productos Disponibles
        </h1>
        {productos.length === 0 && (
          <h2 className="text-xl text-center font-semibold text-gray-500">
            No se encontraron productos
          </h2>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 p-2">
          {productos.map((producto) => (
            <ProductListItem key={producto.id} producto={producto} />
          ))}
        </div>
      </>
    );
  } catch (error) {
    return <ErrorMessage message={error.message} />;
  }
}
