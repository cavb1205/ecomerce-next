export default function MenuCategorySkeleton() {
    return (
      <div className="animate-pulse space-y-4 ">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="h-6 bg-gray-200 rounded-md"></div>
        ))}
       
      </div>
    );
  }