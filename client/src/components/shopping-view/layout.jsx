import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";

function ShoppingLayout() {
  return (
    <div className="flex flex-col bg-lime-50 text-lime-900 overflow-hidden min-h-screen">
      {/* common header */}
      <ShoppingHeader />
      <main className="flex flex-col w-full px-4 md:px-6 py-4">
        <Outlet />
      </main>
    </div>
  );
}

export default ShoppingLayout;