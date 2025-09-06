import { useState, useEffect, useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import ProductFilter from "@/components/shopping-view/filter";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

import { sortOptions } from "@/config";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
  setProductDetails,
} from "@/store/shop/products-slice";
import { ArrowUpDownIcon, Leaf } from "lucide-react";

const createSearchParamsHelper = memo((filterParams) => {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  return queryParams.join("&");
});

const ShoppingListing = memo(() => {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);

  const [filters, setFilters] = useState(
    JSON.parse(sessionStorage.getItem("filters")) || {}
  );
  const [sort, setSort] = useState("price-lowtohigh");
  const [, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { toast } = useToast();

  const handleSort = useCallback((value) => {
    setSort(value);
  }, []);

  const handleFilter = useCallback(
    (getSectionId, getCurrentOption) => {
      let cpyFilters = { ...filters };
      const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

      if (indexOfCurrentSection === -1) {
        cpyFilters = {
          ...cpyFilters,
          [getSectionId]: [getCurrentOption],
        };
      } else {
        const indexOfCurrentOption =
          cpyFilters[getSectionId].indexOf(getCurrentOption);
        if (indexOfCurrentOption === -1)
          cpyFilters[getSectionId].push(getCurrentOption);
        else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
      }
      setFilters(cpyFilters);
      sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
    },
    [filters]
  );

  const handleGetProductDetails = useCallback(
    (getCurrentProductId) => {
      dispatch(fetchProductDetails(getCurrentProductId));
    },
    [dispatch]
  );

  const handleAddtoCart = useCallback(
    (getCurrentProductId, getTotalStock) => {
      if (!user) {
        toast({
          title: "You must be logged in to add to cart.",
          variant: "destructive",
        });
        return;
      }

      let getCartItems = cartItems.items || [];
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
    [dispatch, user, cartItems, toast]
  );

  const handleDialogClose = useCallback(() => {
    setOpenDetailsDialog(false);
    dispatch(setProductDetails(null));
  }, [dispatch]);

  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
      );
    }
  }, [dispatch, sort, filters]);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const queryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(queryString));
    }
  }, [filters, setSearchParams]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-lime-50 text-lime-900 p-4 md:p-6 gap-6">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-white w-full rounded-lg shadow-sm border border-lime-200">
        <div className="p-4 border-b border-lime-200 flex flex-col sm:flex-row items-center justify-between">
          <h2 className="text-xl font-extrabold text-lime-950 mb-2 sm:mb-0">
            All Products
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-lime-700 font-semibold">
              {productList?.length || 0} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 bg-white hover:bg-lime-100 text-lime-800 border-lime-300"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px] bg-white border-lime-200 text-lime-800">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                      className="hover:bg-lime-100"
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productList && productList.length > 0 ? (
            productList.map((productItem) => (
              <ShoppingProductTile
                key={productItem._id}
                handleGetProductDetails={handleGetProductDetails}
                product={productItem}
                handleAddtoCart={handleAddtoCart}
              />
            ))
          ) : (
            <div className="col-span-full flex justify-center items-center p-8">
              <div className="text-center text-gray-500">
                <Leaf className="w-12 h-12 mx-auto mb-4 text-lime-600" />
                <p>No products match your search or filter criteria.</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={handleDialogClose}
        productDetails={productDetails}
      />
    </div>
  );
});

ShoppingListing.displayName = 'ShoppingListing';

export default ShoppingListing;