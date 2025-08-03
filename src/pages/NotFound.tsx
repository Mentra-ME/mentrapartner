import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";

const NotFound = () => {
    const location = useLocation();
    const { user } = useAuth();

    useEffect(() => {
        console.error(
            "404 Error: User attempted to access non-existent route:",
            location.pathname
        );
    }, [location.pathname]);


    const returnTo = user
        ? user.user_type === "hospital"
            ? "/dashboard-hospital"
            : "/dashboard"
        : "/login";

    console.log('returnTo: ', returnTo)
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
                <Link to={returnTo} className="text-blue-500 hover:text-blue-700 underline">
                    Return to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
