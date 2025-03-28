export const getOrden = async (id) => {
  const response = await fetch(
    `${process.env.API_URL}/orders/${id}?consumer_key=${process.env.CONSUMER_KEY}&consumer_secret=${process.env.CONSUMER_SECRET}`
  );
  if (!response.ok) {
    return { error: "No se pudo obtener la orden" };
  }

  const data = await response.json();
  return data;
};

export const putOrden = async (id, updateOrder) => {
  const response = await fetch(
    `${process.env.API_URL}/orders/${id}?consumer_key=${process.env.CONSUMER_KEY}&consumer_secret=${process.env.CONSUMER_SECRET}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateOrder),
    }
  );
  const data = await response.json();
  console.log("respuesta de la actualizacion del pedido", data);

  return data;
};


