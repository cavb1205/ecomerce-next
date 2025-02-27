import CategoryDestacada from "@/components/CategoryDestacada";
import CategoryListSkeleton from "@/components/CategoryListSkeleton";
import ErrorMessage from "@/components/ErrorMessage";

import ProductList from "@/components/ProductList";
import ProductSkeleton from "@/components/ProductSkeleton";
import { Suspense } from "react";

export default async function Home() {
  try {
    const page = 1;

    return (
      <section className="container mx-auto my-4">
        {/* NOVERDADES */}
        <div className="text-center">
          <h1 className="text-4xl text-primary font-bold my-4">Novedades</h1>
          <Suspense fallback={<ProductSkeleton />}>
            <ProductList page={page} per_page={6} />
          </Suspense>
        </div>
        {/* CATEGORIAS */}
        <div className="my-10">
          <Suspense fallback={<ProductSkeleton />}>
            <CategoryDestacada />
          </Suspense>
        </div>
        {/* OFERTAS */}
        <div className="text-center my-8">
          <h1 className="text-4xl text-primary font-bold my-4">
            Productos en Oferta
          </h1>
          <ProductList on_sale={true} page={page} per_page={6} />
        </div>
       
      </section>
    );
  } catch (error) {
    <ErrorMessage message={error.message} />;
  }
}
