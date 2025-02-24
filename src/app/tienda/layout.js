import MenuCategory from "@/components/MenuCategory";

import MenuCategorySkeleton from "@/components/MenuCategorySkeleton";
import ProductSkeleton from "@/components/ProductSkeleton";

import { Suspense } from "react";

export default function Layout({ children }) {
  return (
    <div className="flex flex-row  justify-center w-full min-h-screen h-auto">
      <div className="py-4 px-6 w-1/6 hidden lg:block ">
        <Suspense fallback={<MenuCategorySkeleton />}>
          <MenuCategory />
        </Suspense>
      </div>

      <div className="w-full lg:w-5/6 ">
        <Suspense fallback={<ProductSkeleton />}>{children}</Suspense>
      </div>
    </div>
  );
}
