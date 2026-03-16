import { Navigate, Route, Routes } from "react-router-dom"
import LoginPage from "@/pages/login/LoginPage"
import WelcomePage from "@/pages/welcome/WelcomePage"
import ReviewsPage from "@/pages/reviews/ReviewsPage"
import ProtectedRoute from "@/router/ProtectedRoute"
import AppLayout from "@/components/layout/AppLayout"
import DashboardPage from "@/pages/dashboard/DashboardPage"
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>
    </Routes>
  )
}
