import React, { useState } from "react";
import ShipingMethod from "./ShipingMethod";
import Payments from "./Payments";
export default function ProductResumeCheckout({ cartItems }) {
  const shippingCost = {
    calama: 2000,
    chile: 10000,
    tienda: 0,
  };

  const [selectedShipping, setSelectedShipping] = useState("calama");

  // Función para manejar la selección del método de envío
  const handleShippingChange = (event) => {
    setSelectedShipping(event.target.value);
  };
  return (
    <>
      {cartItems.length === 0 ? (
        <p className="text-center text-secondary font-semibold text-xl mb-20 mt-5">
          No hay productos en el carrito
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          <span className="text-secondary font-semibold text-sm">
            Cantidad de productos: {cartItems.length}
          </span>
          <hr className="w-full border-secondary" />
          <div className="grid grid-cols-2 justify-items-start items-center gap-2 my-2 text-secondary font-bold">
            <p>Producto</p>
            <p>Precio</p>
          </div>
          <hr className="w-full border-secondary" />
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-2 justify-items-start items-center gap-2 my-4 "
            >
              <p className="text-secondary font-semibold text-sm">
                {item.name}
              </p>
              <p className="text-primary text-sm font-semibold ">
                ${parseFloat(item.price).toLocaleString("es-ES")}
              </p>
            </div>
          ))}

          <hr className="w-full border-secondary" />
          <div className="grid grid-cols-2 justify-items-start items-center gap-2 my-2 text-secondary font-bold">
            <p className="tex-sm">Subtotal</p>
            <p className="text-primary text-sm">
              $
              {cartItems
                .reduce((acc, item) => acc + parseFloat(item.price), 0)
                .toLocaleString("es-ES")}
            </p>
            <p className="tex-sm">Envío</p>
            <p className="text-sm"> ${shippingCost?.[selectedShipping].toLocaleString("es-ES")}</p>
          </div>
          <hr className="w-full border-secondary" />
          <div className="grid grid-cols-2 justify-items-start items-center gap-2 my-2 text-secondary font-bold">
            <p className="text-xl">Total</p>
            <p className="text-primary text-xl">
              $
              {(cartItems
                .reduce((acc, item) => acc + parseFloat(item.price), 0)
                 + shippingCost?.[selectedShipping]).toLocaleString("es-ES")}
            </p>
          </div>
          <ShipingMethod
            selectedShipping={selectedShipping}
            handleShippingChange={handleShippingChange}
          />
          <Payments />
        </div>
      )}
    </>
  );
}
