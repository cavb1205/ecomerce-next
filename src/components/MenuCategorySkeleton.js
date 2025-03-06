export default function MenuCategorySkeleton() {
  return (
    <>
      <div className="block  md:hidden animate-pulse space-y-4 px-6 ">
        <div className="w-1/3 mx-auto h-6 bg-gray-200 rounded-md"></div>
        <div className="h-6 bg-gray-200 rounded-md"></div>
      </div>
      <div className="hidden md:block animate-pulse space-y-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="h-6 bg-gray-200 rounded-md"></div>
        ))}
      </div>
    </>
  );
}
