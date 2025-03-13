"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../lib/clientes";
const { API_URL, CONSUMER_KEY, CONSUMER_SECRET } = process.env;

export default function RegisterClient() {
  // const authHeader = 'Basic ' + Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (userData.password !== userData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    
      userData.username = userData.email;
      const data = await createClient(userData);
    
    
  };

  return (
    <section className="container mx-auto h-fit  my-14 p-6">
      <div className="register-form w-4/12 mx-auto">
        <h2 className=" text-primary font-bold text-4xl text-center">
          Crear una cuenta
        </h2>
        {error && (
          <p className="bg-red-500/80 rounded-lg p-2 my-2 text-white font-semibold">
            {error}
          </p>
        )}
        {success && <p className="success">{success}</p>}

        <form className="grid grid-cols-1 gap-2 my-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <input
              placeholder="Nombres"
              className="font-semibold border border-primary rounded-md p-2"
              type="text"
              name="first_name"
              value={userData.first_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <input
              placeholder="Apellidos"
              className="font-semibold border border-primary rounded-md p-2"
              type="text"
              name="last_name"
              value={userData.last_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <input
              className="font-semibold border border-primary rounded-md p-2"
              placeholder="Correo electrónico"
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <input
              className="font-semibold border border-primary rounded-md p-2"
              placeholder="Contraseña"
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <input
              className="font-semibold border border-primary rounded-md p-2"
              placeholder="Confirmar contraseña"
              type="password"
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            className="text-white text-2xl bg-primary rounded-full p-2 font-bold hover:scale-105 hover:opacity-75 my-5"
            type="submit"
          >
            Registrarse
          </button>
        </form>
      </div>
    </section>
  );
}
