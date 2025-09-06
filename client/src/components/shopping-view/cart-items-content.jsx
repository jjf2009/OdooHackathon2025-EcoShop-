import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { memo, useCallback, useMemo } from "react";

const UserCartItemsContent = memo(({ cartItem }) => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleUpdateQuantity = useCallback(
    (getCartItem, typeOfAction) => {
      if (typeOfAction === "plus") {
        const getCartItems = cartItems.items || [];
        if (getCartItems.length) {
          const getCurrentProduct = productList.find(
            (product) => product._id === getCartItem?.productId
          );
          const getTotalStock = getCurrentProduct?.totalStock;

          if (getCartItem.quantity + 1 > getTotalStock) {
            toast({
              title: `Only ${getCartItem.quantity} can be added for this item`,
              variant: "destructive",
            });
            return;
          }
        }
      }

      dispatch(
        updateCartQuantity({
          userId: user?.id,
          productId: getCartItem?.productId,
          quantity: typeOfAction === "plus" ? getCartItem.quantity + 1 : getCartItem.quantity - 1,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          toast({
            title: "Cart item updated successfully",
          });
        }
      });
    },
    [cartItems, productList, dispatch, user?.id, toast]
  );

  const handleCartItemDelete = useCallback(
    (getCartItem) => {
      dispatch(
        deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
      ).then((data) => {
        if (data?.payload?.success) {
          toast({
            title: "Cart item deleted successfully",
          });
        }
      });
    },
    [dispatch, user?.id, toast]
  );

  const totalItemPrice = useMemo(() => {
    return ((cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) * cartItem?.quantity).toFixed(2);
  }, [cartItem]);

  return (
    <div className="flex items-center space-x-4 p-4 border rounded-lg bg-lime-50 border-lime-200">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded-lg object-cover border border-lime-300"
      />
      <div className="flex-1 text-lime-900">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="ghost"
            className="h-8 w-8 rounded-full text-lime-800 hover:bg-lime-200"
            size="icon"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease quantity</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            variant="ghost"
            className="h-8 w-8 rounded-full text-lime-800 hover:bg-lime-200"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase quantity</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-extrabold text-lg text-lime-900">
          ${totalItemPrice}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-1 text-red-500 hover:text-red-600 transition-colors"
          size={20}
        />
      </div>
    </div>
  );
});

UserCartItemsContent.displayName = 'UserCartItemsContent';

export default UserCartItemsContent;