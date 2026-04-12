import { useEffect, useMemo, useState } from "react"
import AdminDataTable from "@/features/admin/components/AdminDataTable"
import AdminDetailPanel from "@/features/admin/components/AdminDetailPanel"
import AdminFilterBar from "@/features/admin/components/AdminFilterBar"
import AdminPageHeader from "@/features/admin/components/AdminPageHeader"
import AdminSectionCard from "@/features/admin/components/AdminSectionCard"
import AdminStatusBadge from "@/features/admin/components/AdminStatusBadge"
import AdminStatCard from "@/features/admin/components/AdminStatCard"
import { useAdminCollection } from "@/features/admin/components/useAdminCollection"
import { getAdminUserById, listAdminUsers, updateAdminUserStatus } from "@/core/services/admin/adminDataSource"

export default function AdminUsersPage() {
  const { data, filters, setFilters, isLoading, error, setData } = useAdminCollection(listAdminUsers, {
    search: "",
    role: "",
    status: "",
  })
  const [selectedId, setSelectedId] = useState("")
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    if (!data.items.length) return
    const nextId = data.items.find((item) => item.id === selectedId)?.id || data.items[0].id
    setSelectedId(nextId)
  }, [data.items, selectedId])

  useEffect(() => {
    if (!selectedId) return
    getAdminUserById(selectedId).then(setSelectedUser)
  }, [selectedId])

  const columns = useMemo(
    () => [
      {
        key: "fullName",
        label: "User",
        render: (row) => (
          <div>
            <p className="font-semibold text-[var(--admin-text)]">{row.fullName}</p>
            <p className="text-xs text-[var(--admin-text-muted)]">{row.email}</p>
          </div>
        ),
      },
      { key: "role", label: "Role", render: (row) => <span className="capitalize">{row.role}</span> },
      { key: "status", label: "Status", render: (row) => <AdminStatusBadge value={row.status} /> },
      { key: "verified", label: "Verification", render: (row) => (row.verified ? "Verified" : "Pending") },
      { key: "joinedLabel", label: "Joined" },
    ],
    [],
  )

  async function handleStatusChange(status) {
    const updated = await updateAdminUserStatus(selectedId, { status, reason: "Updated from admin UI" })
    setSelectedUser(updated)
    setData((current) => ({
      ...current,
      items: current.items.map((item) => (item.id === selectedId ? { ...item, status: updated.status } : item)),
    }))
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Users"
        title="Manage buyer, seller, and admin accounts."
        description="Search the marketplace directory, inspect account health, and take moderation or verification actions."
      />

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <AdminStatCard label="Active" value={data.summary?.active ?? 0} />
        <AdminStatCard label="Suspended" value={data.summary?.suspended ?? 0} tone="danger" />
        <AdminStatCard label="Verified" value={data.summary?.verified ?? 0} tone="accent" />
      </section>

      <AdminSectionCard title="User directory" subtitle="Manage all users and the activity.">
        <div className="space-y-4">
          <AdminFilterBar
            searchValue={filters.search}
            onSearchChange={(search) => setFilters((current) => ({ ...current, search }))}
            filters={[
              {
                key: "role",
                value: filters.role,
                onChange: (role) => setFilters((current) => ({ ...current, role })),
                options: [
                  { label: "All roles", value: "" },
                  { label: "Buyer", value: "buyer" },
                  { label: "Seller", value: "seller" },
                  { label: "Admin", value: "admin" },
                ],
              },
              {
                key: "status",
                value: filters.status,
                onChange: (status) => setFilters((current) => ({ ...current, status })),
                options: [
                  { label: "All statuses", value: "" },
                  { label: "Active", value: "active" },
                  { label: "Suspended", value: "suspended" },
                  { label: "Under review", value: "under_review" },
                ],
              },
            ]}
          />

          {error ? <p className="text-sm text-rose-600">{error}</p> : null}

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.4fr_0.8fr]">
            <AdminDataTable columns={columns} rows={data.items} isLoading={isLoading} onRowClick={(row) => setSelectedId(row.id)} selectedId={selectedId} />
            {selectedUser ? (
              <AdminDetailPanel
                title={selectedUser.fullName}
                subtitle={selectedUser.email}
                sections={[
                  {
                    title: "Profile",
                    rows: [
                      { label: "Role", value: selectedUser.role },
                      { label: "Location", value: selectedUser.location },
                      { label: "Joined", value: selectedUser.joinedLabel },
                      { label: "Last active", value: selectedUser.lastActiveLabel },
                    ],
                  },
                  {
                    title: "Activity",
                    rows: [
                      { label: "Inquiries", value: selectedUser.inquiriesCount },
                      { label: "Bids", value: selectedUser.bidsCount },
                      { label: "Reviews", value: selectedUser.reviewsCount },
                      { label: "Status", value: selectedUser.status.replaceAll("_", " ") },
                    ],
                  },
                ]}
                actions={[
                  <button key="activate" type="button" onClick={() => handleStatusChange("active")} className="rounded-xl bg-[var(--admin-primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--admin-primary-hover)]">
                    Activate
                  </button>,
                  <button key="review" type="button" onClick={() => handleStatusChange("under_review")} className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 hover:bg-amber-100">
                    Mark review
                  </button>,
                  <button key="suspend" type="button" onClick={() => handleStatusChange("suspended")} className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100">
                    Suspend
                  </button>,
                ]}
              />
            ) : null}
          </div>
        </div>
      </AdminSectionCard>
    </div>
  )
}
