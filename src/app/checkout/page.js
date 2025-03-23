"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/CartContext";

import FormCheckout from "@/components/FormCheckout";
import ProductResumeCheckout from "@/components/ProductResumeCheckout";

import ShipingMethod from "@/components/ShipingMethod";
import SkeletonCheckout from "@/components/SkeletonCheckout";
import Payments from "@/components/Payments";
import { toast } from "sonner";
export default function Checkout() {
  const router = useRouter();

  const [selectedShipping, setSelectedShipping] = useState("calama");
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [cliente, setCliente] = useState(0);
  const [loading, setLoading] = useState(true);
  // const [cartItems, setCartItems] = useState([]);

  const { cartItems, setCartItems } = useCart();

  const shippingCost = {
    calama: "2000",
    chile: "10000",
    tienda: "0",
  };

  const [order, setOrder] = useState({
    payment_method: paymentMethod?.id,
    payment_method_title: paymentMethod?.title,
    set_paid: false,
    customer_id: cliente,
    customer_note: "",
    billing: {
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
    },
    shipping: {
      first_name: "",
      last_name: "",
      company: "N/A",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      country: "CL",
      postcode: "",
    },
    line_items: cartItems.map((item) =>
      item.variaciones
        ? {
            product_id: item.id,
            variation_id: item.variaciones[0]?.id,
            quantity: item.quantity,
          }
        : {
            product_id: item.id,
            quantity: item.quantity,
          }
    ),
    shipping_lines: [
      {
        method_id: selectedShipping,
        method_title: "Envío",
        total: shippingCost[selectedShipping].toString(),
      },
    ],
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user") || 0;
    const storedToken = localStorage.getItem("token") || null;
    const storeItems = JSON.parse(localStorage.getItem("cart")) || [];

    setOrder(
      {
        ...order,
        customer_id: storedUser,
        line_items: storeItems.map((item) =>
          item.variaciones
            ? {
                product_id: item.id,
                variation_id: item.variaciones[0]?.id,
                quantity: item.quantity,
              }
            : {
                product_id: item.id,
                quantity: item.quantity,
              }
        ),
      },
      []
    );

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
    setLoading(false);
  }, []);

  // Función para manejar la selección del método de envío
  const handleShippingChange = (event) => {
    setSelectedShipping(event.target.value);
    setOrder({
      ...order,
      shipping_lines: [
        {
          method_id: event.target.value,
          method_title: "Envío",
          total: shippingCost[event.target.value],
        },
      ],
    });
  };

  const handleSelectedPayment = (selectedPayment) => {
    setPaymentMethod(selectedPayment);
    setOrder({
      ...order,
      payment_method: selectedPayment?.id,
      payment_method_title: selectedPayment?.title,
    });
  };

  const handleChanges = (e) => {
    setOrder({
      ...order,
      customer_note: e.target.value,
      billing: {
        ...order.billing,
        [e.target.name]: e.target.value,
      },
      shipping: {
        ...order.shipping,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (order.billing.email === "" || order.billing.phone === "") {
      toast.error("Debes ingresar un correo y un teléfono");
      setLoading(false);
      return;
    }
    if (
      !order.billing.first_name ||
      !order.billing.last_name ||
      !order.billing.address_1 ||
      !order.billing.city ||
      !order.billing.postcode
    ) {
      toast.error("Todos los campos de dirección son obligatorios.");
      setLoading(false);
      return;
    }

    if (
      !order.shipping.first_name ||
      !order.shipping.last_name ||
      !order.shipping.address_1 ||
      !order.shipping.city ||
      !order.shipping.postcode
    ) {
      toast.error("Todos los campos de envío son obligatorios.");
      setLoading(false);
      return;
    }

    // Verificar si se ha seleccionado un método de pago
    if (!order.payment_method || !order.payment_method_title) {
      toast.error("Debes seleccionar un método de pago.");
      setLoading(false);
      return;
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/orders?consumer_key=${process.env.NEXT_PUBLIC_CONSUMER_KEY}&consumer_secret=${process.env.NEXT_PUBLIC_CONSUMER_SECRET}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      }
    );

    const data = await response.json();

    if (data.code) {
      setLoading(false);
      toast.error("Error al realizar el pedido");
      return data;
    }
    if (data.id) {
      localStorage.removeItem("cart");
      setCartItems([]);
      setLoading(false);
      toast.success("Pedido realizado con éxito");
      router.push("/orden/" + data.id);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto h-fit  my-14 p-6">
        <SkeletonCheckout />
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
          <FormCheckout
            cliente={cliente}
            handleChanges={handleChanges}
            order={order}
          />
        </div>
        <div className="bg-pink-100/40 rounded-lg p-4">
          <h4 className="text-primary text-2xl font-semibold mb-2">
            Tu pedido
          </h4>
          <ProductResumeCheckout
            cartItems={cartItems}
            selectedShipping={selectedShipping}
            shippingCost={shippingCost}
          />
          <ShipingMethod
            selectedShipping={selectedShipping}
            handleShippingChange={handleShippingChange}
          />
          <Payments onPaymentChange={handleSelectedPayment} />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-primary text-white font-bold p-4 text-xl rounded-lg mt-4 hover:opacity-90 hover:scale-105 transition-all"
          >
            Realizar pedido
          </button>
        </div>
      </div>
    </section>
  );
}
