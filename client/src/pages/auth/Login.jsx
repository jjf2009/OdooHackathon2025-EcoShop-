import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Leaf } from "lucide-react"; // Using a leaf icon from lucide-react

const initialState = {
  email: "",
  password: "",
};

const loginValidationRules = {
  email: {
    required: true,
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Please enter a valid email address.",
  },
  password: {
    required: true,
    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    message: "Password must be at least 8 characters, include uppercase, lowercase, number, and a special character.",
  },
};


function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center flex flex-col items-center">
        {/* Eco-themed logo/icon */}
        <div className="p-3 bg-lime-50 rounded-full mb-4">
          <Leaf className="h-12 w-12 text-lime-700" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-lime-900">
          Welcome back to EcoShop
        </h1>
        <p className="mt-2 text-lime-800">
          Give pre-loved items a new life.
          <Link
            className="font-medium ml-2 text-lime-700 hover:text-lime-900 transition-colors"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
       <CommonForm
    formControls={loginFormControls}
    buttonText={"Sign In"}
    formData={formData}
    setFormData={setFormData}
    onSubmit={onSubmit}
    validationRules={loginValidationRules}
  />
    </div>
  );
}

export default AuthLogin;