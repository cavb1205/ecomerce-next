import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.NEXT_PUBLIC_MP_ACCESS_TOKEN,
});


const preference = new Preference(client);

preference.create({
    items: [
        {
        title: "Mi producto",
        unit_price: 100,
        quantity: 1,
        },
    ],
    })
    .then((response) => {
        console.log(response.body);
    })
    .catch((error) => {
        console.log(error);
    });