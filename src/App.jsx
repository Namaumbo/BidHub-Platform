import { Navigate, Route, Routes } from "react-router-dom"
import LoginPage from "@/pages/login/LoginPage"
import ReviewsPage from "@/pages/buyer/reviews/ReviewsPage"
import ProtectedRoute from "@/router/ProtectedRoute"
import RoleRoute from "@/router/RoleRoute"
import AppLayout from "@/components/layout/AppLayout"
import DashboardPage from "@/pages/buyer/dashboard/DashboardPage"
import BidsPage from "@/pages/buyer/bids/BidsPage"
import MyPostsPage from "@/pages/buyer/posts/MyPostsPage"
import BidmapPage from "@/pages/buyer/bidsmap/BidmapPage"
import PostRequirementPage from "@/pages/buyer/posts/PostRequirementPage"
import { ROLES } from "@/core/constants/roles"
import SellPage from "./pages/bidder/sell/SellPage"
import RequestsPage from "./pages/bidder/request/RequestsPage"
import MessagesPage from "./pages/bidder/messages/MessagesPage"
import BidderDashboardPage from "./pages/bidder/dashboard/DashboardPage"

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>

          {/* /dashboard auto-redirects to the role-specific path */}
          {/* <Route path="/dashboard" element={<RoleDashboardRedirect />} /> */}

          <Route element={<RoleRoute allowedRoles={[ROLES.ADMIN]} />}>
            <Route path="/admin/dashboard" element={<DashboardPage />} />
          </Route>

          <Route element={<RoleRoute allowedRoles={[ROLES.BUYER]} />}>
            <Route path="/buyer/dashboard" element={<DashboardPage />} />
            <Route path="/buyer/my-posts" element={<MyPostsPage />} />
            <Route path="/buyer/post-requirement" element={<PostRequirementPage />} />
            <Route path="/buyer/bids" element={<BidsPage />} />
            <Route path="/buyer/bids-map" element={<BidmapPage />} />
            <Route path="/buyer/reviews" element={<ReviewsPage />} />
            <Route path="/messages" element={<MessagesPage />} />
          </Route>


          <Route element={<RoleRoute allowedRoles={[ROLES.SELLER]} />}>
            <Route path="/seller/dashboard" element={<BidderDashboardPage />} />
            <Route path="/seller/my-posts" element={<RequestsPage />} />
            <Route path="/seller/sell-requirement" element={<SellPage />} />
            <Route path="/seller/messages" element={<MessagesPage />} />
          </Route>


        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>
    </Routes>
  )
}
