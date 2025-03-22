import React, { useState } from "react";
import ShipingMethod from "./ShipingMethod";
import Payments from "./Payments";
export default function ProductResumeCheckout({ cartItems, shippingCost, selectedShipping }) {
 
  return (
    <>
      {cartItems.length === 0 ? (
        <p className="text-center text-secondary font-semibold text-xl mb-20 mt-5">
          No hay productos en el carrito
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          <span className="text-secondary font-semibold text-sm">
            Cantidad de productos: {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          </span>
          <hr className="w-full border-secondary" />
          <div className="grid grid-cols-2 justify-items-start items-center gap-x-4 my-2 text-secondary font-bold">
            <p>Producto</p>
            <p>Subtotal</p>
          </div>
          <hr className="w-full border-secondary" />
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-2 justify-items-start items-center gap-x-4 "
            >
              <div className="flex flex-col justify-start gap-1">
                <span className="text-secondary font-semibold text-sm">
                  {item.name}
                </span>
                <span className="text-secondary font-semibold text-xs">
                  Qty: {item.quantity}
                </span>
              </div>
              <p className="text-primary text-sm font-semibold ">
                ${parseFloat(item.price * item.quantity).toLocaleString("es-ES")}
              </p>
            </div>
          ))}

          <hr className="w-full border-secondary" />
          <div className="grid grid-cols-2 justify-items-star items-center gap-x-4 my-2 text-secondary font-bold">
            <p className="tex-sm">Subtotal</p>
            <p className="text-primary text-sm">
              $
              {cartItems
                .reduce((acc, item) => acc + parseFloat(item.price * item.quantity), 0)
                .toLocaleString("es-ES")}
            </p>
            <p className="tex-sm">Envío</p>
            <p className="text-sm">
              {" "}
              ${shippingCost?.[selectedShipping].toLocaleString("es-ES")}
            </p>
          </div>
          <hr className="w-full border-secondary" />
          <div className="grid grid-cols-2 justify-items-start items-center gap-2 my-2 text-secondary font-bold">
            <p className="text-xl">Total</p>
            <p className="text-primary text-xl">
              $
              {(
                cartItems.reduce(
                  (acc, item) => acc + parseFloat(item.price * item.quantity),
                  0
                ) + parseInt(shippingCost?.[selectedShipping])
              ).toLocaleString("es-ES")}
            </p>
          </div>
         
          
        </div>
      )}
    </>
  );
}
