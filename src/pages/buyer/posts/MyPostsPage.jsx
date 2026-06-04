import { Link } from "react-router-dom"
import {
  CalendarDays,
  ChevronRight,
  ClipboardList,
  MapPin,
  PackagePlus,
  Scale,
  Truck,
} from "lucide-react"

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
    description:
      "Need verified supplier with standard quality certification and split delivery option.",
  },
  {
    id: "REQ-8840",
    title: "Office Chairs — Mesh Back × 10 Units",
    category: "Office",
    quantity: "10",
    unit: "Units",
    location: "Mzuzu",
    budgetRange: "MWK 850,000 - 1,050,000",
    status: "reviewing",
    offersCount: 5,
    postedAt: "5 days ago",
    expectedDelivery: "Within 7 days",
    description:
      "Priority on ergonomic support, warranty period, and delivery to our office location.",
  },
  {
    id: "REQ-7102",
    title: "5-Ton Truck — Lilongwe to Blantyre",
    category: "Transport",
    quantity: "1",
    unit: "Trip",
    location: "Lilongwe to Blantyre",
    budgetRange: "MWK 170,000 - 220,000",
    status: "completed",
    offersCount: 8,
    postedAt: "2 weeks ago",
    expectedDelivery: "Completed",
    description:
      "Requirement fulfilled successfully with on-time pickup and signed delivery confirmation.",
  },
  {
    id: "REQ-6504",
    title: "Maize Flour (Ufa) — 50kg Bags × 100",
    category: "Agriculture",
    quantity: "100",
    unit: "Bags",
    location: "Kasungu",
    budgetRange: "MWK 4,000,000 - 4,400,000",
    status: "open",
    offersCount: 9,
    postedAt: "1 day ago",
    expectedDelivery: "Within 3 days",
    description:
      "Looking for wholesale suppliers with consistent stock and quality assurance documentation.",
  },
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
    <div className="mx-auto max-w-7xl m-5 mt-8">

      {/* Page header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-medium text-slate-900">My Posted Requirements</h1>
          <p className="mt-1 text-[13px] text-slate-500">
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
      <section className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
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
      </section>

      <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-6 xl:grid-cols-[1fr_320px]">

        {/* ── Requirement list ── */}
        <section>
          <h2 className="text-[20px] font-medium text-slate-900 mb-4">Requirement List</h2>

          <div className="space-y-3">
            {postedRequirements.map((post) => (
              <article
                key={post.id}
                className="rounded-2xl bg-white p-4 ring-1 ring-slate-200 transition-all hover:ring-[#0EA432] hover:ring-2"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded-lg bg-slate-100 px-2 py-1 text-[11px] font-bold text-slate-600">{post.id}</span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${statusStyles[post.status]}`}
                    >
                      {statusLabel[post.status]}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[12px] text-slate-400">
                    <CalendarDays className="h-3.5 w-3.5" />
                    Posted {post.postedAt}
                  </span>
                </div>

                <h3 className="mt-2 text-[15px] font-medium text-slate-900">{post.title}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-slate-500">{post.description}</p>

                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {[
                    { label: "Category", value: post.category },
                    { label: "Quantity", value: `${post.quantity} ${post.unit}` },
                    { label: "Budget Range", value: post.budgetRange },
                    { label: "Offers Received", value: post.offersCount, highlight: true },
                  ].map((field) => (
                    <div key={field.label} className="rounded-xl bg-slate-50 px-2.5 py-2">
                      <p className="text-[11px] font-medium text-slate-400">{field.label}</p>
                      <p className={`mt-0.5 text-[13px] font-bold ${field.highlight ? "text-[#0EA432]" : "text-slate-800"}`}>
                        {field.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-3 text-[12px] text-slate-400">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {post.location}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Truck className="h-3.5 w-3.5" />
                      {post.expectedDelivery}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      to="/buyer/bids"
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-[12px] font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      View Offers
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                    <Link
                      to="/buyer/post-requirement"
                      className="inline-flex items-center gap-1 rounded-lg bg-[#0EA432]/10 px-2.5 py-1.5 text-[12px] font-semibold text-[#0EA432] hover:bg-[#0EA432]/15 transition-colors"
                    >
                      Duplicate
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

          {/* How BidHub Works */}
          <section className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
            <h3 className="text-[15px] font-medium text-slate-900 mb-4">How BidHub Works</h3>
            <div>
              {[
                { n: "1", t: "Post what you need", d: "Tell us what to buy — we send it to suppliers." },
                { n: "2", t: "Suppliers send offers", d: "Receive price quotes from verified local sellers." },
                { n: "3", t: "Pick the best price", d: "Compare and choose who to buy from." },
              ].map((step, i, arr) => (
                <div key={step.n} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="h-7 w-7 shrink-0 rounded-full bg-[#0EA432] flex items-center justify-center">
                      <span className="text-white text-[11px] font-bold">{step.n}</span>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="w-px border-l-2 border-dashed border-[#0EA432]/25 my-1" style={{ minHeight: "28px" }} />
                    )}
                  </div>
                  <div className={i < arr.length - 1 ? "pb-4" : ""}>
                    <p className="text-[13px] font-medium text-slate-800">{step.t}</p>
                    <p className="text-[12px] text-slate-400 mt-0.5 leading-relaxed">{step.d}</p>
                  </div>
                </div>
              ))}
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
