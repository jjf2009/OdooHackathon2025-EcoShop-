import Logo from "../../assets/react.svg";

function Register() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-purple-900 p-4">
      <div className="w-full max-w-md bg-black/40 backdrop-blur-md rounded-2xl shadow-xl p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
            <img src={Logo} alt="React logo" className="w-12 h-12" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-center text-2xl font-semibold text-white mb-6">
          Sign Up
        </h1>

        {/* Form */}
        <form className="space-y-5">
          {/* Display Name */}
          <div>
            <label className="block text-gray-300 mb-2">Display Name</label>
            <input
              type="text"
              placeholder="Enter your display name"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-300 mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
