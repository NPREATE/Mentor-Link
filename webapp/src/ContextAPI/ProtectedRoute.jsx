import { Navigate } from "react-router-dom";
import useAuth from "./UseAuth"; // Import hook useAuth

function parseJwtPayload(token) {
    try {
        const base64Url = token.split('.')[1];
        if (!base64Url) return null;
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const json = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(json);
    } catch (e) {
        return null;
    }
}

export default function ProtectedRoute({ children }) {

    const { user, isLoading, signOut } = useAuth(); // Dùng hook useAuth

    if (isLoading) return null;

    if (!user) {
        return <Navigate to='/SignInPage' replace />;
    }

    const token = (() => {
        try { return localStorage.getItem('token'); } catch (e) { return null; }
    })();

    if (!token) {
        return <Navigate to='/SignInPage' replace />;
    }

    const payload = parseJwtPayload(token);
    if (!payload || typeof payload.exp === 'undefined') {
        try { signOut(); } catch (e) { localStorage.removeItem('token'); }
        return <Navigate to='/SignInPage' replace />;
    }

    const nowSec = Math.floor(Date.now() / 1000);
    if (payload.exp <= nowSec) {
        try { signOut(); } catch (e) {
            try { localStorage.removeItem('token'); } catch (e) {}
        }
        return <Navigate to='/SignInPage' replace />;
    }

    return children;
}