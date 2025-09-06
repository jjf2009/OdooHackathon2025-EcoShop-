import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages } from "@/store/common-slice";
import { useEffect, useState, memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const AdminDashboard = memo(() => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const { toast } = useToast();

  const handleUploadFeatureImage = useCallback(() => {
    if (!uploadedImageUrl) {
      toast({
        title: "Please upload an image first.",
        variant: "destructive",
      });
      return;
    }

    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
        toast({
          title: "Image uploaded successfully!",
        });
      }
    });
  }, [dispatch, uploadedImageUrl, toast]);

  const handleDeleteImage = useCallback(async (imageId) => {
    // You'll need a new action in your Redux slice for this
    // dispatch(deleteFeatureImage(imageId)).then((data) => {
    //   if (data?.payload?.success) {
    //     dispatch(getFeatureImages());
    //     toast({
    //       title: "Image deleted successfully!",
    //     });
    //   }
    // });
    toast({
      title: "Delete functionality is not yet implemented.",
      variant: "destructive",
    });
  }, [dispatch, toast]);


  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <Card className="bg-lime-50 border-lime-200">
      <CardHeader className="border-b border-lime-200">
        <CardTitle className="text-lime-900">Feature Image Upload</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <ProductImageUpload
          imageFile={imageFile}
          setImageFile={setImageFile}
          uploadedImageUrl={uploadedImageUrl}
          setUploadedImageUrl={setUploadedImageUrl}
          setImageLoadingState={setImageLoadingState}
          imageLoadingState={imageLoadingState}
          isCustomStyling={true}
        />
        <Button 
          onClick={handleUploadFeatureImage} 
          className="mt-5 w-full bg-lime-700 hover:bg-lime-800 text-white"
          disabled={!uploadedImageUrl || imageLoadingState}
        >
          {imageLoadingState ? "Uploading..." : "Upload"}
        </Button>
        <div className="flex flex-col gap-4 mt-5">
          {featureImageList && featureImageList.length > 0 ? (
            featureImageList.map((featureImgItem) => (
              <div key={featureImgItem._id} className="relative group overflow-hidden rounded-lg shadow-md">
                <img
                  src={featureImgItem.image}
                  className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
                  alt="Feature product"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleDeleteImage(featureImgItem._id)}
                >
                  <Trash className="w-5 h-5" />
                </Button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No feature images uploaded yet.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
});

AdminDashboard.displayName = 'AdminDashboard';

export default AdminDashboard;