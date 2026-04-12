import { Navigate, Route, Routes } from "react-router-dom"
import LoginPage from "@/pages/login/LoginPage"
import ReviewsPage from "@/pages/buyer/reviews/ReviewsPage"
import ProtectedRoute from "@/router/ProtectedRoute"
import RoleRoute from "@/router/RoleRoute"
import AppLayout from "@/components/layout/AppLayout"
import BuyerDashboardPage from "@/pages/buyer/dashboard/DashboardPage"
import BuyerBidsPage from "@/pages/buyer/bids/BidsPage"
import MyPostsPage from "@/pages/buyer/posts/MyPostsPage"
import BidmapPage from "@/pages/buyer/bidsmap/BidmapPage"
import PostRequirementPage from "@/pages/buyer/posts/PostRequirementPage"
import { ROLES } from "@/core/constants/roles"
import AdminDashboardPage from "@/pages/admin/DashboardPage"
import AdminUsersPage from "@/pages/admin/UsersPage"
import AdminInquiriesPage from "@/pages/admin/InquiriesPage"
import AdminBidsPage from "@/pages/admin/BidsPage"
import AdminReviewsPage from "@/pages/admin/ReviewsPage"
import AdminCategoriesPage from "@/pages/admin/CategoriesPage"
import AdminActivityPage from "@/pages/admin/ActivityPage"

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route element={<RoleRoute allowedRoles={[ROLES.ADMIN]} />}>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/inquiries" element={<AdminInquiriesPage />} />
            <Route path="/admin/bids" element={<AdminBidsPage />} />
            <Route path="/admin/reviews" element={<AdminReviewsPage />} />
            <Route path="/admin/categories" element={<AdminCategoriesPage />} />
            <Route path="/admin/activity" element={<AdminActivityPage />} />
          </Route>

          <Route element={<RoleRoute allowedRoles={[ROLES.BUYER]} />}>
            <Route path="/buyer/dashboard" element={<BuyerDashboardPage />} />
            <Route path="/buyer/my-posts" element={<MyPostsPage />} />
            <Route path="/buyer/post-requirement" element={<PostRequirementPage />} />
            <Route path="/buyer/bids" element={<BuyerBidsPage />} />
            <Route path="/buyer/bids-map" element={<BidmapPage />} />
            <Route path="/buyer/reviews" element={<ReviewsPage />} />
          </Route>

          <Route element={<RoleRoute allowedRoles={[ROLES.SELLER]} />}>
            <Route path="/seller/dashboard" element={<BuyerDashboardPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>
    </Routes>
  )
}
