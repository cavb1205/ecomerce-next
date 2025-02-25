const { API_URL, CONSUMER_KEY, CONSUMER_SECRET } = process.env;


export const getCategorias = async (per_page=100) => {
    const response = await fetch(
        `${API_URL}/products/categories?per_page=${per_page}&hide_empty=true&orderby=name&consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`
    );
    if (!response.ok) {
        throw new Error("No se pudo obtener las categorías");
    }
    
    const data = await response.json();
    return data;
    }

export const getCategoria = async (slug) => {
    const response = await fetch(
        `${API_URL}/products/categories?slug=${slug}&consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`
    );
    if (!response.ok) {
        throw new Error("No se pudo obtener la categoría");
    }
    
    const data = await response.json();
    return data;
    }