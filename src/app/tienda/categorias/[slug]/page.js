import ErrorMessage from "@/components/ErrorMessage";
import { getProductosCategoria } from "@/lib/productos";
import { getCategoria } from "@/lib/categorias";
import ProductListItem from "@/components/ProductListItem";
import Pagination from "@/components/Pagination";
import ProductSkeleton from "@/components/ProductSkeleton";
import { Suspense } from "react";
import ProductList from "@/components/ProductList";
import CategoryProductList from "@/components/CategoryProductList";

export default async function ProductsCategory({ params, searchParams }) {
  try {
    const page = searchParams?.page || 1;
    const { slug } = await params;

    return (
      <section className="container mx-auto p-2">
        
        <Suspense key={page+slug} fallback={<ProductSkeleton />}>
          <CategoryProductList page={page} slug={slug}  />
        </Suspense>
        <Pagination page={page} />
      </section>
    );
  } catch (error) {
    return <ErrorMessage message={error.message} />;
  }
}
