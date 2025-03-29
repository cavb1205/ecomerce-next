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
  if (typeof id !== "string") {
    id = id.toString(); // Conversión segura
  }
  console.log("tipo de dato id", typeof id);

  try {
    const payment = await new Payment(client).get({ id: id });
    // Verificar estructura crítica
    if (!payment || !payment.status || !payment.metadata) {
      throw new Error("Respuesta de pago inválida");
    }
    console.log("payment response", payment);
    console.log("obtenemos el pago");

    // Mapeo de estados de Mercado Pago a WooCommerce
    const woocommerceStatusMap = {
      approved: "processing",
      pending: "pending",
      authorized: "on-hold",
      in_process: "on-hold",
      in_mediation: "on-hold",
      rejected: "failed",
      cancelled: "cancelled",
      refunded: "refunded",
      charged_back: "refunded",

      default: "pending",
    };
    const woocommerceStatus =
      woocommerceStatusMap[payment.status] || woocommerceStatusMap.default;
    console.log(`Estado mapeado a WooCommerce: ${woocommerceStatus}`);

    if (woocommerceStatus) {
      const orderId = payment.metadata.order_id;
      //   console.log("orderId:", orderId);
      console.log("id de la orden de tipo", typeof orderId);
      const updateOrder = {
        status: woocommerceStatus, // Estado mapeado
        transaction_id: payment.id.toString(),
        meta_data: [{
            key: "mercado_pago_id",
            value: payment.id
          }]
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
