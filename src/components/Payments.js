"use client";
import React, { useState, useEffect } from "react";
export default function Payments() {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payment_gateways?consumer_key=${process.env.NEXT_PUBLIC_CONSUMER_KEY}&consumer_secret=${process.env.NEXT_PUBLIC_CONSUMER_SECRET}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      if (data.code) {
        setError();
      }

      setPaymentMethod(data);
      setLoading(false);
    };
    fetchPayments();
  }, []);

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };
  if (loading) return <p>Cargando...</p>;
  return (
    <div className="my-6">
      <h1 className="text-secondary font-semibold">Métodos de pago</h1>
      {error ? (
        <p className="text-primary font-bold text-md">
          Ocurrió un error al cargar las pasarelas de pago
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {paymentMethod
            .filter((method) => method.enabled)
            .map((method) => (
              <div
                key={method.id}
                className="flex flex-col gap-2 text-secondary text-md"
              >
                <div className="flex flex-row justify-start gap-2">
                  <input
                    type="radio"
                    id={method.id}
                    name="payment"
                    value={method.id}
                    checked={selectedPayment === method.id}
                    onChange={handlePaymentChange}
                  />
                  <label htmlFor={method.id}>{method.title}</label>
                </div>
                {selectedPayment === method.id && (
                  <span className="text-xs text-secondary">
                    {method.description}
                  </span>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
