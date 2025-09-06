import { useEffect, useState, memo, useCallback } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ShoppingOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";

const ShoppingOrders = memo(() => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  const handleFetchOrderDetails = useCallback(
    (getId) => {
      dispatch(getOrderDetails(getId));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id));
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (orderDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [orderDetails]);

  return (
    <>
      <Card className="bg-lime-50 shadow-md border-lime-200">
        <CardHeader className="border-b border-lime-200">
          <CardTitle className="text-lime-900">Order History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-lime-100 hover:bg-lime-100 text-lime-900 font-medium">
                <TableHead>Order ID</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Order Price</TableHead>
                <TableHead>
                  <span className="sr-only">Details</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderList && orderList.length > 0 ? (
                orderList.map((orderItem) => (
                  <TableRow
                    key={orderItem?._id}
                    className="hover:bg-lime-100 transition-colors"
                  >
                    <TableCell className="text-lime-800 truncate">
                      {orderItem?._id}
                    </TableCell>
                    <TableCell className="text-lime-800">
                      {orderItem?.orderDate.split("T")[0]}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`py-1 px-3 text-white font-semibold capitalize ${
                          orderItem?.orderStatus === "delivered"
                            ? "bg-lime-700"
                            : orderItem?.orderStatus === "confirmed"
                            ? "bg-blue-600"
                            : orderItem?.orderStatus === "rejected"
                            ? "bg-red-500"
                            : "bg-gray-500"
                        }`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-lime-800">
                      ${orderItem?.totalAmount}
                    </TableCell>
                    <TableCell>
                      <Button
                        className="bg-lime-700 text-white hover:bg-lime-800 transition-colors"
                        onClick={() =>
                          handleFetchOrderDetails(orderItem?._id)
                        }
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-gray-500 py-4"
                  >
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {/* This is the fixed Dialog, rendered once outside the loop. */}
      <Dialog
        open={openDetailsDialog}
        onOpenChange={(isOpen) => {
          setOpenDetailsDialog(isOpen);
          if (!isOpen) {
            dispatch(resetOrderDetails());
          }
        }}
      >
        <ShoppingOrderDetailsView orderDetails={orderDetails} />
      </Dialog>
    </>
  );
});

ShoppingOrders.displayName = 'ShoppingOrders';

export default ShoppingOrders;