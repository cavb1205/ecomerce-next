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
  try {
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
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`WooCommerce error: ${JSON.stringify(errorData)}`);
  }
  const data = await response.json();
  console.log("Orden actualizada correctamente:", data);
  

  return data;
}
  catch (error) {
    console.error("Error al actualizar la orden:", error);
    return { error: "No se pudo actualizar la orden" };
  }
};


