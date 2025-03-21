"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

import { toast } from "sonner";
import { getClient } from "./clientes";
import { useRouter } from "next/navigation";

// Crear el contexto
const CartContext = createContext();

// Crear el hook para usar el carrito
export const useCart = () => useContext(CartContext);

// Crear el proveedor del carrito
export const CartProvider = ({ children }) => {
  const router = useRouter();
  //estados del cliente
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Estado del carrito
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar los productos del carrito desde localStorage al montar el componente
  useEffect(() => {
    const storedToken = localStorage.getItem("token") || null;
    const storedId = localStorage.getItem("user") || null;
    if (storedToken && storedId) {
      setToken(storedToken);
      

      const fetchUser = async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/customers/${storedId}?consumer_key=${process.env.NEXT_PUBLIC_CONSUMER_KEY}&consumer_secret=${process.env.NEXT_PUBLIC_CONSUMER_SECRET}`,
            
            {
              method: "GET",
              
            }
          );
          const user = await res.json();

          if (user?.code) {
            // Si hay un código de error en el usuario (por ejemplo, 401 - no autorizado), redirige
            router.push("/login");
            return;
          }

          // Si todo está bien, se actualiza el estado del cliente
          setUser(user);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching client data:", error);
          // En caso de un error al obtener los datos del cliente, redirige al login
          router.push("/login");
        }
      };

      fetchUser();
    }
    
    // Cargar los productos del carrito desde localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
    setLoading(false);
  }, []);

  // Agregar al carrito
  const addToCart = (product) => {
    if (cartItems.some((item) => item.type == "simple" && item.id === product.id)) {
      toast.error("El producto ya está en el carrito");
      return;
    }
    setCartItems((prevItems) => {
      toast.success("Producto agregado al carrito");
      const newItems = [...prevItems, product];
      localStorage.setItem("cart", JSON.stringify(newItems));
      return newItems;
    });
  };

  // Eliminar del carrito
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.type=="simple"? item.id !== productId: item.variaciones[0].id !== productId);
      localStorage.setItem("cart", JSON.stringify(newItems));
      toast.error("Producto eliminado del carrito");
      return newItems;
    });
  };

  // Vaciar el carrito
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
    toast.error("Carrito vaciado");
  };

  // Iniciar sesión
  const login = async (userData) => {
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
    console.log("data", data);

    if (data.code) {
      return data;
    }
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", data.user_id);
      toast.success("Inicio de sesión exitoso");

      router.push("/");
      return data;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        user,
        login,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
