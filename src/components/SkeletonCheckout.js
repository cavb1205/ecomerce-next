export default function SkeletonCheckout() {
    return (
          
            <div className="container mx-auto h-fit  my-14 p-6 animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-1/6 mx-auto"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="animate-pulse space-y-4 col-span-2">
                  <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                </div>
                <div className="animate-pulse space-y-4 bg-pink-100/40 rounded-lg p-4">
                  <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                </div>
              </div>
            </div>
          )
        }
