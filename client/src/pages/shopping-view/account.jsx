import { memo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import accImg from "../../assets/account.jpg";
import Address from "@/components/shopping-view/address";
import ShoppingOrders from "@/components/shopping-view/orders";

const ShoppingAccount = memo(() => {
  return (
    <div className="flex flex-col bg-lime-50 text-lime-900">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src="https://img.icons8.com/plasticine/100/eco-bag.png"
          alt="Eco-friendly shopping bag"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border bg-white p-6 shadow-sm border-lime-200">
          <Tabs defaultValue="orders">
            <TabsList className="bg-lime-100 border-lime-200">
              <TabsTrigger value="orders" className="data-[state=active]:bg-lime-700 data-[state=active]:text-white data-[state=active]:shadow-sm">
                Orders
              </TabsTrigger>
              <TabsTrigger value="address" className="data-[state=active]:bg-lime-700 data-[state=active]:text-white data-[state=active]:shadow-sm">
                Address
              </TabsTrigger>
            </TabsList>
            <TabsContent value="orders" className="mt-4">
              <ShoppingOrders />
            </TabsContent>
            <TabsContent value="address" className="mt-4">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
});

ShoppingAccount.displayName = 'ShoppingAccount';

export default ShoppingAccount;