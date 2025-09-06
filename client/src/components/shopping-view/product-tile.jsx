import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState, memo, useCallback } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";

const ProductDetailsDialog = memo(({ open, setOpen, productDetails }) => {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);

  const { toast } = useToast();

  const handleRatingChange = useCallback((getRating) => {
    setRating(getRating);
  }, []);

  const handleAddToCart = useCallback(
    (getCurrentProductId, getTotalStock) => {
      const getCartItems = cartItems.items || [];
      if (getCartItems.length) {
        const indexOfCurrentItem = getCartItems.findIndex(
          (item) => item.productId === getCurrentProductId
        );
        if (indexOfCurrentItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast({
              title: `Only ${getQuantity} quantity can be added for this item`,
              variant: "destructive",
            });
            return;
          }
        }
      }
      dispatch(
        addToCart({
          userId: user?.id,
          productId: getCurrentProductId,
          quantity: 1,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchCartItems(user?.id));
          toast({
            title: "Product is added to cart",
          });
        }
      });
    },
    [cartItems, dispatch, user?.id, toast]
  );

  const handleDialogClose = useCallback(() => {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  }, [setOpen, dispatch]);

  const handleAddReview = useCallback(() => {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast({
          title: "Review added successfully!",
        });
      }
    });
  }, [dispatch, productDetails, user, reviewMsg, rating, toast]);

  useEffect(() => {
    if (productDetails !== null) {
      dispatch(getReviews(productDetails?._id));
    }
  }, [productDetails, dispatch]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] bg-lime-50 text-lime-900 border-lime-200">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover rounded-md"
          />
        </div>
        <div className="flex flex-col h-full">
          <div className="flex-grow">
            <h1 className="text-3xl font-extrabold text-lime-950">
              {productDetails?.title}
            </h1>
            <p className="text-lime-700 text-lg mb-4 mt-2">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p
                className={`text-3xl font-bold ${
                  productDetails?.salePrice > 0 ? "line-through text-lime-600" : "text-lime-800"
                }`}
              >
                ${productDetails?.price}
              </p>
              {productDetails?.salePrice > 0 ? (
                <p className="text-2xl font-bold text-green-700">
                  ${productDetails?.salePrice}
                </p>
              ) : null}
            </div>
            <div className="flex items-center gap-2">
              <StarRatingComponent rating={averageReview} />
              <span className="text-lime-700">({averageReview.toFixed(2)})</span>
            </div>
            <div className="mt-5 mb-5">
              {productDetails?.totalStock === 0 ? (
                <Button className="w-full opacity-60 cursor-not-allowed bg-red-500 hover:bg-red-600">
                  Out of Stock
                </Button>
              ) : (
                <Button
                  className="w-full bg-lime-700 text-white hover:bg-lime-800"
                  onClick={() =>
                    handleAddToCart(
                      productDetails?._id,
                      productDetails?.totalStock
                    )
                  }
                >
                  Add to Cart
                </Button>
              )}
            </div>
            <Separator className="bg-lime-200" />
            <div className="max-h-[300px] overflow-auto pr-2">
              <h2 className="text-xl font-bold my-4 text-lime-950">Reviews</h2>
              <div className="grid gap-6">
                {reviews && reviews.length > 0 ? (
                  reviews.map((reviewItem) => (
                    <div key={reviewItem?._id} className="flex gap-4 p-2 bg-lime-100 rounded-md">
                      <Avatar className="w-10 h-10 border border-lime-300 bg-lime-200">
                        <AvatarFallback className="bg-lime-200 text-lime-800 font-bold">
                          {reviewItem?.userName[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-lime-900">{reviewItem?.userName}</h3>
                        </div>
                        <div className="flex items-center gap-0.5">
                          <StarRatingComponent rating={reviewItem?.reviewValue} />
                        </div>
                        <p className="text-lime-800 text-sm">
                          {reviewItem.reviewMessage}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <h1 className="text-center text-gray-500">No Reviews yet.</h1>
                )}
              </div>
              <div className="mt-10 flex-col flex gap-2">
                <Label className="text-lg font-semibold text-lime-900">Write a review</Label>
                <div className="flex gap-1">
                  <StarRatingComponent
                    rating={rating}
                    handleRatingChange={handleRatingChange}
                  />
                </div>
                <Input
                  name="reviewMsg"
                  value={reviewMsg}
                  onChange={(event) => setReviewMsg(event.target.value)}
                  placeholder="Write a review..."
                  className="border-lime-300 focus-visible:ring-lime-700/50"
                />
                <Button
                  onClick={handleAddReview}
                  disabled={!user || reviewMsg.trim() === "" || rating === 0}
                  className="bg-lime-700 text-white hover:bg-lime-800"
                >
                  Submit
                </Button>
                {!user && <p className="text-red-500 text-sm">You must be logged in to write a review.</p>}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});

ProductDetailsDialog.displayName = 'ProductDetailsDialog';

export default ProductDetailsDialog;