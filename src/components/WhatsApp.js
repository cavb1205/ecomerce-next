/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function WhatsApp() {
    const phoneNumber = "56964863243";
  return (
    <div>
      <Link href={`https://wa.me/${phoneNumber}`}
        
          className="fixed bottom-5 right-5 p-3 rounded-full shadow-lg bg-white hover:scale-105"
          target="_blank"
          rel="noopener noreferrer"
          >
        
          <img
            src="/img/icons/whatsapp-icon.svg"
            alt="WhatsApp"
            className="w-8 h-8  hover:opacity-80"
          />
        
      </Link>
    </div>
  );
}