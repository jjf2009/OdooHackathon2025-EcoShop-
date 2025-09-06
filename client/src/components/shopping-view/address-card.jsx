import { memo } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

const AddressCard = memo(({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) => {
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer border transition-all duration-300 ${
        selectedId?._id === addressInfo?._id
          ? "border-green-700 bg-green-50 shadow-lg"
          : "border-lime-200 bg-lime-50 hover:border-lime-400"
      }`}
    >
      <CardContent className="grid p-4 gap-3 text-lime-900">
        <Label>
          <span className="font-semibold">Address:</span> {addressInfo?.address}
        </Label>
        <Label>
          <span className="font-semibold">City:</span> {addressInfo?.city}
        </Label>
        <Label>
          <span className="font-semibold">Pincode:</span> {addressInfo?.pincode}
        </Label>
        <Label>
          <span className="font-semibold">Phone:</span> {addressInfo?.phone}
        </Label>
        <Label>
          <span className="font-semibold">Notes:</span> {addressInfo?.notes}
        </Label>
      </CardContent>
      <CardFooter className="p-3 flex justify-between border-t border-lime-200 bg-lime-100 rounded-b-md">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleEditAddress(addressInfo);
          }}
          className="bg-lime-700 text-white hover:bg-lime-800 transition-colors"
        >
          Edit
        </Button>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteAddress(addressInfo);
          }}
          className="bg-red-500 text-white hover:bg-red-600 transition-colors"
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
});

AddressCard.displayName = 'AddressCard';

export default AddressCard;