import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef, memo } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

const ProductImageUpload = memo(({
  imageFile,
  setImageFile,
  imageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) => {
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/products/upload-image",
        data
      );
      if (response?.data?.success) {
        setUploadedImageUrl(response.data.result.url);
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      // Handle error, e.g., show a toast
    } finally {
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div
      className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}
    >
      <Label className="text-lg font-semibold mb-2 block text-lime-900">Upload a Product Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${
          isEditMode ? "opacity-60" : ""
        } border-2 border-dashed rounded-lg p-4 border-lime-400 transition-colors`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode ? "cursor-not-allowed" : ""
            } flex flex-col items-center justify-center h-32 cursor-pointer transition-colors`}
          >
            <UploadCloudIcon className="w-10 h-10 text-lime-600 mb-2" />
            <span className="text-lime-800">Drag & drop or click to upload photo</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-20 w-full bg-lime-100 rounded-lg animate-pulse" />
        ) : (
          <div className="flex items-center justify-between p-2 bg-lime-50 rounded-lg border border-lime-200">
            <div className="flex items-center flex-1 overflow-hidden">
              <FileIcon className="w-6 h-6 text-lime-700 mr-2 flex-shrink-0" />
              <p className="text-sm font-medium text-lime-900 truncate">
                {imageFile.name}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-red-500 transition-colors"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
});

ProductImageUpload.displayName = 'ProductImageUpload';

export default ProductImageUpload;