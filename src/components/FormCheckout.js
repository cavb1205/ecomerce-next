export default function FormCheckout({ cliente, handleChanges, order }) {
  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row md:gap-8">
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="first_name"
            className="text-secondary font-semibold block"
          >
            Nombre
          </label>
          <input
            onChange={handleChanges}
            className="w-full p-2 border border-gray-300 rounded text-secondary"
            type="text"
            id="first_name"
            name="first_name"
            defaultValue={order.billing?.first_name}
            required
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="last_name"
            className="text-secondary font-semibold block"
          >
            Apellidos
          </label>
          <input
            onChange={handleChanges}
            className="w-full p-2 border border-gray-300 rounded text-secondary"
            type="text"
            id="last_name"
            name="last_name"
            defaultValue={order.billing?.last_name}
            required
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:gap-8">
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="phone" className="text-secondary font-semibold block">
            Teléfono
          </label>
          <input
            onChange={handleChanges}
            className="w-full p-2 border border-gray-300 rounded text-secondary"
            type="text"
            id="phone"
            name="phone"
            defaultValue={order.billing?.phone}
            required
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="email" className="text-secondary font-semibold block">
            Correo electrónico
          </label>
          <input
            onChange={handleChanges}
            className="w-full p-2 border border-gray-300 rounded text-secondary"
            type="email"
            id="email"
            name="email"
            defaultValue={order.billing?.email}
            required
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="address_1"
            className="text-secondary font-semibold block"
          >
            Dirección de envío
          </label>
          <input
            onChange={handleChanges}
            placeholder="Calle, número, colonia"
            className="w-full p-2 border border-gray-300 rounded text-secondary"
            type="text"
            id="address_1"
            name="address_1"
            defaultValue={order.billing?.address_1}
            required
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="address_2"
            className="text-secondary font-semibold block"
          >
            Dirección de envío 2 (opcional)
          </label>
          <input
            onChange={handleChanges}
            placeholder="Calle, número, colonia (opcional)"
            className="w-full p-2 border border-gray-300 rounded text-secondary"
            type="text"
            id="address_2"
            name="address_2"
            defaultValue={order.billing?.address_2}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:gap-8">
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="city" className="text-secondary font-semibold block">
            Ciudad
          </label>
          <input
            onChange={handleChanges}
            className="w-full p-2 border border-gray-300 rounded text-secondary"
            type="text"
            id="city"
            name="city"
            defaultValue={order.billing?.city}
            required
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="state" className="text-secondary font-semibold block">
            Estado o región
          </label>
          <input
            onChange={handleChanges}
            className="w-full p-2 border border-gray-300 rounded text-secondary"
            type="text"
            id="state"
            name="state"
            defaultValue={order.billing?.state}
            required
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:gap-8">
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="postcode"
            className="text-secondary font-semibold block"
          >
            Código postal
          </label>
          <input
            onChange={handleChanges}
            className="w-full p-2 border border-gray-300 rounded text-secondary"
            type="text"
            id="postcode"
            name="postcode"
            defaultValue={order.billing?.postcode}
            required
            placeholder="12345"
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="country"
            className="text-secondary font-semibold block"
          >
            Pais
          </label>
          <input
            onChange={handleChanges}
            className="w-full p-2 border border-gray-300 rounded text-secondary"
            type="text"
            id="country"
            name="country"
            defaultValue="Chile"
            disabled
          />
        </div>
      </div>
      <div>
        <label htmlFor="company" className="text-secondary font-semibold block">
          Información adicional
        </label>
        <textarea
          onChange={handleChanges}
          className="w-full p-2 border border-gray-300 rounded text-secondary"
          type="text"
          id="customer_note"
          name="customer_note"
          defaultValue={order?.customer_note}
          placeholder="Notas sobre tu pedido, por ejemplo, notas especiales para la entrega
          "
        />
      </div>
    </form>
  );
}
