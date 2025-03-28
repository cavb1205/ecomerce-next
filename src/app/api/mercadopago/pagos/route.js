import { Pagos } from "../createPreference";
export async function POST(req) {
  console.log("llegue al webhook");

  const body = await req.json();

  Pagos(body.data.id);

  return new Response(null, { status: 200 });
}
