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
          <h1 className="text-4xl text-primary font-bold">Novedades</h1>
          <ProductList page={page} />
        </div>
        {/* CATEGORIAS */}
        <div className="my-8">
          <Suspense fallback={<ProductSkeleton />}>
            <CategoryDestacada />
          </Suspense>
        </div>
        {/* OFERTAS */}
        <div className="text-center">
          <h1 className="text-4xl text-primary font-bold">
            Productos en Oferta
          </h1>
          <ProductList on_sale={true} page={page} />
        </div>
        {/* MAS VENDIDOS */}
        <div className="text-center">
          <h1 className="text-4xl text-primary font-bold">Más Vendidos</h1>
          <ProductList page={page} />
        </div>
      </section>
    );
  } catch (error) {
    <ErrorMessage message={error.message} />;
  }
}
