import { getProducto } from "@/lib/productos";
import Image from "next/image";

export default async function ProductDetail() {

    const producto = await getProducto()
  return (
    <section>
      <div className="flex flex-row gap-8 justify-center">
        <div>
          <Image
            src={producto.images[0].src}
            alt={producto.name}
            className="w-96 h-auto object-cover hover:scale-105 hover:opacity-90"
            width={400}
            height={400}
          />
        </div>
        <div>
          <h1 className="text-pink-400 text-3xl font-bold">{producto.name}</h1>
          <p className="text-xl font-semibold text-gray-600 my-2">
            ${parseFloat(producto.price).toLocaleString("es-Es")}{" "}
          </p>
          {producto.attributes.length > 0 && (
            <div className="my-4">
              {producto.attributes.map((attribute) => (
                <div className="my-2">
                  <h4 className="text-gray-500 font-semibold text-xl mb-2">
                    {attribute.name}:
                  </h4>
                </div>
              ))}
            </div>
          )}
          {producto.variaciones?.length > 0 && (
            <div className="mt-4">
              <select
                id="variations"
                name="variations"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option>Selecciona</option>
                {producto.variaciones
                  .filter((variation) => variation.stock_status === "instock")
                  .map((variation) => (
                    <option value={variation.id}>
                      console.log(variation.attributes)
                      {variation.attributes[0]?.option} - ${variation.price}
                    </option>
                  ))}
              </select>
            </div>
          )}
          {producto.sale_price && (
            <p>${parseFloat(producto.price).toLocaleString("es-Es")} </p>
          )}
          <button className="py-3 px-10 rounded-full text-white font-semibold bg-pink-400">
            Agregar al carrito
          </button>
          <div className="my-6">
            <h4 className="text-gray-500 font-semibold text-xl mb-2">
              Categorías:
            </h4>
            <div className="flex flex-row items-center gap-4">
              {producto.categories.map((category) => (
                <span className="p-1 rounded-lg bg-pink-100 text-pink-500">
                  {category.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p set:html={producto.description} />
    </section>
  );
}
