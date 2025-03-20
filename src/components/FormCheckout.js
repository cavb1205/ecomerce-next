export default function FormCheckout({cliente, handleChanges}) {
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
                  defaultValue={cliente.first_name}
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
                  defaultValue={cliente.last_name}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 md:flex-row md:gap-8">
              <div className="flex flex-col gap-2 w-full">
                <label
                  htmlFor="city"
                  className="text-secondary font-semibold block"
                >
                  Teléfono
                </label>
                <input
                  onChange={handleChanges}
                  className="w-full p-2 border border-gray-300 rounded text-secondary"
                  type="text"
                  id="city"
                  name="city"
                  defaultValue={cliente.city}
                  required
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label
                  htmlFor="state"
                  className="text-secondary font-semibold block"
                >
                  Correo electrónico
                </label>
                <input
                  onChange={handleChanges}
                  className="w-full p-2 border border-gray-300 rounded text-secondary"
                  type="email"
                  id="state"
                  name="state"
                  defaultValue={cliente.state}
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
                  defaultValue={cliente.address_1}
                  required
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label
                  htmlFor="address_1"
                  className="text-secondary font-semibold block"
                >
                  Dirección de envío 2 (opcional)
                </label>
                <input
                  onChange={handleChanges}
                  placeholder="Calle, número, colonia (opcional)"
                  className="w-full p-2 border border-gray-300 rounded text-secondary"
                  type="text"
                  id="address_1"
                  name="address_1"
                  defaultValue={cliente.address_1}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 md:flex-row md:gap-8">
              <div className="flex flex-col gap-2 w-full">
                <label
                  htmlFor="city"
                  className="text-secondary font-semibold block"
                >
                  Ciudad
                </label>
                <input
                  onChange={handleChanges}
                  className="w-full p-2 border border-gray-300 rounded text-secondary"
                  type="text"
                  id="city"
                  name="city"
                  defaultValue={cliente.city}
                  required
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label
                  htmlFor="state"
                  className="text-secondary font-semibold block"
                >
                  Estado o región
                </label>
                <input
                  onChange={handleChanges}
                  className="w-full p-2 border border-gray-300 rounded text-secondary"
                  type="text"
                  id="state"
                  name="state"
                  defaultValue={cliente.state}
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
                  defaultValue={cliente.postcode}
                  placeholder="12345"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label
                  htmlFor="state"
                  className="text-secondary font-semibold block"
                >
                  Pais
                </label>
                <input
                  onChange={handleChanges}
                  className="w-full p-2 border border-gray-300 rounded text-secondary"
                  type="text"
                  id="state"
                  name="state"
                  defaultValue="Chile"
                  required
                  disabled
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="company"
                className="text-secondary font-semibold block"
              >
                Información adicional
              </label>
              <textarea
                onChange={handleChanges}
                className="w-full p-2 border border-gray-300 rounded text-secondary"
                type="text"
                id="company"
                name="company"
                defaultValue={cliente.company}
              />

            </div>
          </form>
    )
}