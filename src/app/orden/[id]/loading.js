export default function Loading() {
  return (
    <div className="container mx-auto h-fit  my-14 p-6">
      <h1 className="text-primary text-2xl md:text-4xl my-4 text-center font-bold">
        Detalles del pedido
      </h1>
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
      </div>
    </div>
  );
}