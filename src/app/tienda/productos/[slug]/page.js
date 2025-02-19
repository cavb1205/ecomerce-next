import Image from "next/image";

import { getProducto } from "@/lib/productos";
import ErrorMessage from "@/components/ErrorMessage";
import Link from "next/link";

export default async function ProductDetail({ params }) {
  try {
    const { slug } = await params;
    const producto = await getProducto(slug);
    return (
      <>
        <section className="container p-2 mx-auto my-8">
          <div className="flex flex-col md:flex-row gap-10 justify-center">
            <div>
              <Image
                src={producto.images[0].src}
                alt={producto.name}
                className="w-96 h-auto object-cover hover:scale-105 hover:opacity-90 mx-auto"
                width={400}
                height={400}
              />
            </div>
            <div className="mx-auto md:mx-0">
              <h1 className="text-pink-400 text-3xl font-bold">
                {producto.name}
              </h1>
              <p className="text-xl font-semibold text-gray-600 my-2">
                ${parseFloat(producto.price).toLocaleString("es-Es")}{" "}
              </p>
              {producto.attributes.length > 0 && (
                <div className="my-4">
                  {producto.attributes.map((attribute) => (
                    <div key={attribute.id} className="my-2">
                      <h4 className="text-gray-500 font-semibold text-xl mb-2">
                        {attribute.name}:
                      </h4>
                    </div>
                  ))}
                </div>
              )}
              {producto.variaciones?.length > 0 && (
                <div className="my-4">
                  <div className="flex flex-row items-center gap-4">
                    {producto.variaciones
                      .filter(
                        (variation) => variation.stock_status === "instock"
                      )
                      .map((variation) => (
                        <button
                          key={variation.id}
                          className="p-2 rounded-lg bg-pink-100 text-pink-500 hover:bg-pink-200 hover:text-pink-600 hover:font-semibold"
                        >
                          {variation.attributes[0]?.option}
                        </button>
                      ))}
                  </div>
                </div>
              )}
              {producto.sale_price && (
                <p>${parseFloat(producto.price).toLocaleString("es-Es")} </p>
              )}
              <button className="py-3 px-10 rounded-full text-white font-semibold bg-pink-400 hover:scale-105 hover:bg-pink-500">
                Agregar al carrito
              </button>
              <div className="my-6">
                <h4 className="text-gray-500 font-semibold text-xl mb-2">
                  Categorías:
                </h4>
                <div className="flex flex-row items-center gap-4">
                  {producto.categories.map((category) => (
                    <Link href={`/tienda/categorias/${category.slug}`} key={category.id}>
                    <span
                      className="p-1 rounded-lg bg-pink-100 text-pink-500 hover:bg-pink-200 hover:text-pink-400"
                    >
                      {category.name}
                    </span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex flex-col my-10">
                <h4 className="text-pink-400 text-xl font-semibold">
                  Descripción:
                </h4>
                <p className="text-gray-600">{producto.description}</p>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  } catch (error) {
    console.log(error);
    return (
      <ErrorMessage message={error.message} />
    );
  }
}
