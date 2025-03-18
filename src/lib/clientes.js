import { redirect } from "next/navigation";
import { toast } from "sonner";


export const createClient = async (userData) => {
  const authHeader =
    "Basic " +
    btoa(`${process.env.NEXT_PUBLIC_USER}:${process.env.NEXT_PUBLIC_PASSWORD}`);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_WORDPRESS}/users`,

    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify(userData),
    }
  );

  if (!response.ok) {
    return { error: "No se pudo crear el cliente" };
  }
  const data = await response.json();
  toast.success("Cliente creado exitosamente");
  redirect("/login");
  return data;
};

export const getClient = async (id) => {
    
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/customers/${id}?consumer_key=${process.env.NEXT_PUBLIC_CONSUMER_KEY}&consumer_secret=${process.env.NEXT_PUBLIC_CONSUMER_SECRET}`,

      {
        method: "GET",
      }
    );
    const data = await res.json();
    console.log("getclient cliente......", cliente);
    return data;
 
  
}


export const orders = async (clienteId) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orders?customer_id=${clienteId}&consumer_key=${process.env.NEXT_PUBLIC_CONSUMER_KEY}&consumer_secret=${process.env.NEXT_PUBLIC_CONSUMER_SECRET}`,
    {
      method: "GET",
    }
  );

  const data = await response.json();
  return data;
};


