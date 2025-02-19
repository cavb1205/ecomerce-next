export default function ErrorMessage({ message }) {
  return (
    <div className="text-center">
      <h1 className="text-2xl md:text-4xl text-center font-bold text-pink-400 mb-10">
        {message} 🔥
      </h1>
    </div>
  );
}
