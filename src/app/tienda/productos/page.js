
import ErrorMessage from "@/components/ErrorMessage";

import ProductList from "@/components/ProductList";
import { Suspense } from "react";
import ProductSkeleton from "@/components/ProductSkeleton";
import Pagination from "@/components/Pagination";

export default async function Productos({ searchParams }) {
  try {
    // Acceder a searchParams de manera segura
    const search = searchParams?.search || "";
    const page = searchParams?.page || 1;

    return (
      <>
        <h1 className="text-2xl md:text-4xl text-center font-bold text-primary mb-10">
          Productos Disponibles
        </h1>

        <Suspense key={search + page} fallback={<ProductSkeleton />}>
          <ProductList search={search} page={page} />
        </Suspense>
        <Pagination page={page} />
      </>
    );
  } catch (error) {
    return <ErrorMessage message={error.message} />;
  }
}
