export default function CategorySkeletonHome() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-2">
      <div className=" flex flex-col gap-4">
        <div className="animate-pulse bg-gray-200 rounded-lg h-72"></div>
        <div className="animate-pulse bg-gray-200 rounded-lg mx-auto w-28 h-5"></div>
      </div>
      <div className=" flex flex-col gap-4">
        <div className="animate-pulse bg-gray-200 rounded-lg h-72"></div>
        <div className="animate-pulse bg-gray-200 rounded-lg mx-auto w-28 h-5"></div>
      </div>
      <div className=" flex flex-col gap-4">
        <div className="animate-pulse bg-gray-200 rounded-lg h-72"></div>
        <div className="animate-pulse bg-gray-200 rounded-lg mx-auto w-28 h-5"></div>
      </div>
    </div>
  );
}
