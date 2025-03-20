"use client";
import React, { useState } from "react";
export default function ShipingMethod({
  selectedShipping,
  handleShippingChange,
}) {
  return (
    <div className="mt-6">
      <h3 className="text-secondary font-semibold">Método de envío</h3>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <input
            onChange={handleShippingChange}
            type="radio"
            name="shiping"
            id="tienda"
            value="tienda"
            defaultChecked={selectedShipping === "tienda"}
          />
          <label htmlFor="tienda" className="text-secondary text-sm">
            Recoger en tienda (Calama)
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            onChange={handleShippingChange}
            type="radio"
            name="shiping"
            id="calama"
            value="calama"
            defaultChecked={selectedShipping === "calama"}
          />
          <label htmlFor="calama" className="text-secondary text-sm">
            Envío a domicilio (solo Calama)
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            onChange={handleShippingChange}
            type="radio"
            name="shiping"
            id="chile"
            value="chile"
            defaultChecked={selectedShipping === "chile"}
          />
          <label htmlFor="chile" className="text-secondary text-sm">
            Envío ciudades de Chile
          </label>
        </div>
      </div>
    </div>
  );
}
