"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

import { toast } from "sonner";
import { getClient } from "./clientes";

// Crear el contexto
const CartContext = createContext();

// Crear el hook para usar el carrito
export const useCart = () => useContext(CartContext);

// Crear el proveedor del carrito
export const CartProvider = ({ children }) => {
  //estados del cliente
  const [cliente, setCliente] = useState(null);
  const [token, setToken] = useState(null);


  // Estado del carrito
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar los productos del carrito desde localStorage al montar el componente
  useEffect(() => {
    
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
    setLoading(false);
  }, []);

  // Agregar al carrito
  const addToCart = (product) => {
    if (cartItems.some((item) => item.id === product.id)) {
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
      const newItems = prevItems.filter((item) => item.id !== productId);
      localStorage.setItem("cart", JSON.stringify(newItems));
      toast.error("Producto eliminado del carrito" );
      return newItems;
    });
  };

  // Vaciar el carrito
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
    toast.error("Carrito vaciado");
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, cliente, token }}
    >
      {children}
    </CartContext.Provider>
  );
};
