import { Navigate, Route, Routes } from "react-router-dom"
import LoginPage from "@/pages/login/LoginPage"
import WelcomePage from "@/pages/welcome/WelcomePage"
import ReviewsPage from "@/pages/reviews/ReviewsPage"
import ProtectedRoute from "@/router/ProtectedRoute"

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<WelcomePage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
