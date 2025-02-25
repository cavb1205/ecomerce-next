import { getSaleProductos } from "@/lib/productos";
import ProductList from "@/components/ProductList";
import ErrorMessage from "@/components/ErrorMessage";


export default async function Ofertas({searchParams}){
    try{
        const page = searchParams?.page || 1;
        
        return (
            <div className="text-center">
            <h1 className="text-4xl text-primary font-bold">Productos en Oferta</h1>
            <ProductList on_sale={true} page={page} />
            </div>
        )   

    }catch(error){
        <ErrorMessage message={error.message} />
    }
}