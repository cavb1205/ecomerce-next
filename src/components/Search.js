"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { use } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Search() {
  const searchparams = useSearchParams();
  const { replace } = useRouter();
  const pathname = "/tienda/productos";
  const TIME_BEFORE_SEARCH = 400;

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchparams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`);
  }, TIME_BEFORE_SEARCH);
  return (
    <div>
      <input
        className="border-1 border-gray-300 p-1 rounded-lg text-base"
        onChange={(event) => handleSearch(event.target.value)}
        type="text"
        placeholder="🔍  Buscar productos"
        defaultValue={searchparams.get("search")?.toString() || ""}
      />
    </div>
  );
}
