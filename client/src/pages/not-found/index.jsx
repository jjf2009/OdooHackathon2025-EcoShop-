import { memo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = memo(() => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-lime-50 text-lime-900 px-4">
      <div className="text-center space-y-4">
        <h1 className="text-6xl md:text-8xl font-extrabold text-lime-800">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold">Page Not Found</h2>
        <p className="text-lg text-lime-700 max-w-lg mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <Link to="/shop/home">
          <Button className="mt-6 bg-lime-700 text-white hover:bg-lime-800 transition-colors">
            Go to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
});

NotFound.displayName = 'NotFound';

export default NotFound;