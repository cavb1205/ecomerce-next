import { redirect } from "next/navigation";
import { toast } from "sonner";

const { API_URL, CONSUMER_KEY, CONSUMER_SECRET, USER, PASSWORD } = process.env;

export const createClient = async (userData) => {
    console.log('ingresa a la funcion')
    
    const authHeader = 'Basic ' + btoa(`alexa.villada:79PX hgSy usXB HT9t bq5n IUxV`)
    
    const response = await fetch(
    "https://divastore.rosapastell.com/wp-json/wp/v2/users",
    
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": authHeader,
      },
      body: JSON.stringify(userData),
    }
  );
    console.log(response)
    if (!response.ok) {
        return { error: "No se pudo crear el cliente" };
    }
  const data = await response.json();
  toast.success("Cliente creado exitosamente");
  redirect("/login");
  return data;
};
