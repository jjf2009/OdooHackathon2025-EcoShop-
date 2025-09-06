import { filterOptions } from "@/config";
import { Fragment, memo, useCallback } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

const ProductFilter = memo(({ filters, handleFilter }) => {
  const handleCheckedChange = useCallback((keyItem, optionId) => {
    handleFilter(keyItem, optionId);
  }, [handleFilter]);

  return (
    <div className="bg-lime-50 rounded-lg shadow-sm border border-lime-200">
      <div className="p-4 border-b border-lime-200">
        <h2 className="text-lg font-extrabold text-lime-900">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment key={keyItem}>
            <div>
              <h3 className="text-base font-bold text-lime-800">{keyItem}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyItem].map((option) => (
                  <Label
                    key={option.id}
                    className="flex font-medium items-center gap-2 text-lime-700 cursor-pointer hover:text-lime-900 transition-colors"
                  >
                    <Checkbox
                      checked={
                        filters &&
                        filters[keyItem] &&
                        filters[keyItem].includes(option.id)
                      }
                      onCheckedChange={() => handleCheckedChange(keyItem, option.id)}
                      className="border-lime-400 data-[state=checked]:bg-lime-700 data-[state=checked]:border-lime-700"
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator className="bg-lime-200" />
          </Fragment>
        ))}
      </div>
    </div>
  );
});

ProductFilter.displayName = 'ProductFilter';

export default ProductFilter;