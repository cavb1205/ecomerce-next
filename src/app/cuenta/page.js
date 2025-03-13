"use client";
import RegisterClient from "@/components/RegisterClient";
import {redirect} from "next/navigation";

export default function Cuenta() {
    
  const client = false;
  if (!client) {
    redirect("/login");
  }
  if (client) {
    return (
      <section className="container mx-auto h-fit  my-14 p-6">
        <div>
          <h1>Esto es la página de cuenta</h1>
        </div>
      </section>
    );
  }
}

