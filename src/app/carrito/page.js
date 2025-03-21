"use client";
import { useCart } from "@/lib/CartContext";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Cart() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const router = useRouter();

  console.log("Carrito:", cartItems);

  return (
    <section className="container mx-auto h-fit  my-14 p-6">
      <h1 className="text-4xl text-primary text-center font-bold my-6">
        Carrito
      </h1>
      {cartItems.length > 0 && (
        <span className="text-secondary block text-center font-semibold text-lg">
          Productos en el carrito: {cartItems.length}
        </span>
      )}
      {cartItems.length === 0 ? (
        <p className="text-center text-secondary font-semibold text-xl mb-20 mt-5">
          No hay productos en el carrito
        </p>
      ) : (
        <div className="md:grid md:grid-cols-3  md:gap-4">
          <div className="col-span-2">
            {cartItems.map((item) => (
              <div
                
                key={item.type == "simple"?item.id:item.variaciones[0].id}
                className="grid grid-cols-3 justify-items-start items-center gap-2 my-4 bg-pink-100/40 rounded-lg p-4"
              >
                <Image
                  className="w-20 h-20 object-cover mx-auto"
                  src={item.images[0].src}
                  alt={item.name}
                  width={40}
                  height={40}
                />
                <div className="flex flex-col justify-start gap-2" onClick={() => router.push(`/tienda/productos/${item.slug}`)}>
                  <span className="">{item.name}</span>
                  {item.variaciones && (
                  <span className="text-secondary text-sm">
                    {item.variaciones[0]?.attributes[0].name}: {item.variaciones[0]?.attributes[0].option}
                  </span>
                  )}
                  <span className="text-secondary text-sm">
                    Cantidad: {item.quantity}
                  </span>
                  <span className="text-primary text-sm font-semibold">
                    ${parseFloat(item.price).toLocaleString("es-ES")}
                  </span>
                </div>
                <Trash2
                  onClick={() => removeFromCart(item.type == "simple"?item.id:item.variaciones[0].id)}
                  className="cursor-pointer min-w-sm text-primary hover:scale-105 mx-auto"
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-2 my-4 bg-pink-100/40 rounded-lg p-4 w-full">
            <p className="text-center text-secondary font-semibold text-xl mb-5">
              Resumen de compra
            </p>

            <div className="flex flex-row justify-between w-full">
              <p className="text-primary font-bold text-lg mx-auto">Total:</p>
              <p className="text-primary font-bold text-lg mx-auto">
                $
                {cartItems
                  .reduce((acc, item) => acc + parseFloat(item.price * item.quantity), 0)
                  .toLocaleString("es-ES")}
              </p>
            </div>
            <hr className="w-full border-secondary my-4" />
            <button onClick={()=>router.push("/checkout")} className="bg-primary text-xl block mx-auto text-white font-semibold py-2 px-5 rounded-md hover:opacity-70 hover:scale-105 cursor-pointer">
              <span>Finalizar compra</span>
            </button>
            <button
              onClick={() => clearCart()}
              className="bg-secondary text-sm text-white font-semibold mt-5 py-2 px-2 rounded-md hover:opacity-70 hover:scale-105 cursor-pointer"
            >
              <span>Vaciar carrito</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
