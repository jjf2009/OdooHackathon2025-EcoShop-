import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

function UnauthPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-lime-50 text-lime-900 px-4 text-center">
      <div className="space-y-4">
        <Lock className="h-20 w-20 mx-auto text-lime-600 animate-pulse" />
        <h1 className="text-3xl md:text-5xl font-extrabold text-lime-900">
          Access Denied
        </h1>
        <p className="text-lg text-lime-700 max-w-lg mx-auto">
          Sorry, you do not have permission to view this page. If you believe this is an error, please log in with an authorized account.
        </p>
        <Link to="/auth/login">
          <Button className="mt-6 bg-lime-700 text-white hover:bg-lime-800 transition-colors">
            Go to Login
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default UnauthPage;