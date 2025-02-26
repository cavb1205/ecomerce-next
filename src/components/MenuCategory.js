import MenuCategoryList from "./MenuCategoryList";
import { getCategoriasConStock } from "@/lib/categorias";

export default async function MenuCategory() {
  const categorias = await getCategoriasConStock();
  return <MenuCategoryList categorias={categorias} />;
}
