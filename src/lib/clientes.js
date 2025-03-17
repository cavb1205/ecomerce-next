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

export const getClient = async (token) => {
  console.log("ingresa a get client");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_WORDPRESS}/users/me`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (data.id) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/customers/${data.id}?consumer_key=${process.env.NEXT_PUBLIC_CONSUMER_KEY}&consumer_secret=${process.env.NEXT_PUBLIC_CONSUMER_SECRET}`,

      {
        method: "GET",
      }
    );
    const cliente = await res.json();
    console.log("getclient cliente", cliente);
    return cliente;
  }
};

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

export const login = async (userData) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/wp-json/jwt-auth/v1/token`,

    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  const data = await response.json();

  if (data.code) {
    return data;
  }
  if (data.token) {
    localStorage.setItem("token", data.token);
    toast.success("Inicio de sesión exitoso");

    redirect("/");
    return data;
  }
};
