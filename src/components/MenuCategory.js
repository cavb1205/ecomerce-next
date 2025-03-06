import MenuCategoryList from "./MenuCategoryList";
import { getCategorias } from "@/lib/categorias";

export default async function MenuCategory() {
  const categorias = await getCategorias();
  
  return <MenuCategoryList categorias={categorias} />;
}
