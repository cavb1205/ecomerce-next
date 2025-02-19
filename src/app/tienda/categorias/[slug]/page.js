import ErrorMessage from "@/components/ErrorMessage";
import { getProductosCategoria } from "@/lib/productos";
import { getCategoria } from "@/lib/categorias";
import ProductListItem from "@/components/ProductListItem";

export default async function ProductsCategory({params}) {
    try {
        const { slug } = await params;
        const categoria = await getCategoria(slug);
        const {id, name, count } = categoria[0];
        const productos = await getProductosCategoria(id);
        
        console.log(productos);
        return (
            <section className="container mx-auto p-2">
                <h1 className="text-pink-400 text-4xl text-center font-semibold ">Categoría {name}</h1>
                <span className="text-gray-500 text-sm text-center block font-semibold">{count} productos</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-2">
                    {productos.map((producto) => (
                        <ProductListItem key={producto.id} producto={producto} />
                    ))}
                </div>
            </section>
        );
    }
    catch (error) {
        return <ErrorMessage message={error.message} />;
    }
}
