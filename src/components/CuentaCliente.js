
import { getClient } from "../lib/clientes";

export default async function Cuenta({ token }) {
    
    const cliente = await getClient(token);
    
    return (

    <section className="container mx-auto h-fit  my-14 p-6">
        <div>
          <h1>Esto es la página de cuenta</h1>
        </div>
        <button
          className="bg-primary text-white font-semibold rounded-lg p-2 text-center block mx-auto my-5 hover:opacity-80"
         
        >
          Cerrar sesión
        </button>
      </section>
    )
}