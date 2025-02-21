export default function CategoryListSkeleton() {
    return (
      <div className="animate-pulse my-4 p-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-gray-200 rounded-lg p-4">
              <div className="mt-4">
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }