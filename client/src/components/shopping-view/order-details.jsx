import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { memo } from "react";

const ShoppingOrderDetailsView = memo(({ orderDetails }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <DialogContent className="sm:max-w-[600px] bg-lime-50 text-lime-900 border-lime-200">
      <div className="grid gap-6 p-4">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label className="font-semibold text-lime-800">
              {orderDetails?._id}
            </Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label className="text-lime-800">
              {orderDetails?.orderDate.split("T")[0]}
            </Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label className="font-bold text-lime-900">
              ${orderDetails?.totalAmount}
            </Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Method</p>
            <Label className="text-lime-800">
              {orderDetails?.paymentMethod}
            </Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label className="text-lime-800">
              {orderDetails?.paymentStatus}
            </Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 text-white font-semibold capitalize ${
                  orderDetails?.orderStatus === "delivered"
                    ? "bg-lime-700"
                    : orderDetails?.orderStatus === "confirmed"
                    ? "bg-blue-600"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-500"
                    : "bg-gray-500"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator className="bg-lime-200" />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-bold text-lg text-lime-900">Order Details</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems?.length > 0 ? (
                orderDetails.cartItems.map((item) => (
                  <li key={item.productId} className="flex items-center justify-between border-b border-lime-100 pb-2 text-sm text-lime-800">
                    <span>
                      <span className="font-semibold">Title:</span> {item.title}
                    </span>
                    <span>
                      <span className="font-semibold">Quantity:</span> {item.quantity}
                    </span>
                    <span>
                      <span className="font-semibold">Price:</span> ${item.price}
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-center text-gray-500">
                  No order items found.
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-bold text-lg text-lime-900">Shipping Info</div>
            <div className="grid gap-0.5 text-lime-800">
              <span className="font-semibold">{user.userName}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span className="text-sm font-light">Notes: {orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
});

ShoppingOrderDetailsView.displayName = 'ShoppingOrderDetailsView';

export default ShoppingOrderDetailsView;