import { Link } from "react-router-dom"
import {
  CalendarDays,
  ChevronRight,
  MapPin,
  MessageCircle,
  PackagePlus,
  Scale,
  Trash2,
  Truck,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/context/AuthContext"
import { useCategories } from "@/core/hooks/useCategories"
import { useDeleteInquiry, useMyInquiries } from "@/core/hooks/useInquiries"
import { mapInquiryToPostCard } from "@/core/mappers/inquiryMapper"

const statusStyles = {
  open: "bg-emerald-100 text-emerald-700",
  reviewing: "bg-blue-100 text-blue-700",
  completed: "bg-slate-100 text-slate-600",
}

const statusLabel = {
  open: "Open",
  reviewing: "Reviewed",
  completed: "Completed",
}

const MyPostsPage = () => {
  const { userId } = useAuth()
  const { data: categories = [] } = useCategories()
  const { data: inquiries = [], isLoading, error } = useMyInquiries(userId)
  const deleteInquiry = useDeleteInquiry()

  const categoryMap = Object.fromEntries(categories.map((category) => [category.id, category.name]))
  const postedRequirements = inquiries.map((inquiry) =>
    mapInquiryToPostCard(inquiry, categoryMap[inquiry.category_id] || ""),
  )

  const stats = {
    total: postedRequirements.length,
    open: postedRequirements.filter((item) => item.status === "open").length,
    reviewing: postedRequirements.filter((item) => item.status === "reviewing").length,
    offers: postedRequirements.reduce((total, item) => total + item.offersCount, 0),
  }

  const handleDelete = async (inquiryId) => {
    if (!window.confirm("Delete this requirement?")) return
    try {
      await deleteInquiry.mutateAsync(inquiryId)
    } catch (err) {
      window.alert(err?.message || "Unable to delete requirement.")
    }
  }

  return (
    <div className="md:mx-auto max-w-7xl  mt-3 p-5 md:p-0 md:m-5 md:mt-8">

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">My Requirements</h1>
          <p className="mt-1 text-[13px] text-slate-500 hidden md:block">
            Professional overview of all requirements you have posted so far.
          </p>
        </div>
        <Link
          to="/buyer/post-requirement"
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#0EA432] px-4 py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-[#0b8f2b]"
        >
          <PackagePlus className="h-4 w-4" />
          Post New
        </Link>
      </div>

      {isLoading ? (
        <div className="rounded-2xl bg-white p-8 text-center ring-1 ring-slate-200 text-sm text-slate-500">
          Loading your requirements...
        </div>
      ) : error ? (
        <div className="rounded-2xl bg-red-50 p-8 text-center ring-1 ring-red-200 text-sm text-red-600">
          {error.message || "Unable to load requirements."}
        </div>
      ) : postedRequirements.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 text-center ring-1 ring-slate-200">
          <p className="text-sm text-slate-600">You have not posted any requirements yet.</p>
          <Link
            to="/buyer/post-requirement"
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-[#0EA432] px-4 py-2.5 text-[13px] font-bold text-white"
          >
            Post your first requirement
          </Link>
        </div>
      ) : (
      <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-6 xl:grid-cols-[1fr_320px]">

        <section>
          <div className="space-y-3">
            {postedRequirements.map((post) => (
              <article
                key={post.id}
                className="rounded-2xl bg-white ring-1 ring-slate-200 transition-all hover:ring-[#0EA432] hover:ring-2 overflow-hidden"
              >
                <div className="flex gap-0">
                  <div className="flex-1 min-w-0 p-3.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">REQ-{post.id}</p>
                          <h3 className="mt-0.5 text-[14px] font-semibold text-slate-900 leading-snug line-clamp-2">{post.title}</h3>
                          <p className="mt-0.5 text-[12px] text-slate-500 line-clamp-1 hidden md:block">{post.description}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDelete(post.id)}
                          disabled={deleteInquiry.isPending}
                          className="shrink-0 flex h-7 w-7 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-400 hover:bg-red-100 transition-colors disabled:opacity-50"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-1.5">
                        <span className="hidden md:inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600">
                          <MapPin className="h-3 w-3 text-[#0EA432]" />
                          {post.location}
                        </span>
                        <span className="hidden md:inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600">
                          <Truck className="h-3 w-3 text-[#0EA432]" />
                          {post.expectedDelivery}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600">
                          <CalendarDays className="h-3 w-3 text-slate-400" />
                          {post.postedAt}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 bg-slate-50 px-4 py-2.5 flex flex-wrap items-center gap-3">
                  <p className="text-[11px] font-semibold text-slate-500 mr-1">Bids from:</p>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0EA432]/10 px-2.5 py-1 text-[11px] font-semibold text-[#0EA432]">
                    <svg className="h-3 w-3" viewBox="0 0 16 16" fill="currentColor">
                      <circle cx="8" cy="8" r="7" opacity=".2" /><path d="M5 8.5h6M8 5.5v6" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" />
                    </svg>
                    <span className="hidden md:inline">BidHub · </span> {post.bidSources.bidhub}
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366]/10 px-2.5 py-1 text-[11px] font-semibold text-[#128C7E]">
                    <MessageCircle className="h-3 w-3" />
                    <span className="hidden md:inline">WhatsApp</span>{post.bidSources.whatsapp}
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1877F2]/10 px-2.5 py-1 text-[11px] font-semibold text-[#1877F2]">
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.269h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                    </svg>
                    <span className="hidden md:inline">Facebook · </span> {post.bidSources.facebook}
                  </span>

                  <span className="hidden md:inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600">
                    {post.offersCount > 0 && (
                      <Badge>
                        {post.offersCount} offers
                      </Badge>
                    )}
                  </span>
                  <div className="ml-auto flex items-center gap-2">
                    <Link
                      to="/buyer/bids"
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      View Bids
                      <ChevronRight className="h-3 w-3" />
                    </Link>
                    <Link
                      to="/buyer/post-requirement"
                      className="hidden md:inline-flex items-center gap-1 rounded-lg bg-[#0EA432] px-2.5 py-1.5 text-[11px] font-semibold text-white hover:bg-[#0b8f2b] transition-colors"
                    >
                      Repost
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="mt-6 space-y-4 lg:mt-0 lg:sticky lg:top-4 lg:self-start">
          <section className="rounded-2xl bg-white ring-1 ring-slate-200 overflow-hidden">
            <div className="border-b border-slate-100 px-4 py-3 flex items-center justify-between">
              <h3 className="text-[15px] font-medium text-slate-900">My Active Posts</h3>
              <span className="text-[12px] text-slate-400">{stats.open} open</span>
            </div>
            <div className="divide-y divide-slate-50">
              {postedRequirements.filter((p) => p.status !== "completed").map((post) => (
                <div key={post.id} className="flex items-center gap-3 px-4 py-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-slate-800 truncate leading-snug">{post.title}</p>
                    <p className="text-[12px] text-slate-400 mt-0.5">
                      <span className="font-semibold text-[#0EA432]">{post.offersCount}</span> offers received
                    </p>
                  </div>
                  <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${statusStyles[post.status] || statusStyles.open}`}>
                    {statusLabel[post.status] || post.status}
                  </span>
                </div>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-slate-100">
              <Link to="/buyer/post-requirement">
                <button className="w-full flex items-center justify-center gap-1.5 bg-[#0EA432] text-white text-[13px] font-bold py-2.5 rounded-xl hover:bg-[#0b8f2b] transition-colors">
                  + Post New Requirement
                </button>
              </Link>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
            <h3 className="text-[15px] font-medium text-slate-900 mb-3">Tips for Better Offers</h3>
            <div className="space-y-2.5">
              {[
                "Add exact delivery location and preferred timeline.",
                "Include product grade/specification to avoid low-quality quotes.",
                "Attach photos or documents to improve supplier trust.",
              ].map((tip) => (
                <div key={tip} className="flex items-start gap-2">
                  <Scale className="mt-0.5 h-3.5 w-3.5 text-[#0EA432] shrink-0" />
                  <p className="text-[13px] text-slate-500">{tip}</p>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
      )}
    </div>
  )
}

export default MyPostsPage
