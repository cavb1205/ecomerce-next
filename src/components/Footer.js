import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-pink-400/90 w-full max-h-fit min-h-48 p-8">
      <div className="flex flex-col justify-center items-center sm:flex-row sm:justify-between gap-4">
        <div className="text-center sm:text-left">
          <h4 className="text-white font-semibold text-2xl">Sobre Diva Store</h4>
          <p className="text-white text-sm">Somos tienda Online</p>
          <p className="text-gray-50 text-sm">Calama - Chile</p>
        </div>

        <div className="flex flex-col justify-center items-center gap-4">
          <h4 className="font-semibold text-white text-2xl">Síguenos en:</h4>
          <div className="flex md:flex-row justify-center gap-8">
            <a href="https://www.instagram.com/divastore_cl" target="_blank">
              <Image
                src="/img/icons/facebook-rosa.svg"
                className="w-12 hover:scale-110 hover:opacity-90"
                alt="Facebook logo"
                width={12}
                height={12}
              />
            </a>
            <a href="https://www.instagram.com/divastore_cl" target="_blank">
              <Image
                src="/img/icons/instagram-rosa.svg"
                className="w-12 hover:scale-110 hover:opacity-90"
                alt="Instagram"
                width={12}
                height={12}
              />
            </a>
          </div>
        </div>

        <div className="">
          <h5 className="text-white font-semibold text-2xl text-center">
            Aceptamos
          </h5>
          <img
            src="/img/icons/logo_mercado_pago.avif"
            className="w-40 mx-auto"
            alt="Logo mercado pago"
            // width={40}
            // height={10}
          />
        </div>
      </div>

      <div className="flex flex-row flex-wrap justify-evenly items-center gap-2 mt-5">
        <span className="text-xs text-white">
          Creado con 🫶🏻 por{" "}
          <a href="https://github.com/cavb1205" target="_blank">
            @cavb1205
          </a>
        </span>
        <span className="text-sm text-white">© 2025, Diva Store</span>
      </div>
    </footer>
  );
}
