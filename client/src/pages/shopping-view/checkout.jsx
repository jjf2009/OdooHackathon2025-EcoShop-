import { useState, useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import img from "../../assets/account.jpg";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import Address from "@/components/shopping-view/address";
import { Button } from "@/components/ui/button";
import { createNewOrder } from "@/store/shop/order-slice";
import { useToast } from "@/components/ui/use-toast";

const ShoppingCheckout = memo(() => {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  const handleInitiatePaypalPayment = useCallback(() => {
    if (!cartItems || !cartItems.items || cartItems.items.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });
      return;
    }
    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    setIsPaymentStart(true);
    dispatch(createNewOrder(orderData)).then((data) => {
      if (!data?.payload?.success) {
        setIsPaymentStart(false);
      }
    });
  }, [cartItems, currentSelectedAddress, user, totalCartAmount, dispatch, toast]);

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="flex flex-col bg-lime-50 text-lime-900 min-h-screen">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src="https://img.icons8.com/plasticine/100/eco-bag.png"
          alt="Eco-friendly shopping bag"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 p-5">
        <div className="rounded-lg border border-lime-200 p-4 shadow-sm bg-white">
          <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
          <Address
            selectedId={currentSelectedAddress}
            setCurrentSelectedAddress={setCurrentSelectedAddress}
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="rounded-lg border border-lime-200 p-4 shadow-sm bg-white flex-grow">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cartItems && cartItems.items && cartItems.items.length > 0 ? (
                cartItems.items.map((item) => (
                  <UserCartItemsContent key={item?.productId} cartItem={item} />
                ))
              ) : (
                <p className="text-center text-gray-500">Your cart is empty.</p>
              )}
            </div>
          </div>
          <div className="mt-8 space-y-4 rounded-lg border border-lime-200 p-4 shadow-sm bg-white">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold text-lg">${totalCartAmount.toFixed(2)}</span>
            </div>
            <div className="w-full">
              <Button
                onClick={handleInitiatePaypalPayment}
                className="w-full bg-lime-700 hover:bg-lime-800 text-white transition-colors"
                disabled={isPaymentStart || !cartItems?.items?.length || !currentSelectedAddress}
              >
                {isPaymentStart ? "Processing..." : "Checkout with Paypal"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ShoppingCheckout.displayName = 'ShoppingCheckout';

export default ShoppingCheckout;