import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";
import { memo } from "react";

const AdminHeader = memo(({ setOpen }) => {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-lime-50 border-b border-lime-200 shadow-sm">
      <Button 
        onClick={() => setOpen(true)} 
        className="lg:hidden sm:block p-2 rounded-full bg-transparent hover:bg-lime-100 text-lime-700 transition-colors"
      >
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-full px-4 py-2 text-sm font-medium bg-lime-700 text-white shadow-md hover:bg-lime-800 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  );
});

AdminHeader.displayName = 'AdminHeader';

export default AdminHeader;