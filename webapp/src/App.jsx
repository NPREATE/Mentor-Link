import HomePage from "./Page/HomePage"
import SignInPage from "./Page/SignIn"
import SignUpPage from "./Page/SignUp"
import ProfilePage from "./Page/ProfilePage"

import AuthProvider from "./ContextAPI/AuthProvider"
// 1. Import ProtectedRoute
import ProtectedRoute from "./ContextAPI/ProtectedRoute" 

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Các Route công khai */}
          <Route path="/" element={<SignInPage />} />
          <Route path="/SignInPage" element={<SignInPage />} />
          <Route path="/SignUpPage" element={<SignUpPage />} />

          {/* Các Route được bảo vệ
            Bọc các trang cần đăng nhập bằng ProtectedRoute 
          */}
          <Route 
            path="/HomePage" 
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/ProfilePage" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App