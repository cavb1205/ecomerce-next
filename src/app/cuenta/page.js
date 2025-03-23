"use client";
import React, { useState, useEffect } from "react";
import { getClient } from "../../lib/clientes";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/CartContext";
import Link from "next/link";

export default function Cuenta() {
  const [token, setToken] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [cuenta, setCuenta] = useState(true);
  const [pedidos, setPedidos] = useState(false);
  const [ordes, setOrders] = useState([]);
  const [direccion, setDireccion] = useState(false);

  const router = useRouter();
  const { user } = useCart();
  console.log(cliente);

  console.log("user cuenta context", user);

  const Skeleton = () => (
    <div className="animate-pulse space-y-4">
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      <div className="h-4 bg-gray-300 rounded w-1/3"></div>
    </div>
  );

  useEffect(() => {
    const storedToken = localStorage.getItem("token") || null;
    const storedId = localStorage.getItem("user") || null;

    if (!storedToken) {
      // Si no hay token, redirige a login
      router.push("/login");
      return;
    }

    setToken(storedToken);

    const fetchClient = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/customers/${storedId}?consumer_key=${process.env.NEXT_PUBLIC_CONSUMER_KEY}&consumer_secret=${process.env.NEXT_PUBLIC_CONSUMER_SECRET}`,

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

    fetchClient();
  }, []); // Solo s

  const handleCloseSession = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const handleCuenta = () => {
    setCuenta(true);
    setPedidos(false);
    setDireccion(false);
  };

  const handlePedidos = () => {
    setCuenta(false);
    setPedidos(true);
    setDireccion(false);
    setLoadingOrders(true);
    async function fetchOrders() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders?customer=${cliente.id}&consumer_key=${process.env.NEXT_PUBLIC_CONSUMER_KEY}&consumer_secret=${process.env.NEXT_PUBLIC_CONSUMER_SECRET}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();

      setOrders(data);
      setLoadingOrders(false);
    }
    fetchOrders();
  };
  const handleDireccion = () => {
    setCuenta(false);
    setPedidos(false);
    setDireccion(true);
  };

  if (loading) {
    return (
      <section className="container mx-auto h-fit my-14 p-6">
        <h1 className="text-secondary font-semibold text-2xl text-center">
          Cuenta
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          <div className="col-span-1 bg-pink-50 p-4 rounded-lg gap-2">
            <Skeleton />
          </div>
          <div className="col-span-2 p-4 rounded-lg">
            <Skeleton />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto h-fit  my-14 p-6">
      <h1 className="text-secondary font-semibold text-2xl text-center">
        Cuenta de{" "}
        <span className="text-primary capitalize">
          {cliente.first_name} {cliente.last_name}
        </span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
        <div className="flex flex-col justify-start items-center col-span-1 bg-pink-50 p-4 rounded-lg gap-2">
          <button
            onClick={handlePedidos}
            className="px-4 py-1 w-1/2 bg-primary rounded-lg gap-2 text-white font-semibold hover:opacity-90 hover:scale-105"
          >
            Pedidos
          </button>
          <button
            onClick={handleCuenta}
            className="px-4 py-1 w-1/2 bg-primary rounded-lg gap-2 text-white font-semibold hover:opacity-90 hover:scale-105"
          >
            Cuenta
          </button>
          <button
            onClick={handleDireccion}
            className="px-4 py-1 w-1/2 bg-primary rounded-lg gap-2 text-white font-semibold hover:opacity-90 hover:scale-105"
          >
            Dirección
          </button>
        </div>
        {cuenta ? (
          <div className="col-span-2  p-4 rounded-lg">
            <h2 className="text-primary font-semibold text-2xl mb-4">
              Información de la cuenta
            </h2>
            <p className="text-secondary text-lg font-semibold">
              <span className="font-bold text-secondary">Nombre:</span>{" "}
              {cliente.first_name} {cliente.last_name}
            </p>
            <p className="text-secondary text-lg font-semibold">
              <span className="font-bold">Correo electrónico:</span>{" "}
              {cliente.email}
            </p>
            <p className="text-sm text-secondary">
              <span className="font-bold">Creación de la cuenta:</span>{" "}
              {cliente.date_created
                ? new Date(cliente.date_created).toLocaleDateString("es-ES")
                : "No disponible"}
            </p>
          </div>
        ) : pedidos ? (
          <div className="col-span-2 p-4 rounded-lg">
            <h2 className="text-primary font-semibold text-2xl mb-4">
              Historial de Pedidos
            </h2>
            {loadingOrders ? (
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            ) : ordes.length > 0 ? (
              <div>
                <div className="grid grid-cols-4 gap-2 text-secondary font-bold text-sm md:text-lg">
                  <span className="font-semibold"># Orden</span>{" "}
                  <span className="font-semibold">Fecha</span>{" "}
                  <span className="font-semibold">Estado</span>
                  <span className="font-semibold">Total</span>
                </div>
                {ordes.map((order, index) => (
                  <div
                    key={order.id}
                    className="grid grid-cols-4 gap-2 text-xs md:text-lg"
                  >
                    <Link href={`/orden/${order.id}`}>
                      <span className="text-primary font-bold">
                        {order.number}
                      </span>{" "}
                    </Link>
                    <span className="text-secondary font-medium">
                      {new Date(order.date_created).toLocaleDateString("es-ES")}
                    </span>{" "}
                    <span className={`${order.status==="completed"? "text-green-600 font-semibold":"text-secondary font-semibold"}`}>
                      {order.status}
                    </span>
                    <span className="text-secondary font-medium">
                      {parseFloat(order.total).toLocaleString("es-ES")}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-secondary font-semibold">No hay pedidos</p>
            )}
          </div>
        ) : direccion ? (
          <div className="col-span-2 p-4 rounded-lg">
            <h2 className="text-primary font-semibold text-2xl mb-4">
              Direcciones de envío
            </h2>
            <p className="text-secondary text-lg font-semibold">
              <span className="font-bold">Dirección de envío:</span>{" "}
              {cliente.shipping.address_1}
            </p>
            <p className="text-secondary text-lg font-semibold">
              <span className="font-bold">Ciudad:</span> {cliente.shipping.city}
            </p>
            <p className="text-secondary text-lg font-semibold">
              <span className="font-bold">Código postal:</span>{" "}
              {cliente.shipping.postcode}
            </p>
          </div>
        ) : null}
      </div>
      <hr className="my-5" />
      <button
        onClick={handleCloseSession}
        className="bg-primary text-white font-semibold rounded-lg p-2 text-center block mx-auto my-5 hover:opacity-80"
      >
        Cerrar sesión
      </button>
    </section>
  );
}
