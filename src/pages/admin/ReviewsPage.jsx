import { useEffect, useMemo, useState } from "react"
import AdminDataTable from "@/features/admin/components/AdminDataTable"
import AdminDetailPanel from "@/features/admin/components/AdminDetailPanel"
import AdminFilterBar from "@/features/admin/components/AdminFilterBar"
import AdminPageHeader from "@/features/admin/components/AdminPageHeader"
import AdminSectionCard from "@/features/admin/components/AdminSectionCard"
import AdminStatusBadge from "@/features/admin/components/AdminStatusBadge"
import AdminStatCard from "@/features/admin/components/AdminStatCard"
import { useAdminCollection } from "@/features/admin/components/useAdminCollection"
import { getAdminReviewById, listAdminReviews, updateAdminReviewStatus } from "@/core/services/admin/adminDataSource"

export default function AdminReviewsPage() {
  const { data, filters, setFilters, isLoading, error, setData } = useAdminCollection(listAdminReviews, {
    search: "",
    status: "",
    flagged: "",
  })
  const [selectedId, setSelectedId] = useState("")
  const [selectedReview, setSelectedReview] = useState(null)

  useEffect(() => {
    if (!data.items.length) return
    setSelectedId((current) => current || data.items[0].id)
  }, [data.items])

  useEffect(() => {
    if (!selectedId) return
    getAdminReviewById(selectedId).then(setSelectedReview)
  }, [selectedId])

  const columns = useMemo(
    () => [
      { key: "subjectName", label: "Subject" },
      { key: "authorName", label: "Author" },
      { key: "rating", label: "Rating", render: (row) => `${row.rating}/5` },
      { key: "status", label: "Status", render: (row) => <AdminStatusBadge value={row.status} /> },
      { key: "createdLabel", label: "Created" },
    ],
    [],
  )

  async function handleStatusChange(status) {
    const updated = await updateAdminReviewStatus(selectedId, { status, reason: "Moderated from admin UI" })
    setSelectedReview(updated)
    setData((current) => ({
      ...current,
      items: current.items.map((item) => (item.id === selectedId ? { ...item, status: updated.status } : item)),
    }))
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader eyebrow="Reviews" title="Moderate marketplace reputation signals." description="Resolve flags, hide harmful content, and keep buyer and seller review data trustworthy." />
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <AdminStatCard label="Published" value={data.summary?.published ?? 0} />
        <AdminStatCard label="Flagged" value={data.summary?.flagged ?? 0} tone="warning" />
        <AdminStatCard label="Hidden" value={data.summary?.hidden ?? 0} tone="danger" />
      </section>
      <AdminSectionCard title="Review moderation queue" subtitle="Prioritize flagged content, but keep the full review stream accessible.">
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
                  { label: "Published", value: "published" },
                  { label: "Flagged", value: "flagged" },
                  { label: "Hidden", value: "hidden" },
                ],
              },
              {
                key: "flagged",
                value: filters.flagged,
                onChange: (flagged) => setFilters((current) => ({ ...current, flagged })),
                options: [
                  { label: "All records", value: "" },
                  { label: "Flagged only", value: "true" },
                  { label: "Not flagged", value: "false" },
                ],
              },
            ]}
          />
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.4fr_0.8fr]">
            <AdminDataTable columns={columns} rows={data.items} isLoading={isLoading} onRowClick={(row) => setSelectedId(row.id)} selectedId={selectedId} />
            {selectedReview ? (
              <AdminDetailPanel
                title={selectedReview.subjectName}
                subtitle={`Reviewed by ${selectedReview.authorName}`}
                sections={[
                  {
                    title: "Review",
                    rows: [
                      { label: "Rating", value: `${selectedReview.rating}/5` },
                      { label: "Created", value: selectedReview.createdLabel },
                      { label: "Excerpt", value: selectedReview.excerpt },
                    ],
                  },
                  {
                    title: "Moderation",
                    rows: [
                      { label: "Status", value: selectedReview.status.replaceAll("_", " ") },
                      { label: "Flagged", value: selectedReview.flagged ? "Yes" : "No" },
                      { label: "Reason", value: selectedReview.flagReason || "None" },
                    ],
                  },
                ]}
                actions={[
                  <button key="publish" type="button" onClick={() => handleStatusChange("published")} className="rounded-xl bg-[var(--admin-primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--admin-primary-hover)]">Publish</button>,
                  <button key="flag" type="button" onClick={() => handleStatusChange("flagged")} className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 hover:bg-amber-100">Keep flagged</button>,
                  <button key="hide" type="button" onClick={() => handleStatusChange("hidden")} className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100">Hide</button>,
                ]}
              />
            ) : null}
          </div>
        </div>
      </AdminSectionCard>
    </div>
  )
}
