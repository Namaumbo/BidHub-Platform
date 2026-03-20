import { Navigate, Route, Routes } from "react-router-dom"
import LoginPage from "@/pages/login/LoginPage"
import WelcomePage from "@/pages/welcome/WelcomePage"
import ReviewsPage from "@/pages/reviews/ReviewsPage"
import ProtectedRoute from "@/router/ProtectedRoute"
import AppLayout from "@/components/layout/AppLayout"
import DashboardPage from "@/pages/dashboard/DashboardPage"
import BidsPage from "@/pages/bids/BidsPage"
import MyPostsPage from "@/pages/posts/MyPostsPage"
import MessagesPage from "@/pages/messages/MessagesPage"

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/my-posts" element={<MyPostsPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/bids" element={<BidsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>
    </Routes>
  )
}
