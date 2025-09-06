import { useState, useEffect, useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProductDetails, setProductDetails } from "@/store/shop/products-slice";
import {
  getSearchResults,
  resetSearchResults,
} from "@/store/shop/search-slice";
import { Leaf } from "lucide-react";

const SearchProducts = memo(() => {
  const [keyword, setKeyword] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { searchResults } = useSelector((state) => state.shopSearch);
  const { productDetails } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { toast } = useToast();

  const handleAddtoCart = useCallback(
    (getCurrentProductId, getTotalStock) => {
      if (!user) {
        toast({
          title: "You must be logged in to add to cart.",
          variant: "destructive",
        });
        return;
      }

      const getCartItems = cartItems.items || [];
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
    [dispatch, user, cartItems, toast]
  );

  const handleGetProductDetails = useCallback(
    (getCurrentProductId) => {
      dispatch(fetchProductDetails(getCurrentProductId));
    },
    [dispatch]
  );

  const handleDialogClose = useCallback(() => {
    setOpenDetailsDialog(false);
    dispatch(setProductDetails(null));
  }, [dispatch]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (keyword && keyword.trim().length > 3) {
        setSearchParams(new URLSearchParams({ keyword }));
        dispatch(getSearchResults(keyword));
      } else {
        setSearchParams({});
        dispatch(resetSearchResults());
      }
    }, 500); // Debounce time for search

    return () => clearTimeout(timerId);
  }, [keyword, setSearchParams, dispatch]);

  useEffect(() => {
    if (productDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [productDetails]);

  return (
    <div className="container mx-auto md:px-6 px-4 py-8 min-h-screen bg-lime-50 text-lime-900">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            value={keyword}
            name="keyword"
            onChange={(event) => setKeyword(event.target.value)}
            className="py-6 bg-white border-lime-300 text-lime-900 placeholder:text-lime-700 focus:ring-lime-600"
            placeholder="Search Products..."
          />
        </div>
      </div>
      {keyword.length > 3 && !searchResults.length ? (
        <div className="text-center text-gray-500">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-lime-800 mb-4">
            No Results Found
          </h1>
          <p className="text-lg">
            Sorry, we couldn't find any products matching your search. Try a different keyword.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {searchResults.map((item) => (
            <ShoppingProductTile
              key={item._id}
              handleAddtoCart={handleAddtoCart}
              product={item}
              handleGetProductDetails={handleGetProductDetails}
            />
          ))}
        </div>
      )}
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={handleDialogClose}
        productDetails={productDetails}
      />
    </div>
  );
});

SearchProducts.displayName = 'SearchProducts';

export default SearchProducts;