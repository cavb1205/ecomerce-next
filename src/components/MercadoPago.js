import React, { useEffect } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

export default function MercadoPago() {
  useEffect(() => {
    initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY, { locale: "es-CL" });
  }, []);

  return (
    <div>
      <Wallet initialization={{ preferenceId: "<PREFERENCE_ID>" }} />
    </div>
  );
}
