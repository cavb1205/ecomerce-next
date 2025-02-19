export default function Layout({ children }) {
  return (
    <div className="flex flex-row  justify-center w-full min-h-screen h-auto">
      <div className="bg-gray-200 p-4 w-1/4 hidden lg:block">
        <h2>menu filtros productos</h2>
      </div>
      <div className="w-full lg:w-3/4 ">{children}</div>
    </div>
  );
}
