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
  const payment = await new Payment(client).get({ id });

  console.log("payment", payment);
  if (payment.status === "approved") {
    const orderId = payment.metadata.order_id;

    const order = await getOrden(orderId);
    const updateOrder = {
      id: orderId,
      status: "processing",
      transaction_id: payment.id.toString(),
    };

    const actualizado = await putOrden(orderId, updateOrder);
  }
}
