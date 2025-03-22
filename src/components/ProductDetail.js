"use client";
import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { toast } from "sonner";

export default function ProductDetail({ producto }) {
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [quantity, setQuantity] = useState(1);
  console.log("cantidad seleccionada:", quantity);
  console.log("variacion seleccionada:", selectedVariation);
  console.log("producto completo:", producto);
  const { addToCart } = useCart();
  const handleAddToCart = () => {
    if (quantity === "" || quantity === 0) {
      toast.info("La cantidad mínima es 1");
      return;
    }
    const productWhitQuantity = {
      ...producto,
      quantity,
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

  const handleQuantity = (e) => {
    if (producto.type === "variable" && !selectedVariation) {
      toast.info("Debes seleccionar una variación");
      return;
    }
    // Si el campo está vacío o es un valor no numérico, no hacer nada
    if (e.target.value === "" || isNaN(e.target.value)) {
      setQuantity(e.target.value);
    }
    if (e.target.value === 0) {
      toast.info("La cantidad mínima es 1");
      setQuantity(1);
    } else if (
      (e.target.value <= selectedVariation?.stock_quantity &&
        e.target.value > 0) ||
      (e.target.value <= producto.stock_quantity && e.target.value > 0)
    ) {
      setQuantity(parseInt(e.target.value));
    } else if (
      e.target.value > selectedVariation?.stock_quantity ||
      e.target.value > producto.stock_quantity
    ) {
      toast.info(`No hay suficiente stock`);
      setQuantity(selectedVariation?.stock_quantity || producto.stock_quantity);
    }
  };

  return (
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
        <h1 className="text-pink-400 text-3xl font-bold">{producto.name}</h1>

        {/* Precio y Descuento */}
        <div className="mb-6">
          {producto.on_sale && producto.type == "variable" ? (
            <div className="flex items-center gap-2">
              <span className="text-gray-500 line-through text-lg">
                $
                {parseFloat(
                  producto.variaciones[0]?.regular_price
                ).toLocaleString("es-Es")}
              </span>
              <span className="text-pink-500 text-2xl font-semibold">
                $
                {parseFloat(producto.variaciones[0]?.sale_price).toLocaleString(
                  "es-Es"
                )}
              </span>
              <span className="bg-primary text-white text-sm font-semibold px-2 py-1 rounded-lg">
                Oferta
              </span>
            </div>
          ) : producto.on_sale && producto.type == "simple" ? (
            <div className="flex items-center gap-2">
              <span className="text-gray-500 line-through text-lg">
                ${parseFloat(producto.regular_price).toLocaleString("es-Es")}
              </span>
              <span className="text-pink-500 text-2xl font-semibold">
                ${parseFloat(producto.sale_price).toLocaleString("es-Es")}
              </span>
              <span className="bg-primary text-white text-sm font-semibold px-2 py-1 rounded-lg">
                Oferta
              </span>
            </div>
          ) : (
            <span className="text-secondary text-2xl font-semibold">
              ${parseFloat(producto.price).toLocaleString("es-Es")}
            </span>
          )}
        </div>
        {producto.type === "simple" ? (
          <div className="my-4">
            {producto.attributes.map((attribute) => (
              <div key={attribute.id} className="my-2">
                <h4 className="text-gray-500 font-semibold text-xl mb-2">
                  {attribute.name}:{" "}
                  <span className="text-pink-500">{attribute.options[0]}</span>
                </h4>
              </div>
            ))}
          </div>
        ) : (
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
                .filter((variation) => variation.stock_status === "instock")
                .map((variation) => (
                  <button
                    onClick={() => setSelectedVariation(variation)}
                    key={variation.id}
                    className={`${
                      variation.id == selectedVariation?.id
                        ? "p-2 rounded-lg bg-primary text-white font-semibold"
                        : "p-2 rounded-lg bg-pink-100 text-pink-500 hover:bg-pink-200 hover:text-pink-600 hover:font-semibold"
                    }`}
                  >
                    {variation.attributes[0]?.option}
                  </button>
                ))}
            </div>
          </div>
        )}
        {selectedVariation ? (
          <span className="text-green-600 text-sm">
            Disponibles: {selectedVariation.stock_quantity}
          </span>
        ) : producto.type === "simple" ? (
          <span className="text-green-600 text-sm">
            Disponibles: {producto.stock_quantity}
          </span>
        ) : null}
        <div className="my-4">
          <h4 className="text-gray-500 font-semibold text-md mb-2">
            Cantidad:
          </h4>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantity}
            className="p-1 rounded-lg border border-gray-300 w-20"
          />
        </div>

        {/* Botones de Acción */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleAddToCart}
            className="py-3 px-10 rounded-full text-white font-semibold bg-pink-400 hover:bg-pink-500 transition-colors duration-300"
          >
            Agregar al carrito
          </button>
        </div>
        <div className="my-6">
          <h4 className="text-gray-500 font-semibold text-xl mb-2">
            Categorías:
          </h4>
          <div className="flex flex-row items-center gap-4">
            {producto.categories.map((category) => (
              <Link
                href={`/tienda/categorias/${category.slug}`}
                key={category.id}
              >
                <span className="p-1 rounded-lg bg-pink-100 text-pink-500 hover:bg-pink-200 hover:text-pink-400">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col my-10 max-w-sm">
          <h4 className="text-pink-400 text-xl font-semibold">Descripción:</h4>
          <div
            className="text-gray-600 prose"
            dangerouslySetInnerHTML={{ __html: producto.description }}
          />
        </div>
      </div>
    </div>
  );
}
