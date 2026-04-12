import { useEffect, useState } from "react"
import AdminPageHeader from "@/features/admin/components/AdminPageHeader"
import AdminSectionCard from "@/features/admin/components/AdminSectionCard"
import AdminStatCard from "@/features/admin/components/AdminStatCard"
import { getAdminDashboardSummary } from "@/core/services/admin/adminDataSource"

export default function AdminDashboardPage() {
  const [summary, setSummary] = useState({ stats: [], alerts: [], recentActivity: [] })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function loadSummary() {
      try {
        const response = await getAdminDashboardSummary()
        if (active) setSummary(response)
      } finally {
        if (active) setIsLoading(false)
      }
    }

    loadSummary()
    return () => {
      active = false
    }
  }, [])

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Admin Control"
        title="Platform oversight for trust, traffic, and moderation."
        description="Monitor marketplace health, resolve moderation queues, and keep categories and users in a clean operational state."
      />

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-3">
        {(isLoading ? Array.from({ length: 6 }, (_, index) => ({ label: "Loading", value: "...", tone: "primary", id: index })) : summary.stats).map((stat) => (
          <AdminStatCard key={stat.id || stat.label} label={stat.label} value={stat.value} tone={stat.tone} to={stat.to} />
        ))}
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.3fr_0.9fr]">
        <AdminSectionCard title="Attention queue" subtitle="Items the admin team should act on first.">
          <div className="space-y-4">
            {summary.alerts.map((alert) => (
              <div key={alert.id} className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface-muted)] p-4">
                <p className="font-semibold text-[var(--admin-text)]">{alert.title}</p>
                <p className="mt-2 text-sm text-[var(--admin-text-muted)]">{alert.body}</p>
              </div>
            ))}
          </div>
        </AdminSectionCard>

        <AdminSectionCard title="Recent admin activity" subtitle="Latest platform and moderation events.">
          <div className="space-y-4">
            {summary.recentActivity.map((entry) => (
              <div key={entry.id} className="flex items-start gap-3 rounded-2xl border border-[var(--admin-border)] bg-white p-4">
                <div className="mt-1 h-3 w-3 rounded-full bg-[var(--admin-accent-2)]" />
                <div>
                  <p className="font-medium text-[var(--admin-text)]">
                    {entry.actorName} {entry.action.toLowerCase()} <span className="font-semibold">{entry.targetLabel}</span>
                  </p>
                  <p className="mt-1 text-sm text-[var(--admin-text-muted)]">{entry.createdLabel}</p>
                </div>
              </div>
            ))}
          </div>
        </AdminSectionCard>
      </div>
    </div>
  )
}
