import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState, memo, useCallback } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";

const MemoizedMenuItems = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleNavigate = useCallback(
    (getCurrentMenuItem) => {
      sessionStorage.removeItem("filters");
      const currentFilter =
        getCurrentMenuItem.id !== "home" &&
        getCurrentMenuItem.id !== "products" &&
        getCurrentMenuItem.id !== "search"
          ? { category: [getCurrentMenuItem.id] }
          : null;

      sessionStorage.setItem("filters", JSON.stringify(currentFilter));

      if (location.pathname.includes("listing") && currentFilter !== null) {
        setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        );
      } else {
        navigate(getCurrentMenuItem.path);
      }
    },
    [navigate, location, setSearchParams]
  );

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          className="text-sm font-medium cursor-pointer text-lime-800 hover:text-lime-950 transition-colors"
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
});

MemoizedMenuItems.displayName = 'MemoizedMenuItems';

const MemoizedHeaderRightContent = memo(() => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems(user?.id));
    }
  }, [dispatch, user?.id]);

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative rounded-full border-lime-300 bg-lime-100 hover:bg-lime-200"
        >
          <ShoppingCart className="w-6 h-6 text-lime-800" />
          <span className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 h-5 w-5 rounded-full bg-red-500 text-white font-bold text-sm flex items-center justify-center">
            {cartItems?.items?.length || 0}
          </span>
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={cartItems?.items || []}
        />
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-lime-700 cursor-pointer">
            <AvatarFallback className="bg-lime-700 text-white font-extrabold">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56 bg-lime-50 border-lime-200 text-lime-900">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-lime-200" />
          <DropdownMenuItem onClick={() => navigate("/shop/account")} className="cursor-pointer hover:bg-lime-200">
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-lime-200" />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer hover:bg-lime-200">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
});

MemoizedHeaderRightContent.displayName = 'MemoizedHeaderRightContent';

function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-lime-50 border-lime-200">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2 text-lime-900">
          <img src="https://img.icons8.com/plasticine/100/leaf.png" alt="logo" className="w-8 h-8"/>
          <span className="font-extrabold text-xl">Green Market</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden bg-lime-100 border-lime-200 hover:bg-lime-200">
              <Menu className="h-6 w-6 text-lime-800" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs bg-lime-50 border-lime-200">
            <MemoizedMenuItems />
            <MemoizedHeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MemoizedMenuItems />
        </div>

        <div className="hidden lg:block">
          <MemoizedHeaderRightContent />
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;