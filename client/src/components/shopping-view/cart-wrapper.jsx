import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import { memo, useCallback, useMemo } from "react";

const UserCartWrapper = memo(({ cartItems, setOpenCartSheet }) => {
  const navigate = useNavigate();

  const totalCartAmount = useMemo(() => {
    return cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;
  }, [cartItems]);

  const handleCheckout = useCallback(() => {
    navigate("/shop/checkout");
    setOpenCartSheet(false);
  }, [navigate, setOpenCartSheet]);

  return (
    <SheetContent className="sm:max-w-md bg-lime-50 text-lime-900 border-lime-200">
      <SheetHeader className="border-b border-lime-200 pb-4">
        <SheetTitle className="text-xl font-bold text-lime-950">
          Your Cart
        </SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4 overflow-y-auto max-h-[60vh] pr-2">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <UserCartItemsContent key={item.productId} cartItem={item} />
          ))
        ) : (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}
      </div>
      <div className="mt-8 pt-4 border-t border-lime-200 space-y-4">
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span className="text-lime-800">${totalCartAmount.toFixed(2)}</span>
        </div>
      </div>
      <Button
        onClick={handleCheckout}
        className="w-full mt-6 bg-lime-700 text-white hover:bg-lime-800 transition-colors"
        disabled={!cartItems || cartItems.length === 0}
      >
        Checkout
      </Button>
    </SheetContent>
  );
});

UserCartWrapper.displayName = 'UserCartWrapper';

export default UserCartWrapper;