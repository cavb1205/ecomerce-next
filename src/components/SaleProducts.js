import ProductList from "./ProductList";

export default function SaleProducts() {
    return (
        <div className="text-center my-8">
          <h1 className="text-4xl text-primary font-bold my-4">
            Productos en Oferta
          </h1>
          <ProductList on_sale={true} page={1} per_page={6} />
        </div>
    );
    }