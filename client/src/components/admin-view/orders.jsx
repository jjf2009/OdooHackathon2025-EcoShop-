import { useEffect, useState, memo } from "react";
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
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";

const AdminOrdersView = memo(() => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [orderDetails]);

  return (
    <>
      <Card className="bg-lime-50 shadow-md border-lime-200">
        <CardHeader className="border-b border-lime-200">
          <CardTitle className="text-lime-900">All Orders</CardTitle>
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
                  <TableCell colSpan={5} className="text-center text-gray-500 py-4">
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* This is the fixed Dialog. It should be rendered once outside the map loop.
        It opens when `orderDetails` from Redux is populated.
      */}
      <Dialog
        open={openDetailsDialog}
        onOpenChange={() => {
          setOpenDetailsDialog(false);
          dispatch(resetOrderDetails());
        }}
      >
        <AdminOrderDetailsView orderDetails={orderDetails} />
      </Dialog>
    </>
  );
});

AdminOrdersView.displayName = 'AdminOrdersView';

export default AdminOrdersView;