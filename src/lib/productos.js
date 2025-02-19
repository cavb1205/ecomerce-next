const { API_URL, CONSUMER_KEY, CONSUMER_SECRET } = process.env;

export const getProductos = async () => {
  const response = await fetch(
    `${API_URL}/products?stock_status=instock&consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`
  );
  if (!response.ok) {
    throw new Error("No se pudieron obtener los productos");
  }

  const data = await response.json();
  return data;
};


// export const getProducto = async (slug) => {
  
//   const response = await fetch(
//     `${API_URL}/products?slug=${slug}&consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`
//   );
//   if (!response.ok) {
//     throw new Error("No se pudo obtener el producto");
//   }

//   const data = await response.json();
//   return data[0];
// }


// // Obtener los detalles de las variaciones
// export const variationDetails = await Promise.all(
//   product.variations.map(async (variationId) => {
//     const variationResponse = await fetch( `${API_URL}/products/${product.id}/variations/${variationId}`);
//     return variationResponse.json();
//   })
// );

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