"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";


import { login } from "@/lib/clientes";

export default function Login() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (userData.username === "" || userData.password === "") {
      setError("Todos los campos son obligatorios");
      return;
    }
    const data = await login(userData);
    if (data.code) {
      setError("Usuario o contraseña incorrectos");
      return;
    }
    
  };

  return (
    <section className="container mx-auto h-fit  my-14 p-6">
      <div className="register-form w-4/12 mx-auto">
        <h2 className=" text-primary font-bold text-4xl text-center">
          Iniciar sesión
        </h2>
        {error && (
          <p className="bg-red-600/80 rounded-lg p-2 my-2 text-white font-semibold text-sm">
            {error}
          </p>
        )}

        <form className="grid grid-cols-1 gap-2 my-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <input
              placeholder="Correo electrónico"
              className="font-semibold border border-primary rounded-md p-2"
              type="email"
              name="username"
              value={userData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <input
              placeholder="Contraseña"
              className="font-semibold border border-primary rounded-md p-2"
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white font-semibold text-lg py-2 rounded-md hover:scale-105 hover:font-extrabold"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
      <button
        onClick={() => router.push("/registro")}
        className="text-secondary font-semibold text-center cursor-pointer block border rounded-md border-secondary w-4/12 mx-auto p-2 my-5 hover:bg-secondary hover:text-white"
      >
        Registrarse
      </button>
    </section>
  );
}
