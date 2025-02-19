export default function ProductDetailSkeleton() {
    return (
      <div className="animate-pulse max-w-md mx-auto">
        {/* Imagen del producto */}
        <div className="w-full h-64 bg-gray-300 rounded-lg"></div>
  
        {/* Título del producto */}
        <div className="h-8 bg-gray-300 rounded w-3/4 mt-6"></div>
  
        {/* Descripción del producto */}
        <div className="space-y-2 mt-4">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-4/6"></div>
        </div>
  
        {/* Precio del producto */}
        <div className="h-6 bg-gray-300 rounded w-1/4 mt-4"></div>
      </div>
    );
  }