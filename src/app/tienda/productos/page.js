import ProductListItem from "@/components/ProductListItem";
import ErrorMessage from "@/components/ErrorMessage";
import { getProducto, getProductos } from "@/lib/productos";

export default async function Productos() {
  try {
    const productos = await getProductos();
    console.log(productos);
    return (
      <>
        <h1 className="text-2xl md:text-4xl text-center font-bold text-pink-400 mb-10">
          Productos Disponibles
        </h1>

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
