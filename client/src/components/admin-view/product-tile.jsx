import { memo } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

const AdminProductTile = memo(({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) => {
  // Destructuring props ensures that React.memo performs an effective shallow comparison.
  const { title, image, price, salePrice, _id } = product || {};

  return (
    <Card className="w-full max-w-sm mx-auto border-lime-300 bg-lime-50 shadow-md transition-shadow duration-300 hover:shadow-lg">
      <div>
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="w-full h-[300px] object-cover rounded-t-lg border-b border-lime-200"
          />
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2 mt-2 text-lime-900 truncate">
            {title}
          </h2>
          <div className="flex justify-between items-center mb-2">
            {/* Standard Price: Muted green, line-through if there's a sale price */}
            <span
              className={`${
                salePrice > 0 ? "line-through text-lime-600" : "text-lime-800"
              } text-lg font-semibold transition-colors`}
            >
              ${price}
            </span>
            {/* Sale Price: Bold, vibrant green */}
            {salePrice > 0 ? (
              <span className="text-xl font-extrabold text-green-700">
                ${salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center border-t border-lime-200 p-4">
          <Button
            className="bg-lime-700 text-white hover:bg-lime-800 transition-colors"
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(_id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button
            className="bg-red-500 text-white hover:bg-red-600 transition-colors"
            onClick={() => handleDelete(_id)}
          >
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
});

AdminProductTile.displayName = 'AdminProductTile';

export default AdminProductTile;