import MenuCategory from "@/components/MenuCategory";
import MenuCategorySkeleton from "@/components/MenuCategorySkeleton";
import ProductSkeleton from "@/components/ProductSkeleton";
import { getCategorias } from "@/lib/categorias";
import { Suspense } from "react";

export default async function Layout({ children }) {
  
  const categorias = await getCategorias();

  return (
    <div className="flex flex-row  justify-center w-full min-h-screen h-auto">
      <div className="p-4 w-1/4 hidden lg:block">
        <Suspense fallback={<MenuCategorySkeleton />}>
          <MenuCategory categorias={categorias} />
        </Suspense>
      </div>
      <div className="w-full lg:w-3/4 ">
        <Suspense fallback={<ProductSkeleton />}>{children}</Suspense>
      </div>
    </div>
  );
}
