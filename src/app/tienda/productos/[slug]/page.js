import Image from "next/image";

import { getProducto } from "@/lib/productos";
import ErrorMessage from "@/components/ErrorMessage";
import Link from "next/link";
import ProductDetail from "@/components/ProductDetail";

export default async function Product({ params }) {
  try {
    const { slug } = await params;
    const producto = await getProducto(slug);
    
    return (
      <>
        <section className="container p-2 mx-auto my-8">
          <ProductDetail producto={producto} />
        </section>
      </>
    );
  } catch (error) {
    return <ErrorMessage message={error.message} />;
  }
}
