"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link  from "next/link";

export default function Pagination({ page }) {

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const currentPage = Number(searchParams.get("page") || 1)

  const createPageUrl = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `${pathName}?${params.toString()}`;
  };
  return (
    <div className="mt-5 mb-5 w-full flex justify-center items-center gap-5  ">
        
      <Link
        href={createPageUrl(currentPage > 1? currentPage - 1: 1)}
        className="bg-pink-100 text-pink-400 font-semibold px-4 py-2 rounded-lg "
      >
        Anterior
      </Link>
      <span className="text-gray-500 font-semibold">Página {currentPage}</span>
      <Link
        href={createPageUrl(currentPage + 1)}
        className="bg-pink-100 text-pink-400 font-semibold px-4 py-2 rounded-lg"
      >
        Siguiente
      </Link>
    </div>
  );
}
