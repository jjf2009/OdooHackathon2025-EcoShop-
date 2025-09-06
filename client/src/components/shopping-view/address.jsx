import { useEffect, useState, memo, useCallback, useMemo } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editaAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice";
import AddressCard from "./address-card";
import { useToast } from "../ui/use-toast";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

const Address = memo(({ setCurrentSelectedAddress, selectedId }) => {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const { toast } = useToast();

  const handleManageAddress = useCallback(
    async (event) => {
      event.preventDefault();

      if (addressList.length >= 3 && currentEditedId === null) {
        setFormData(initialAddressFormData);
        toast({
          title: "You can add a maximum of 3 addresses",
          variant: "destructive",
        });
        return;
      }

      const action =
        currentEditedId !== null
          ? editaAddress({
              userId: user?.id,
              addressId: currentEditedId,
              formData,
            })
          : addNewAddress({ ...formData, userId: user?.id });

      const result = await dispatch(action);

      if (result?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        if (currentEditedId !== null) {
          setCurrentEditedId(null);
        }
        setFormData(initialAddressFormData);
        toast({
          title: `Address ${currentEditedId !== null ? "updated" : "added"} successfully`,
        });
      }
    },
    [addressList, currentEditedId, formData, user, dispatch, toast]
  );

  const handleDeleteAddress = useCallback(
    async (getCurrentAddress) => {
      const result = await dispatch(
        deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
      );
      if (result?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        toast({
          title: "Address deleted successfully",
        });
      }
    },
    [user, dispatch, toast]
  );

  const handleEditAddress = useCallback((getCuurentAddress) => {
    setCurrentEditedId(getCuurentAddress?._id);
    setFormData({
      address: getCuurentAddress?.address,
      city: getCuurentAddress?.city,
      phone: getCuurentAddress?.phone,
      pincode: getCuurentAddress?.pincode,
      notes: getCuurentAddress?.notes,
    });
  }, [setFormData, setCurrentEditedId]);

  const isFormValid = useMemo(() => {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }, [formData]);

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch, user?.id]);

  return (
    <Card className="bg-lime-50 border-lime-200">
      <CardHeader className="p-4 border-b border-lime-200">
        <CardTitle className="text-lime-900">
          {currentEditedId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          {addressList && addressList.length > 0 ? (
            addressList.map((singleAddressItem) => (
              <AddressCard
                key={singleAddressItem._id}
                selectedId={selectedId}
                handleDeleteAddress={handleDeleteAddress}
                addressInfo={singleAddressItem}
                handleEditAddress={handleEditAddress}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 sm:col-span-2">No addresses found.</p>
          )}
        </div>
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId !== null ? "Edit" : "Add"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid}
        />
      </CardContent>
    </Card>
  );
});

Address.displayName = 'Address';

export default Address;