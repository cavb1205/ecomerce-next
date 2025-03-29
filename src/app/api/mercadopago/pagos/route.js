import { Pagos } from "../createPreference";
export async function POST(req) {
  console.log("llegue al webhook");
  try{

    const body = await req.json();
  
    await Pagos(body.data.id);
  
    return new Response(null, { status: 200 });
  }
  catch (error) {
    console.error("Error en el webhook:", error);
    return new Response(null, { status: 500 });
  }
}
