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

const commodityLowPrices = [
  { category: "Construction Materials", commodity: "Cement 42.5R", price: "MWK 18,500 / bag" },
  { category: "Construction Materials", commodity: "River Sand", price: "MWK 75,000 / ton" },
  { category: "Agriculture", commodity: "Yellow Maize", price: "MWK 720 / kg" },
  { category: "Agriculture", commodity: "Urea Fertilizer", price: "MWK 45,000 / 50kg" },
  { category: "Transport", commodity: "5-Ton Truck (LLW-BT)", price: "MWK 190,000 / trip" },
  { category: "Office", commodity: "Mesh Office Chair", price: "MWK 95,000 / unit" },
]

const postedRequirements = [
  {
    id: "REQ-9921",
    title: "Portland Cement OPC 42.5 — 200 Bags",
    category: "Construction Materials",
    quantity: "200",
    unit: "Bags",
    location: "Lilongwe",
    budgetRange: "MWK 3,200,000 - 3,900,000",
    status: "open",
    offersCount: 12,
    postedAt: "2 days ago",
    expectedDelivery: "Within 5 days",
    description: "Need verified supplier with standard quality certification and split delivery option.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=200&h=200&fit=crop",
    bidSources: { bidhub: 7, whatsapp: 3, facebook: 2 },
  }
]

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
  const selectedCategories = [...new Set(postedRequirements.map((item) => item.category))]
  const selectedCategoryPrices = commodityLowPrices.filter((item) => selectedCategories.includes(item.category))

  const stats = {
    total: postedRequirements.length,
    open: postedRequirements.filter((item) => item.status === "open").length,
    reviewing: postedRequirements.filter((item) => item.status === "reviewing").length,
    offers: postedRequirements.reduce((total, item) => total + item.offersCount, 0),
  }

  return (
    <div className="md:mx-auto max-w-7xl  mt-3 p-5 md:p-0 md:m-5 md:mt-8">

      {/* Page header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-medium text-slate-900">My Posted Requirements</h1>
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

      {/* Market price marquee */}
      {/* <section className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 px-4 py-3">
          <h2 className="text-[13px] font-medium text-slate-900">Market Prices — Your Categories</h2>
          <p className="mt-0.5 text-[12px] text-slate-400">
            Current low price highlights based on your posted categories.
          </p>
        </div>
        <marquee behavior="scroll" direction="left" scrollamount="6" className="py-3">
          <div className="inline-flex items-center gap-6 px-4">
            {selectedCategoryPrices.map((item) => (
              <span key={`${item.category}-${item.commodity}`} className="inline-flex items-center gap-2 whitespace-nowrap">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0EA432]" aria-hidden />
                <span className="text-[12px] font-bold uppercase tracking-wide text-slate-600">{item.category}:</span>
                <span className="text-[12px] font-medium text-slate-700">{item.commodity}</span>
                <span className="text-[12px] font-bold text-[#0EA432]">{item.price}</span>
              </span>
            ))}
          </div>
        </marquee>
      </section> */}

      <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-6 xl:grid-cols-[1fr_320px]">

        {/* ── Requirement list ── */}
        <section>
          <div className="space-y-3">
            {postedRequirements.map((post) => (
              <article
                key={post.id}
                className="rounded-2xl bg-white ring-1 ring-slate-200 transition-all hover:ring-[#0EA432] hover:ring-2 overflow-hidden"
              >
                {/* ── Main row: image + details ── */}
                <div className="flex gap-0">
                  {/* Details */}
                  <div className="flex-1 min-w-0 p-3.5 flex flex-col justify-between">
                    <div>
                      {/* Top row */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{post.id}</p>
                          <h3 className="mt-0.5 text-[14px] font-semibold text-slate-900 leading-snug line-clamp-2">{post.title}</h3>
                          <p className="mt-0.5 text-[12px] text-slate-500 line-clamp-1 hidden md:block">{post.description}</p>
                        </div>
                        <button
                          type="button"
                          className="shrink-0 flex h-7 w-7 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-400 hover:bg-red-100 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Meta chips */}
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

                {/* ── Bid sources strip ── */}
                <div className="border-t border-slate-100 bg-slate-50 px-4 py-2.5 flex flex-wrap items-center gap-3">
                  <p className="text-[11px] font-semibold text-slate-500 mr-1">Bids from:</p>

                  {/* BidHub */}
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0EA432]/10 px-2.5 py-1 text-[11px] font-semibold text-[#0EA432]">
                    <svg className="h-3 w-3" viewBox="0 0 16 16" fill="currentColor">
                      <circle cx="8" cy="8" r="7" opacity=".2" /><path d="M5 8.5h6M8 5.5v6" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" />
                    </svg>
                    <span className="hidden md:inline">BidHub · </span> {post.bidSources.bidhub}
                  </span>

                  {/* WhatsApp */}
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366]/10 px-2.5 py-1 text-[11px] font-semibold text-[#128C7E]">
                    <MessageCircle className="h-3 w-3" />
                    <span className="hidden md:inline">WhatsApp</span>{post.bidSources.whatsapp}
                  </span>

                  {/* Facebook */}
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
                  {/* Actions */}
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

        {/* ── Right panel ── */}
        <aside className="mt-6 space-y-4 lg:mt-0 lg:sticky lg:top-4 lg:self-start">

          {/* My Active Posts summary */}
          <section className="rounded-2xl bg-white ring-1 ring-slate-200 overflow-hidden">
            <div className="border-b border-slate-100 px-4 py-3 flex items-center justify-between">
              <h3 className="text-[15px] font-medium text-slate-900">My Active Posts</h3>
              <span className="text-[12px] text-slate-400">{stats.open} open</span>
            </div>
            <div className="divide-y divide-slate-50">
              {postedRequirements.filter(p => p.status !== "completed").map((post) => (
                <div key={post.id} className="flex items-center gap-3 px-4 py-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-slate-800 truncate leading-snug">{post.title}</p>
                    <p className="text-[12px] text-slate-400 mt-0.5">
                      <span className="font-semibold text-[#0EA432]">{post.offersCount}</span> offers received
                    </p>
                  </div>
                  <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${statusStyles[post.status]}`}>
                    {statusLabel[post.status]}
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

          {/* Tips */}
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
    </div>
  )
}

export default MyPostsPage
