import { getOrden } from "@/lib/ordenes";

export default async function OrderDetail({ params }) {
  const { id } = await params;

  const order = await getOrden(id);

  return (
    <div className="container mx-auto h-fit  my-6 p-6">
      <h1 className="text-primary text-2xl md:text-4xl my-4 text-center font-bold">
        Detalles del pedido
      </h1>
      <p className="text-md md:text-lg text-secondary">
        El pedido{" "}
        <span className="text-primary font-semibold">#{order.id}</span> se
        realizó el {order.date_created} y se encuentra{" "}
        <span className="text-primary font-semibold">{order.status}</span>{" "}
      </p>

      <div className="bg-pink-100/40 rounded-lg p-4 my-4 flex flex-col gap-2">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4  w-full mx-auto mb-4">
          <h3 className="text-md md:text-lg text-primary font-semibold">
            Producto
          </h3>
          <h3 className="text-md md:text-lg text-primary font-semibold">
            Total
          </h3>
        </div>
        {order.line_items.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-2 md:grid-cols-2 gap-4  w-full mx-auto"
          >
            <div>
              <h3 className="text-sm text-secondary font-semibold">
                {item.name}{" "}
              </h3>
              <span className="text-xs text-secondary">
                Qty: {item.quantity}
              </span>{" "}
            </div>
            <div className="text-secondary flex justify-start gap-4">
              <span className="text-sm text-secondary font-semibold">
                {" "}
                ${item.total}
              </span>
            </div>
          </div>
        ))}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4  w-full mx-auto">
          <h3 className="text-sm md:text-md text-primary font-semibold">
            Envío
          </h3>
          <h3 className="text-sm md:text-md text-primary font-semibold">
            ${order.shipping_total}
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4  w-full mx-auto">
          <h3 className="text-md md:text-xl text-primary font-semibold">
            Total
          </h3>
          <h3 className="text-md md:text-xl text-primary font-semibold">
            ${order.total}
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4  w-full mx-auto">
          <h3 className="text-sm md:text-base text-secondary font-semibold">
            Metodo de pago
          </h3>
          <h3 className="text-sm md:text-base text-secondary font-semibold">
            {order.payment_method_title}
          </h3>
        </div>
      </div>
      <div className="w-full mx-auto my-4 bg-pink-100/40 rounded-lg p-4">
        <h3 className="text-lg text-primary font-semibold text-center">
          Datos de envío
        </h3>
        <p className="text-md text-secondary font-semibold">
          Dirección: {order.shipping.address_1}
        </p>
        <p className="text-md text-secondary font-semibold">
          Ciudad: {order.shipping.city}
        </p>
        <p className="text-md text-secondary font-semibold">
          Estado: {order.shipping.state}
        </p>
        <p className="text-md text-secondary font-semibold">
          País: {order.shipping.country}
        </p>
      </div>
    </div>
  );
}
