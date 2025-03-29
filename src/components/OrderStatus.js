export default function OrderStatus({ status }) {
  const statusMap = {
    pending: "Esperando pago",
    processing: "En proceso",
    completed: "Completado",
    cancelled: "Cancelado",
    refunded: "Reembolsado",
    failed: "Fallido",
    on_hold: "En espera",
    in_process: "En proceso",
    in_mediation: "En mediación",
  };

  return (
    <div className="flex flex-col justify-center items-center gap-1 my-5 border p-2 rounded-lg bg-pink-100/40">
      <h3 className="text-md md:text-lg text-primary font-semibold">
        Estado del pedido
      </h3>
      <p
        className={`text-xl font-extrabold ${
          status === "cancelled" || status === "failed"
            ? "text-red-500"
            : "text-secondary"
        } ${
          status === "completed" || status === "processing"
            ? "text-green-500"
            : ""
        } 
        
         `}
      >
        {statusMap[status] || "Estado desconocido"}
      </p>
    </div>
  );
}
