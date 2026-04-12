import { useEffect, useMemo, useState } from "react"
import AdminDataTable from "@/features/admin/components/AdminDataTable"
import AdminDetailPanel from "@/features/admin/components/AdminDetailPanel"
import AdminFilterBar from "@/features/admin/components/AdminFilterBar"
import AdminPageHeader from "@/features/admin/components/AdminPageHeader"
import AdminSectionCard from "@/features/admin/components/AdminSectionCard"
import AdminStatusBadge from "@/features/admin/components/AdminStatusBadge"
import AdminStatCard from "@/features/admin/components/AdminStatCard"
import { useAdminCollection } from "@/features/admin/components/useAdminCollection"
import { getAdminBidById, listAdminBids, updateAdminBidStatus } from "@/core/services/admin/adminDataSource"

export default function AdminBidsPage() {
  const { data, filters, setFilters, isLoading, error, setData } = useAdminCollection(listAdminBids, {
    search: "",
    status: "",
  })
  const [selectedId, setSelectedId] = useState("")
  const [selectedBid, setSelectedBid] = useState(null)

  useEffect(() => {
    if (!data.items.length) return
    setSelectedId((current) => current || data.items[0].id)
  }, [data.items])

  useEffect(() => {
    if (!selectedId) return
    getAdminBidById(selectedId).then(setSelectedBid)
  }, [selectedId])

  const columns = useMemo(
    () => [
      { key: "inquiryTitle", label: "Inquiry" },
      { key: "sellerName", label: "Seller" },
      { key: "amountLabel", label: "Bid value" },
      { key: "status", label: "Status", render: (row) => <AdminStatusBadge value={row.status} /> },
      { key: "submittedLabel", label: "Submitted" },
    ],
    [],
  )

  async function handleStatusChange(status) {
    const updated = await updateAdminBidStatus(selectedId, { status, reason: "Moderated from admin UI" })
    setSelectedBid(updated)
    setData((current) => ({
      ...current,
      items: current.items.map((item) => (item.id === selectedId ? { ...item, status: updated.status } : item)),
    }))
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader eyebrow="Bids" title="Inspect seller bids and moderation outcomes." description="Track bid quality, investigate pricing anomalies, and remove non-compliant submissions." />
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <AdminStatCard label="Active" value={data.summary?.active ?? 0} />
        <AdminStatCard label="Flagged" value={data.summary?.flagged ?? 0} tone="warning" />
        <AdminStatCard label="Rejected" value={data.summary?.rejected ?? 0} tone="danger" />
      </section>
      <AdminSectionCard title="Bid oversight" subtitle="Review bids with seller and inquiry context.">
        <div className="space-y-4">
          <AdminFilterBar
            searchValue={filters.search}
            onSearchChange={(search) => setFilters((current) => ({ ...current, search }))}
            filters={[
              {
                key: "status",
                value: filters.status,
                onChange: (status) => setFilters((current) => ({ ...current, status })),
                options: [
                  { label: "All statuses", value: "" },
                  { label: "Active", value: "active" },
                  { label: "Under review", value: "under_review" },
                  { label: "Rejected", value: "rejected" },
                ],
              },
            ]}
          />
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.4fr_0.8fr]">
            <AdminDataTable columns={columns} rows={data.items} isLoading={isLoading} onRowClick={(row) => setSelectedId(row.id)} selectedId={selectedId} />
            {selectedBid ? (
              <AdminDetailPanel
                title={selectedBid.sellerName}
                subtitle={selectedBid.inquiryTitle}
                sections={[
                  {
                    title: "Bid details",
                    rows: [
                      { label: "Amount", value: selectedBid.amountLabel },
                      { label: "Response time", value: `${selectedBid.responseDays} days` },
                      { label: "Submitted", value: selectedBid.submittedLabel },
                      { label: "Status", value: selectedBid.status.replaceAll("_", " ") },
                    ],
                  },
                  {
                    title: "Review status",
                    rows: [
                      { label: "Flagged", value: selectedBid.flagged ? "Yes" : "No" },
                      { label: "Inquiry id", value: selectedBid.inquiryId },
                    ],
                  },
                ]}
                actions={[
                  <button key="active" type="button" onClick={() => handleStatusChange("active")} className="rounded-xl bg-[var(--admin-primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--admin-primary-hover)]">Approve</button>,
                  <button key="review" type="button" onClick={() => handleStatusChange("under_review")} className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 hover:bg-amber-100">Escalate</button>,
                  <button key="reject" type="button" onClick={() => handleStatusChange("rejected")} className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100">Reject</button>,
                ]}
              />
            ) : null}
          </div>
        </div>
      </AdminSectionCard>
    </div>
  )
}
