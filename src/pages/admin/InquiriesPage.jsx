import { useEffect, useMemo, useState } from "react"
import AdminDataTable from "@/features/admin/components/AdminDataTable"
import AdminDetailPanel from "@/features/admin/components/AdminDetailPanel"
import AdminFilterBar from "@/features/admin/components/AdminFilterBar"
import AdminPageHeader from "@/features/admin/components/AdminPageHeader"
import AdminSectionCard from "@/features/admin/components/AdminSectionCard"
import AdminStatusBadge from "@/features/admin/components/AdminStatusBadge"
import AdminStatCard from "@/features/admin/components/AdminStatCard"
import { useAdminCollection } from "@/features/admin/components/useAdminCollection"
import { getAdminInquiryById, listAdminInquiries, updateAdminInquiryStatus } from "@/core/services/admin/adminDataSource"

export default function AdminInquiriesPage() {
  const { data, filters, setFilters, isLoading, error, setData } = useAdminCollection(listAdminInquiries, {
    search: "",
    status: "",
    categoryId: "",
  })
  const [selectedId, setSelectedId] = useState("")
  const [selectedInquiry, setSelectedInquiry] = useState(null)

  useEffect(() => {
    if (!data.items.length) return
    setSelectedId((current) => current || data.items[0].id)
  }, [data.items])

  useEffect(() => {
    if (!selectedId) return
    getAdminInquiryById(selectedId).then(setSelectedInquiry)
  }, [selectedId])

  const columns = useMemo(
    () => [
      { key: "title", label: "Inquiry", render: (row) => <div><p className="font-semibold text-[var(--admin-text)]">{row.title}</p><p className="text-xs text-[var(--admin-text-muted)]">{row.categoryName}</p></div> },
      { key: "buyerName", label: "Buyer" },
      { key: "status", label: "Status", render: (row) => <AdminStatusBadge value={row.status} /> },
      { key: "visibility", label: "Visibility", render: (row) => <AdminStatusBadge value={row.visibility} /> },
      { key: "bidCount", label: "Bids" },
    ],
    [],
  )

  async function handleStatusChange(status) {
    const updated = await updateAdminInquiryStatus(selectedId, { status, reason: "Moderated from admin UI" })
    setSelectedInquiry(updated)
    setData((current) => ({
      ...current,
      items: current.items.map((item) => (item.id === selectedId ? { ...item, status: updated.status } : item)),
    }))
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader eyebrow="Inquiries" title="Oversee buyer inquiries across the marketplace." description="Moderate visibility, close problematic listings, and inspect bid activity before issues spread." />
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <AdminStatCard label="Visible" value={data.summary?.visible ?? 0} />
        <AdminStatCard label="Hidden" value={data.summary?.hidden ?? 0} tone="danger" />
        <AdminStatCard label="Flagged" value={data.summary?.flagged ?? 0} tone="warning" />
      </section>
      <AdminSectionCard title="Inquiry moderation" subtitle="Filter the inquiry stream, then inspect one record in detail.">
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
                  { label: "Open", value: "open" },
                  { label: "Under review", value: "under_review" },
                  { label: "Closed", value: "closed" },
                ],
              },
            ]}
          />
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.4fr_0.8fr]">
            <AdminDataTable columns={columns} rows={data.items} isLoading={isLoading} onRowClick={(row) => setSelectedId(row.id)} selectedId={selectedId} />
            {selectedInquiry ? (
              <AdminDetailPanel
                title={selectedInquiry.title}
                subtitle={`${selectedInquiry.categoryName} • ${selectedInquiry.location}`}
                sections={[
                  {
                    title: "Overview",
                    rows: [
                      { label: "Buyer", value: selectedInquiry.buyerName },
                      { label: "Created", value: selectedInquiry.createdLabel },
                      { label: "Status", value: selectedInquiry.status.replaceAll("_", " ") },
                      { label: "Bid count", value: selectedInquiry.bidCount },
                    ],
                  },
                  {
                    title: "Moderation",
                    rows: [
                      { label: "Visibility", value: selectedInquiry.visibility },
                      { label: "Flagged", value: selectedInquiry.flagged ? "Yes" : "No" },
                    ],
                  },
                ]}
                actions={[
                  <button key="open" type="button" onClick={() => handleStatusChange("open")} className="rounded-xl bg-[var(--admin-primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--admin-primary-hover)]">Reopen</button>,
                  <button key="review" type="button" onClick={() => handleStatusChange("under_review")} className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 hover:bg-amber-100">Under review</button>,
                  <button key="close" type="button" onClick={() => handleStatusChange("closed")} className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100">Close</button>,
                ]}
              />
            ) : null}
          </div>
        </div>
      </AdminSectionCard>
    </div>
  )
}
