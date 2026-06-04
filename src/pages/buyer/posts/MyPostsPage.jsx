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
      <div className="mx-auto mt-10 max-w-7xl m-5">

        <section className="relative mb-5 overflow-hidden rounded-2xl border border-[#e5f2dd] bg-[#f9fff6]  p-5">
          <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#0b4a74]/10" />
          <div className="pointer-events-none absolute right-24 top-8 h-14 w-14 rounded-full bg-[#0b4a74]/10" />
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 inline-block rounded-full bg-[#e7f8dd] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#149330]">
                Buyer workspace
              </p>
              <h1 className="text-xl font-extrabold leading-snug text-[#129a2f] md:text-2xl">My posts, waiting for offers</h1>
              <p className="mt-1 text-sm text-slate-600">
                Manage your trade posts and track their status.
              </p>
            </div>
            <div className=" p-3 sm:block">
              <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/shopping-cart-loaded.png" alt="shopping-cart-loaded" />            </div>
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
