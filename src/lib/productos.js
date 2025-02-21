const { API_URL, CONSUMER_KEY, CONSUMER_SECRET } = process.env;

export const getProductos = async (search) => {
  console.log("buscando...", search);
  const response = await fetch(
    `${API_URL}/products?stock_status=instock&search=${search}&consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`
  );
  if (!response.ok) {
    throw new Error("No se pudo obtener los productos");
  }

  const data = await response.json();
  return data;
};

export const getSaleProductos = async () => {
  const response = await fetch(
    `${API_URL}/products?stock_status=instock&on_sale=true&consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`
  );
  if (!response.ok) {
    throw new Error("No se pudo obtener los productos");
  }

  const data = await response.json();
  return data;
};


export const getProducto = async (slug) => {
  
  
  // Obtener el producto principal
  const response = await fetch(
    `${API_URL}/products?slug=${slug}&consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`
  );
  
  if (!response.ok) {
    throw new Error("No se pudo obtener el producto");
  }
  
  const data = await response.json();
  
  // Verificar si el producto tiene variaciones
  if (data && data.length > 0) {
    const producto = data[0]; // Suponiendo que el producto con ese slug es el primero
    if (producto.variations && producto.variations.length > 0) {
      // Obtener las variaciones del producto
      const variaciones = await Promise.all(
        producto.variations.map(async (variacionId) => {
          const variacionResponse = await fetch(
            `${API_URL}/products/${producto.id}/variations/${variacionId}?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`
          );
          if (!variacionResponse.ok) {
            throw new Error("No se pudo obtener la variación");
          }
          return await variacionResponse.json();
        })
      );
      producto.variaciones = variaciones; // Añadir las variaciones al producto
    }
    return producto;
  } else {
    throw new Error("Producto no encontrado");
  }
}


export const getProductosCategoria = async (slug) => {
  const response = await fetch(
    `${API_URL}/products?category=${slug}&stock_status=instock&consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`
  );
  if (!response.ok) {
    throw new Error("No se pudo obtener los productos de la categoría");
  }

  const data = await response.json();
  return data;
}