import { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { Loader2 } from "lucide-react";

const PaypalReturnPage = memo(() => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (paymentId && payerId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

      dispatch(capturePayment({ paymentId, payerId, orderId })).then((data) => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          // Redirect to the eco-themed success page
          window.location.href = "/shop/payment-success";
        }
      });
    }
  }, [paymentId, payerId, dispatch]);

  return (
    <div className="flex min-h-[calc(100vh-100px)] w-full items-center justify-center bg-lime-50 p-4">
      <Card className="p-8 text-center bg-white border border-lime-200 shadow-lg">
        <CardHeader className="p-0 flex flex-col items-center">
          <Loader2 className="h-16 w-16 text-lime-600 animate-spin mb-4" />
          <CardTitle className="text-xl sm:text-2xl font-bold text-lime-900">
            Processing Payment...
          </CardTitle>
          <p className="text-sm sm:text-lg text-lime-700 mt-2">
            Please wait while we confirm your order. Do not close this page.
          </p>
        </CardHeader>
      </Card>
    </div>
  );
});

PaypalReturnPage.displayName = 'PaypalReturnPage';

export default PaypalReturnPage;