
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
