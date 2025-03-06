
import MenuCategory from "@/components/MenuCategory";

import MenuCategorySkeleton from "@/components/MenuCategorySkeleton";
import ProductSkeleton from "@/components/ProductSkeleton";

import { Suspense } from "react";

export default function Layout({ children }) {
  return (
    <div className="md:flex md:flex-row  justify-center w-full min-h-screen h-auto">
      <div className="md:py-4 md:px-6 md:w-1/6  ">
        <Suspense fallback={<MenuCategorySkeleton />}>
          <MenuCategory />
        </Suspense>
      </div>

      <div className="w-full lg:w-5/6 flex flex-col items-center justify-center  ">
        
        <div className="w-full">
          <Suspense fallback={<ProductSkeleton />}>{children}</Suspense>
        </div>
      </div>
    </div>
  );
}
