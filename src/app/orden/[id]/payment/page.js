import createPreference from "@/app/api/mercadopago/createPreference";
import { getOrden } from "@/lib/ordenes";

import { redirect } from "next/navigation";

export default async function Pagos({ params }) {
  const { id } = await params;
  const order = await getOrden(id);

  if (order.payment_method === "woo-mercado-pago-basic") {
    const preferencia = await createPreference(order);
    console.log("preferencia respuesta:", preferencia);
    redirect(preferencia.init_point);
  }
}
