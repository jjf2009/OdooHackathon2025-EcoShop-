import {
  BadgeCheck,
  LayoutDashboard,
  ShoppingBasket,
} from "lucide-react";
import { Fragment, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

// Memoize the menu items data as it's static
const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
];

// Memoize the MenuItems component to prevent re-renders unless props change
const MenuItems = memo(({ setOpen }) => {
  const navigate = useNavigate();

  // Use useCallback to memoize the click handler
  const handleMenuItemClick = useCallback(
    (path) => {
      navigate(path);
      if (setOpen) {
        setOpen(false);
      }
    },
    [navigate, setOpen]
  );

  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => handleMenuItemClick(menuItem.path)}
          className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-lime-800 hover:bg-lime-200 hover:text-lime-950 transition-colors"
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
});

MenuItems.displayName = 'MenuItems';

const AdminSideBar = memo(({ open, setOpen }) => {
  const navigate = useNavigate();

  // Memoize the logo click handler
  const handleLogoClick = useCallback(() => {
    navigate("/admin/dashboard");
  }, [navigate]);

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 bg-lime-50 text-lime-900 border-lime-200">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b border-lime-200">
              <SheetTitle 
                onClick={handleLogoClick}
                className="flex gap-2 mt-5 mb-5 cursor-pointer items-center"
              >
                <img
                  src="https://img.icons8.com/plasticine/100/leaf.png"
                  alt="leaf-icon"
                  className="w-8 h-8"
                />
                <h1 className="text-2xl font-extrabold text-lime-950">
                  Admin Panel
                </h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      
      <aside className="hidden w-64 flex-col border-r border-lime-200 bg-lime-50 p-6 lg:flex">
        <div 
          onClick={handleLogoClick} 
          className="flex cursor-pointer items-center gap-2"
        >
          <img
            src="https://img.icons8.com/plasticine/100/leaf.png"
            alt="leaf-icon"
            className="w-8 h-8"
          />
          <h1 className="text-2xl font-extrabold text-lime-950">
            Admin Panel
          </h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
});

AdminSideBar.displayName = 'AdminSideBar';

export default AdminSideBar;