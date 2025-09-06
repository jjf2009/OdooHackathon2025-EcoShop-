import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useState, useMemo, memo, useCallback } from "react";
import { Badge } from "../ui/badge";

const CommonForm = memo(({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
  validationRules = {},
}) => {
  const [errors, setErrors] = useState({});

  const validate = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    formControls.forEach((controlItem) => {
      const value = formData[controlItem.name] || "";
      const rules = validationRules[controlItem.name] || {};

      if (rules.required && !value) {
        newErrors[controlItem.name] = `${controlItem.label} is required.`;
        isValid = false;
      }
      
      if (rules.regex && !newErrors[controlItem.name]) {
        if (!rules.regex.test(value)) {
          newErrors[controlItem.name] = rules.message || "Invalid input.";
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [formControls, formData, validationRules]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    if (validate()) {
      onSubmit(event);
    }
  }, [validate, onSubmit]);

  const renderInputsByComponentType = useCallback((getControlItem) => {
    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        return (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({ ...formData, [getControlItem.name]: event.target.value })
            }
            className="border-lime-300 focus:border-lime-700 focus-visible:ring-lime-700/50"
          />
        );
      case "select":
        return (
          <Select
            onValueChange={(val) => setFormData({ ...formData, [getControlItem.name]: val })}
            value={value}
          >
            <SelectTrigger className="w-full border-lime-300 focus:border-lime-700 focus-visible:ring-lime-700/50">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent className="bg-lime-50 border-lime-200">
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
      case "textarea":
        return (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            onChange={(event) =>
              setFormData({ ...formData, [getControlItem.name]: event.target.value })
            }
            className="border-lime-300 focus:border-lime-700 focus-visible:ring-lime-700/50"
          />
        );
      default:
        return (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({ ...formData, [getControlItem.name]: event.target.value })
            }
            className="border-lime-300 focus:border-lime-700 focus-visible:ring-lime-700/50"
          />
        );
    }
  }, [formData, setFormData]);

  const isFormValid = useMemo(() => {
    return Object.keys(errors).length === 0 && !isBtnDisabled;
  }, [errors, isBtnDisabled]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className="mb-1 text-lime-900">{controlItem.label}</Label>
            {renderInputsByComponentType(controlItem)}
            {errors[controlItem.name] && (
              <Badge variant="destructive" className="mt-1">
                {errors[controlItem.name]}
              </Badge>
            )}
          </div>
        ))}
      </div>
      <Button
        disabled={!isFormValid}
        type="submit"
        className="mt-4 w-full bg-lime-700 text-white hover:bg-lime-800 transition-colors"
      >
        {buttonText || "Submit"}
      </Button>
    </form>
  );
});

CommonForm.displayName = 'CommonForm';

export default CommonForm;