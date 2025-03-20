"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useCart } from "@/lib/CartContext";
import FormCheckout from "@/components/FormCheckout";
import ProductResumeCheckout from "@/components/ProductResumeCheckout";

import ShipingMethod from "@/components/ShipingMethod";
export default function Checkout() {
  const { cartItems } = useCart();
  const [cliente, setCliente] = useState({
    first_name: "",
    last_name: "",
    company: "N/A",
    email: "",
    phone: "",
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    country: "CL",
    postcode: "",
  });
  const [loading, setLoading] = useState(true);
 

  const router = useRouter();

  const Skeleton = () => (
    <div className="animate-pulse space-y-4">
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      <div className="h-4 bg-gray-300 rounded w-1/3"></div>
    </div>
  );

  const handleChanges = (e) => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };

  console.log("cliente", cliente);

  useEffect(() => {
    const storedToken = localStorage.getItem("token") || null;
    const storedUser = localStorage.getItem("user") || null;

    const fetchClient = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/customers/${storedUser}?consumer_key=${process.env.NEXT_PUBLIC_CONSUMER_KEY}&consumer_secret=${process.env.NEXT_PUBLIC_CONSUMER_SECRET}`,

          {
            method: "GET",
          }
        );
        const data = await res.json();
        console.log("getclient cliente......", data);

        if (data?.code) {
          // Si hay un código de error en el usuario (por ejemplo, 401 - no autorizado), redirige
          router.push("/login");
          return;
        }

        // Si todo está bien, se actualiza el estado del cliente
        setCliente(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching client data:", error);
        // En caso de un error al obtener los datos del cliente, redirige al login
        router.push("/login");
      }
    };

    if (storedUser && storedToken) {
      fetchClient();
    }
  }, []); // Solo s

  if (loading) {
    return (
      <div className="container mx-auto h-fit  my-14 p-6">
        <Skeleton />
      </div>
    );
  }

  return (
    <section className=" container mx-auto h-fit  my-14 p-6">
      <h1 className="text-4xl text-primary text-center font-bold my-6">
        Checkout
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="col-span-2">
          <h4 className="text-secondary text-xl font-semibold mb-4">
            Detalles de envío
          </h4>
          <FormCheckout cliente={cliente} handleChanges={handleChanges} />
        </div>
        <div className="bg-pink-100/40 rounded-lg p-4">
          <h4 className="text-primary text-2xl font-semibold mb-2">
            Tu pedido
          </h4>
          <ProductResumeCheckout cartItems={cartItems} />
          
        </div>
      </div>
    </section>
  );
}
