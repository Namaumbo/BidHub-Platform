 import { cn } from "@/lib/utils"
import { PostCardComponent } from "@/components/posts/PostCardComponent"

const tickerItems = [
  { label: "WTI CRUDE", price: "MWK 7245", dot: "bg-amber-500" },
  { label: "COPPER CATHODES", price: "MWK 8421", dot: "bg-orange-600" },
  { label: "YELLOW MAIZE", price: "MWK 182", dot: "bg-yellow-500" },
  { label: "UREA FERTILIZER", price: "MWK 412", dot: "bg-emerald-500" },
  { label: "CEMENT 42.5R", price: "MWK 894", dot: "bg-slate-500" },
]

const posts = [
  {
    id: "EQ-9921",
    status: "awaiting",
    title: "WTI Crude Oil, Grade 1",
    description:
      "Seeking reliable suppliers for benchmark-grade WTI with documented assay and FOB loading windows aligned to our refinery schedule.",
    targetVolume: "500,000 BBL",
    targetPrice: "$71.50 / BBL",
    offersCount: 12,
    offersActive: true,
    imageUrl: null,
  },
  {
    id: "EQ-8840",
    status: "negotiation",
    title: "Grade A Copper Cathodes",
    description:
      "LME-registered cathodes required for smelter feedstock. Certificates of analysis and chain-of-custody documentation mandatory.",
    targetVolume: "2,400 MT",
    targetPrice: "$8,200 / MT",
    offersCount: 3,
    offersActive: false,
    imageUrl: null,
  },
  {
    id: "EQ-7102",
    status: "completed",
    title: "Yellow Maize (Non-GMO)",
    description:
      "Shipment concluded successfully with verified moisture content and phytosanitary clearance for regional distribution.",
    finalVolume: "1,200 MT",
    closedPrice: "$182.20 / MT",
    offersCount: null,
    imageUrl:
      "https://images.unsplash.com/photo-1601593768796-19b0071fc6d2?w=240&h=240&fit=crop",
  },
]

/** Hero metrics — replace with API totals when wired */
const OVERVIEW_STATS = { activePosts: 14, pendingOffers: 42 }

const MyPostsPage = () => {
  return (
    <div className="w-full p-4 md:p-6">
      <div className="w-full p-4 md:p-6 rounded-2xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-100">
        <section className="mb-8 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl space-y-3">

            <h1 className="text-2xl font-extrabold text-slate-900">My Posts</h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage your trade posts and track their status.
            </p>
          </div>

          <div className="grid w-full max-w-md grid-cols-2 gap-3 sm:gap-4 lg:max-w-sm lg:shrink-0">
            <div className="rounded-lg border border-sky-100 bg-sky-50/90 p-4 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-wider text-sky-800/80">Active posts</p>
              <p className="mt-2 text-3xl font-extrabold tabular-nums text-sky-950">{OVERVIEW_STATS.activePosts}</p>
            </div>
            <div className="rounded-lg border border-sky-100 bg-sky-50/90 p-4 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-wider text-sky-800/80">Pending offers</p>
              <p className="mt-2 text-3xl font-extrabold tabular-nums text-sky-950">{OVERVIEW_STATS.pendingOffers}</p>
            </div>
          </div>
        </section>


        {/* makethis a <marquee behavior="" direction=""></marquee> */}
        <div className="mb-8 overflow-hidden rounded-lg border border-slate-200 bg-white py-3 shadow-sm">
          <div className="flex gap-6 overflow-x-auto px-4 pb-1 [scrollbar-width:thin] md:justify-center md:gap-10">
            {tickerItems.map((item) => (
              <div key={item.label} className="flex shrink-0 items-center gap-2 whitespace-nowrap">
                <span className={cn("size-2 shrink-0 rounded-full", item.dot)} aria-hidden />
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-700">{item.label}</span>
                <span className="text-xs font-bold text-slate-900">{item.price}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          {posts.map((post) => (
            <PostCardComponent key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyPostsPage
