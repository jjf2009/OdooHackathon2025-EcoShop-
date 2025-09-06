import { useState, useCallback, memo } from "react";
import Logo from "../../assets/react.svg";

// A simple email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register = memo(() => {
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.displayName.trim()) {
      newErrors.displayName = "Display name is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the error for the current field as the user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }, [errors]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (validateForm()) {
        console.log("Form submitted successfully:", formData);
        alert("Registration successful! Check console for data.");
      } else {
        console.log("Validation failed.");
      }
    },
    [formData, validateForm]
  );

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-lime-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-lime-200">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-lime-100 flex items-center justify-center">
            <img
              src="https://img.icons8.com/plasticine/100/leaf.png"
              alt="Leaf logo"
              className="w-12 h-12"
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-center text-2xl font-semibold text-lime-900 mb-6">
          Create an Account
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Display Name */}
          <div>
            <label htmlFor="displayName" className="block text-lime-800 mb-2">Display Name</label>
            <input
              id="displayName"
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              placeholder="Enter your display name"
              className={`w-full px-4 py-2 rounded-lg bg-lime-100 text-lime-900 border ${
                errors.displayName ? "border-red-500" : "border-lime-300"
              } focus:outline-none focus:ring-2 focus:ring-lime-600`}
            />
            {errors.displayName && <p className="text-red-500 text-sm mt-1">{errors.displayName}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-lime-800 mb-2">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`w-full px-4 py-2 rounded-lg bg-lime-100 text-lime-900 border ${
                errors.email ? "border-red-500" : "border-lime-300"
              } focus:outline-none focus:ring-2 focus:ring-lime-600`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-lime-800 mb-2">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={`w-full px-4 py-2 rounded-lg bg-lime-100 text-lime-900 border ${
                errors.password ? "border-red-500" : "border-lime-300"
              } focus:outline-none focus:ring-2 focus:ring-lime-600`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-lime-800 mb-2">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className={`w-full px-4 py-2 rounded-lg bg-lime-100 text-lime-900 border ${
                errors.confirmPassword ? "border-red-500" : "border-lime-300"
              } focus:outline-none focus:ring-2 focus:ring-lime-600`}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-lime-700 text-white font-semibold hover:bg-lime-800 transition duration-200"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
});

Register.displayName = 'Register';

export default Register;