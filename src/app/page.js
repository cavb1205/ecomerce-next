import ErrorMessage from "@/components/ErrorMessage";
import { getSaleProductos } from "@/lib/productos";


export default async function Home() {
  const sale_products = await getSaleProductos();
  try{
   return (
    <h1>home</h1>
   )
  }catch(error){
    return (<ErrorMessage message={error.message} />)
  }
  
    
}
