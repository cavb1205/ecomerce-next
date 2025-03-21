"use client";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/CartContext";
export default function ProductListItem({ producto }) {
  const handleAddToCart = () => {
    const productWhitQuantity = {
      ...producto,
      quantity : 1,
    };
    if (producto.type === "variable") {
      if (!selectedVariation) {
        toast.info("Debes seleccionar una variación");
        return;
      }
      productWhitQuantity.variaciones = [selectedVariation];
      addToCart(productWhitQuantity);
      return;
    }
    addToCart(productWhitQuantity);
  };
  const { addToCart } = useCart();
  return (
    <div className="max-h-auto">
      <Link href={`/tienda/productos/${producto.slug}`}>
        {producto.images.length > 0 && (
          <Image
            src={producto.images[0].src}
            alt={producto.name}
            className="w-80 h-80 object-cover hover:scale-95 hover:opacity-95 mx-auto"
            width={320}
            height={320}
          />
        )}
        <h2 className=" font-semibold text-pink-400 text-xl text-center mt-2 hover:opacity-90 hover:scale-105">
          {producto.name}
        </h2>
      </Link>
      <div className="flex flex-col items-center justify-center gap-2 my-2">
        <p className="text-gray-500 text-center font-semibold">
          ${parseFloat(producto.price).toLocaleString("es-Es")}{" "}
        </p>
        {producto.type === "simple" ? (
          <button
            onClick={handleAddToCart}
            className="bg-pink-400 text-white font-semibold py-2 px-5 rounded-md hover:opacity-70 hover:scale-105 cursor-pointer"
          >
            <span>Agrgar al carrito</span>
          </button>
        ) : (
          <Link href={`/tienda/productos/${producto.slug}`}>
            <button className="bg-pink-400 text-white font-semibold py-2 px-5 rounded-md hover:opacity-70 hover:scale-105 cursor-pointer">
              <span>Ver Opciones</span>
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
