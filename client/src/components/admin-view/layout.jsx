import { Outlet } from "react-router-dom";
import AdminSideBar from "./sidebar";
import AdminHeader from "./header";
import { useState } from "react";
import { useMemo } from "react";

function AdminLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);

  // Memoize the setter function to prevent unnecessary re-renders of children
  // This is a best practice for passing down functions.
  const memoizedSetOpenSidebar = useMemo(() => setOpenSidebar, [setOpenSidebar]);

  return (
    <div className="flex min-h-screen w-full">
      {/* admin sidebar */}
      <AdminSideBar open={openSidebar} setOpen={memoizedSetOpenSidebar} />
      <div className="flex flex-1 flex-col">
        {/* admin header */}
        <AdminHeader setOpen={memoizedSetOpenSidebar} />
        {/*
          Changed the background color of the main content area
          to a light, earthy shade to fit the eco-theme.
        */}
        <main className="flex-1 flex-col flex bg-lime-50 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;