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
  reviewing: "bg-amber-100 text-amber-700",
  completed: "bg-slate-200 text-slate-700",
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
    <div className="mx-auto mt-10 max-w-7xl m-5">
      <section className="relative mb-5 overflow-hidden rounded-2xl border border-[#e5f2dd] bg-[#f9fff6]  p-5">
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#0b4a74]/10" />
        <div className="pointer-events-none absolute right-24 top-8 h-14 w-14 rounded-full bg-[#0b4a74]/10" />
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 inline-block rounded-full bg-[#e7f8dd] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#149330]">
              Buyer workspace
            </p>
            <h1 className="text-xl font-extrabold leading-snug text-[#129a2f] md:text-2xl">My Posted Requirements</h1>
            <p className="mt-1 text-sm text-slate-600">
              Professional overview of all requirements you have posted so far.
            </p>
          </div>
          <div className="p-3 sm:block">
            <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/shopping-cart-loaded.png" alt="shopping-cart-loaded" />
          </div>
        </div>
      </section>

      {/* <div className="mb-5 grid grid-cols-2 gap-2.5 md:grid-cols-4">
        {[
          { label: "Total Posts", value: stats.total },
          { label: "Open", value: stats.open },
          { label: "Reviewing", value: stats.reviewing },
          { label: "Total Offers", value: stats.offers },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-white p-3 text-center shadow-sm ring-1 ring-slate-200">
            <p className="text-lg font-extrabold text-[#0b4a74]">{stat.value}</p>
            <p className="text-[11px] font-medium text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div> */}

      <section className="mb-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-4 py-3">
          <h2 className="text-sm font-bold text-slate-900">Low Price Marquee by Your Categories</h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Market highlights based on categories from your requirements.
          </p>
        </div>
        <marquee behavior="scroll" direction="left" scrollamount="6" className="py-3">
          <div className="inline-flex items-center gap-6 px-4">
            {selectedCategoryPrices.map((item) => (
              <span key={`${item.category}-${item.commodity}`} className="inline-flex items-center gap-2 whitespace-nowrap">
                <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
                <span className="text-xs font-bold uppercase tracking-wide text-slate-700">{item.category}:</span>
                <span className="text-xs font-semibold text-slate-800">{item.commodity}</span>
                <span className="text-xs font-extrabold text-[#0b4a74]">{item.price}</span>
              </span>
            ))}
          </div>
        </marquee>
      </section>

      <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-6 xl:grid-cols-[1fr_320px]">
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Requirement List</h2>
            <Link
              to="/buyer/post-requirement"
              className="inline-flex items-center gap-1 rounded-xl bg-[#0b4a74] px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-[#083754]"
            >
              <PackagePlus className="h-3.5 w-3.5" />
              Post New Requirement
            </Link>
          </div>

          <div className="space-y-3">
            {postedRequirements.map((post) => (
              <article
                key={post.id}
                className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-md"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded-lg bg-slate-100 px-2 py-1 text-[11px] font-bold text-slate-700">{post.id}</span>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${statusStyles[post.status]}`}
                    >
                      {post.status}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                    <CalendarDays className="h-3.5 w-3.5" />
                    Posted {post.postedAt}
                  </span>
                </div>

                <h3 className="mt-2 text-sm font-bold text-slate-900 sm:text-base">{post.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">{post.description}</p>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
                  <div className="rounded-xl bg-slate-50 px-2.5 py-2">
                    <p className="font-semibold text-slate-500">Category</p>
                    <p className="mt-0.5 font-bold text-slate-800">{post.category}</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 px-2.5 py-2">
                    <p className="font-semibold text-slate-500">Quantity</p>
                    <p className="mt-0.5 font-bold text-slate-800">{post.quantity} {post.unit}</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 px-2.5 py-2">
                    <p className="font-semibold text-slate-500">Budget Range</p>
                    <p className="mt-0.5 font-bold text-slate-800">{post.budgetRange}</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 px-2.5 py-2">
                    <p className="font-semibold text-slate-500">Offers Received</p>
                    <p className="mt-0.5 font-bold text-[#0b4a74]">{post.offersCount}</p>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
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
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      View Offers
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                    <Link
                      to="/buyer/post-requirement"
                      className="inline-flex items-center gap-1 rounded-lg bg-[#0b4a74]/10 px-2.5 py-1.5 text-xs font-semibold text-[#0b4a74] hover:bg-[#0b4a74]/15"
                    >
                      Duplicate
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="mt-4 space-y-4 lg:mt-0 lg:sticky lg:top-4 lg:self-start">
          <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <h3 className="text-sm font-bold text-slate-900">Category Focus</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedCategories.map((category) => (
                <span
                  key={category}
                  className="rounded-full bg-[#0b4a74]/10 px-2.5 py-1 text-[11px] font-semibold text-[#0b4a74]"
                >
                  {category}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <h3 className="text-sm font-bold text-slate-900">Tips for Better Offers</h3>
            <div className="mt-3 space-y-3">
              {[
                "Add exact delivery location and preferred timeline.",
                "Include product grade/specification to avoid low-quality quotes.",
                "Attach photos or documents to improve supplier trust.",
              ].map((tip) => (
                <div key={tip} className="flex items-start gap-2">
                  <Scale className="mt-0.5 h-3.5 w-3.5 text-[#0b4a74]" />
                  <p className="text-xs text-slate-600">{tip}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-[#0b4a74]/8 p-4 ring-1 ring-[#0b4a74]/15">
            <p className="text-[11px] font-bold uppercase tracking-wide text-[#0b4a74]">Performance</p>
            <p className="mt-1 text-sm text-[#0b4a74]/90">
              Requirements with complete details receive offers up to 2x faster.
            </p>
          </section>
        </aside>
      </div>
    </div>
  )
}

export default MyPostsPage
