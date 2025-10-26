import { Navigate } from "react-router-dom";
import useAuth from "./UseAuth"; // Import hook useAuth

export default function ProtectedRoute ({children}) {
    const { user } = useAuth(); // Dùng hook useAuth
    
    if (!user) {
        return <Navigate to='/SignInPage' replace/>;
    }
    return children;
}