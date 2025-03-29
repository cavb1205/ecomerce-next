import { putOrden, getOrden } from "@/lib/ordenes";
import { MercadoPagoConfig, Preference, Payment } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

export default async function createPreference(order) {
  const items = order?.line_items.map((item) => ({
    title: item.name,
    quantity: item.quantity,
    currency_id: "CLP",
    unit_price: item.price,
  }));

  const email = order?.billing.email;
  const cost = parseInt(order?.shipping_total);
  const body = {
    items: items,

    payer: {
      email: email,
    },
    shipments: {
      cost: cost,
    },
    metadata: {
      order_id: order.id,
    },
    back_urls: {
      success: `${process.env.URL}/orden/${order.id}`,
      failure: `${process.env.URL}/orden/${order.id}`,
      pending: `${process.env.URL}/orden/${order.id}`,
    },
    auto_return: "approved",
  };

  const preference = new Preference(client).create({ body });

  return preference;
}

export async function Pagos(id) {
  console.log("id de la funcion pagosss", id);

  console.log("tipo de dato id", typeof id);

  try {
    const payment = await new Payment(client).get({ id: id });
    console.log("payment response", payment);
    console.log("obtenemos el pago");

    // Mapeo de estados de Mercado Pago a WooCommerce
    const woocommerceStatusMap = {
      approved: "processing", // Pago aprobado y acreditado: procesando pedido.
      pending: "pending", // Pago pendiente: pedido en espera.
      authorized: "on-hold", // Pago autorizado pero no capturado.
      in_process: "on-hold", // Pago en revisión: pedido en espera.
      in_mediation: "on-hold", // Pago en disputa: pedido en espera.
      rejected: "failed", // Pago rechazado: pedido fallido.
      cancelled: "cancelled", // Pago cancelado: pedido cancelado.
      refunded: "refunded", // Pago reembolsado: pedido reembolsado.
      charged_back: "refunded", // Contracargo: consideramos reembolsado también.
    };
    const woocommerceStatus = woocommerceStatusMap[payment.status];
    console.log(`Estado mapeado a WooCommerce: ${woocommerceStatus}`);

    if (woocommerceStatus) {
      const orderId = payment.metadata.order_id;
      //   console.log("orderId:", orderId);
    console.log("id de la orden de tipo", typeof(orderId));
      const updateOrder = {
        id: orderId,
        status: woocommerceStatus, // Estado mapeado
        transaction_id: payment.id.toString(),
      };

      console.log("Datos para la actualización de la orden:", updateOrder);
      const actualizado = await putOrden(orderId, updateOrder);
      console.log("Orden actualizada en WooCommerce:", actualizado);
      return actualizado;
    } else {
      console.log(
        "Estado no reconocido en WooCommerce. No se realizará ninguna actualización."
      );
    }
  } catch (error) {
    console.log("Error al obtener el pago", error);
    return null;
  }
}
