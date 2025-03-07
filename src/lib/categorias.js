const { API_URL, CONSUMER_KEY, CONSUMER_SECRET } = process.env;

export const getCategoriasConStock = async (per_page = 100) => {
  try {
    // 1. Obtener todas las categorías
    const response = await fetch(
      `${API_URL}/products/categories?per_page=${per_page}&hide_empty=true&orderby=name&consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`
    );
    if (!response.ok) {
      return { error: "No se pudo obtener las categorías" };
    }

    // Convertir la respuesta a JSON (usar await aquí)
    const categorias = await response.json();

    // 2. Obtener productos en stock para todas las categorías en paralelo
    const categoriasConStock = await Promise.all(
      categorias.map(async (categoria) => {
        const productosResponse = await fetch(
          `${API_URL}/products?category=${categoria.id}&stock_status=instock&per_page=1&consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`
        );
        if (!productosResponse.ok) {
          return { error: "No se pudo obtener las categorías" };
        }

        // Convertir la respuesta a JSON (usar await aquí)
        const productos = await productosResponse.json();

        // Verificar si hay productos en stock
        return productos.length > 0 ? categoria : null;
      })
    );

    // 3. Filtrar categorías válidas (no null)
    const categoriasFiltradas = categoriasConStock.filter(
      (categoria) => categoria !== null
    );

    return categoriasFiltradas;
  } catch (error) {
    return "Error al obtener categorías con stock:";
  }
};

export const getCategorias = async (per_page = 100) => {
  const response = await fetch(
    `${API_URL}/products/categories?per_page=${per_page}&hide_empty=true&orderby=name&consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`,{cache: "no-store"}
  );
  if (!response.ok) {
    return { error: "No se pudo obtener las categorías" };
  }

  const data = await response.json();
  return data;
};

export const getCategoria = async (slug) => {
  const response = await fetch(
    `${API_URL}/products/categories?slug=${slug}&consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`
  );
  if (!response.ok) {
    return { error: "No se pudo obtener la categoría" };
  }

  const data = await response.json();
  return data;
};
