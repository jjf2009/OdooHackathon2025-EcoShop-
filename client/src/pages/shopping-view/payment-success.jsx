import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const PaymentSuccessPage = memo(() => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[calc(100vh-100px)] w-full items-center justify-center bg-lime-50 p-4">
      <Card className="p-10 text-center bg-white border border-lime-200 shadow-lg">
        <CardHeader className="p-0 flex flex-col items-center">
          <CheckCircle2 className="h-16 w-16 text-lime-600 mb-4" />
          <CardTitle className="text-3xl sm:text-4xl font-bold text-lime-900 mb-2">
            Payment Successful!
          </CardTitle>
          <p className="text-lg text-lime-700">Thank you for your purchase.</p>
        </CardHeader>
        <Button
          className="mt-6 bg-lime-700 hover:bg-lime-800 text-white transition-colors"
          onClick={() => navigate("/shop/account")}
        >
          View Orders
        </Button>
      </Card>
    </div>
  );
});

PaymentSuccessPage.displayName = 'PaymentSuccessPage';

export default PaymentSuccessPage;