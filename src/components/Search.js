"use client";
import { useSearchParams, useRouter } from "next/navigation";

export default function Search() {
  const searchparams = useSearchParams();
    const {replace} = useRouter();
    const pathname = '/tienda/productos';
    
  const handleSearch = (term) => {
    
    const params = new URLSearchParams(searchparams);
    if (term){
        params.set("search", term);
    }
    else{
        params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);   
  };
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
