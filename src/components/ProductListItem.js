import Link from "next/link";
import Image from "next/image";
export default function ProductListItem({ producto }) {
  
    return (
        <div className="max-h-auto">
                <Link href={`/tienda/productos/${producto.slug}`} >
                {producto.images.length > 0 && (
                  <Image
                    src={producto.images[0].src}
                    alt={producto.name}
                    className="w-80 h-80 object-cover hover:scale-95 hover:opacity-95 mx-auto"
                    width={320}
                    height={320}
                  />
                )
                  }
                  <h2 className=" font-semibold text-pink-400 text-xl text-center mt-2 hover:opacity-90 hover:scale-105">
                    {producto.name}
                  </h2>
                </Link>
                <div className="flex flex-col items-center justify-center gap-2 my-2">
                  <p className="text-gray-500 text-center font-semibold">
                    ${parseFloat(producto.price).toLocaleString("es-Es")}{" "}
                  </p>
                  {producto.type === "simple"? (
                    <button className="bg-pink-400 text-white font-semibold py-2 px-5 rounded-md hover:opacity-70 hover:scale-105">
                      <span>Comprar</span>
                    </button>
                  ) : (
                    <button className="bg-pink-400 text-white font-semibold py-2 px-5 rounded-md hover:opacity-70 hover:scale-105">
                      <span>Ver Opciones</span>
                    </button>
                  )}
                  
                </div>
              </div>
    )
}