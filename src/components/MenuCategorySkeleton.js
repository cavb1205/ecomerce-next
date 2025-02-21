export default function MenuCategorySkeleton() {
    return (
      <div className="animate-pulse space-y-4 ">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="h-10 bg-gray-200 rounded-md"></div>
        ))}
       
      </div>
    );
  }