import HomePage from "./Page/HomePage"
import SignInPage from "./Page/SignIn"
import SignUpPage from "./Page/SignUp"
import ProfilePage from "./Page/ProfilePage"
import AuthProvider from "./ContextAPI/AuthProvider"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/SignInPage" element={<SignInPage />} />
          <Route path="/SignUpPage" element={<SignUpPage />} />
          <Route path="/ProfilePage" element={<ProfilePage />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
