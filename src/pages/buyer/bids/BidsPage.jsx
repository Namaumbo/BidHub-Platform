import { useState } from "react"
import { Link } from "react-router-dom"
import { Building2, ShieldCheck } from "lucide-react"

const bids = [
    {
        id: "1",
        name: "Sony PlayStation 5 Pro",
        specs: ["Game console", "2 TB", "Gray"],
        price: 499.99,
        qty: 1,
        status: "awaiting",
        deliveryTime: "3–5 business days",
        location: "Lilongwe, Malawi",
        submittedOn: "2 Jun 2026",
        thumbnail:
            "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=120&h=120&fit=crop",
        supplier: {
            businessName: "TechVault Supplies Ltd",
            verified: true,
        },
        images: [
            "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&h=560&fit=crop",
            "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=560&fit=crop",
            "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=800&h=560&fit=crop",
            "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&h=560&fit=crop",
        ],
    },
    {
        id: "2",
        name: "Sony PlayStation Portal Remote Player",
        specs: ["Handheld", "1080p", "Black"],
        price: 199.99,
        qty: 1,
        status: "accepted",
        deliveryTime: "5–7 business days",
        location: "Blantyre, Malawi",
        submittedOn: "1 Jun 2026",
        thumbnail:
            "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=120&h=120&fit=crop",
        supplier: {
            businessName: "GameLink Distributors",
            verified: true,
        },
        images: [
            "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=800&h=560&fit=crop",
            "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=560&fit=crop",
            "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&h=560&fit=crop",
        ],
    },
    {
        id: "3",
        name: "Maize Flour (Ufa) — 50kg Bags × 100",
        specs: ["Agriculture", "50 kg", "Grade A"],
        price: 420000,
        qty: 100,
        status: "rejected",
        deliveryTime: "2–3 business days",
        location: "Kasungu, Malawi",
        submittedOn: "30 May 2026",
        thumbnail:
            "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=120&h=120&fit=crop",
        supplier: {
            businessName: "Kasungu Millers Ltd",
            verified: false,
        },
        images: [
            "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=560&fit=crop",
            "https://images.unsplash.com/photo-1559598467-f8b76c8155d0?w=800&h=560&fit=crop",
        ],
    },
]

const statusConfig = {
    awaiting: { label: "Awaiting Review", cls: "bg-amber-100 text-amber-700" },
    accepted: { label: "Accepted", cls: "bg-emerald-100 text-emerald-700" },
    rejected: { label: "Rejected", cls: "bg-red-100 text-red-600" },
}

const detailRows = (bid) => [
    { label: "Total Price", value: `MWK ${bid.price.toLocaleString()}`, highlight: true },
    { label: "Quantity", value: `${bid.qty} unit${bid.qty !== 1 ? "s" : ""}` },
    { label: "Delivery Time", value: bid.deliveryTime },
    { label: "Location", value: bid.location },
    { label: "Submitted On", value: bid.submittedOn },
]

export default function BidsPage() {
    const [selectedId, setSelectedId] = useState(bids[0]?.id ?? null)
    const [activeImg, setActiveImg] = useState(0)

    const selected = bids.find((b) => b.id === selectedId)
    const images = selected?.images ?? []
    const mainImage = images[activeImg] ?? images[0]

    const handleSelect = (id) => {
        setSelectedId(id)
        setActiveImg(0)
    }

    return (
        <div className="flex h-screen overflow-hidden">

            {/* ════ LEFT — Bids list ════ */}
            <div className="flex w-full shrink-0 flex-col border-r border-slate-200 bg-white lg:w-[400px] xl:w-[440px]">

                {/* Header */}
                <div className="border-b border-slate-100 px-5 pt-6 pb-4">
                    <nav className="mb-3 flex items-center gap-1 text-[12px] text-slate-400">
                        <Link to="/buyer/dashboard" className="transition-colors hover:text-[#0f6e56]">
                            Dashboard
                        </Link>
                        <span className="mx-0.5">›</span>
                        <span className="text-slate-600 font-medium">Bids</span>
                    </nav>
                    <div className="flex items-center gap-2.5">
                        <h1 className="text-[22px] font-medium text-slate-900">My Bids</h1>
                        <span className="rounded-full bg-[#e1f5ee] px-2.5 py-0.5 text-[12px] font-semibold text-[#0f6e56]">
                            {bids.length} bids
                        </span>
                    </div>
                </div>

                {/* Cards */}
                <div className="flex-1 overflow-y-auto px-4 py-4">
                    <div className="space-y-2">
                        {bids.map((bid) => {
                            const isSelected = bid.id === selectedId
                            const status = statusConfig[bid.status]
                            return (
                                <button
                                    key={bid.id}
                                    type="button"
                                    onClick={() => handleSelect(bid.id)}
                                    className={[
                                        "w-full rounded-xl border border-slate-200 border-l-[3px] p-3 text-left transition-colors",
                                        "hover:bg-[#f0faf6]",
                                        isSelected
                                            ? "border-l-[#0f6e56] bg-[#f0faf6]"
                                            : "border-l-slate-200",
                                    ].join(" ")}
                                >
                                    <div className="flex gap-3">
                                        {/* Thumbnail */}
                                        <img
                                            src={bid.thumbnail}
                                            alt={bid.name}
                                            className="h-14 w-14 shrink-0 rounded-md object-cover"
                                        />

                                        <div className="min-w-0 flex-1">
                                            {/* Name */}
                                            <p className="truncate text-[15px] font-medium text-slate-900 leading-snug">
                                                {bid.name}
                                            </p>

                                            {/* Spec tags */}
                                            <div className="mt-1.5 flex flex-wrap gap-1">
                                                {bid.specs.map((s) => (
                                                    <span
                                                        key={s}
                                                        className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] text-slate-600"
                                                    >
                                                        {s}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Supplier */}
                                            <div className="mt-1.5 flex items-center gap-1 text-[12px] text-slate-400">
                                                <Building2 className="h-3 w-3 shrink-0" />
                                                <span className="truncate">{bid.supplier.businessName}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom row: price + status */}
                                    <div className="mt-2.5 flex items-center justify-between border-t border-slate-100 pt-2.5">
                                        <span className="text-[17px] font-bold text-[#0f6e56]">
                                            MWK {bid.price.toLocaleString()}
                                        </span>
                                        <span
                                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${status.cls}`}
                                        >
                                            {status.label}
                                        </span>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* ════ RIGHT — Bid detail ════ */}
            <div className="hidden flex-1 flex-col bg-slate-50 lg:flex overflow-hidden">
                {selected ? (
                    <>
                        {/* Detail header */}
                        <div className="border-b border-slate-200 bg-white px-6 py-5 shrink-0">
                            <h2 className="text-[20px] font-medium text-slate-900 leading-snug">
                                {selected.name}
                            </h2>
                            <div className="mt-1.5 flex flex-wrap items-center gap-2">
                                <Building2 className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                                <span className="text-[14px] text-slate-500">
                                    {selected.supplier.businessName}
                                </span>
                                {selected.supplier.verified && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-[#e1f5ee] px-2 py-0.5 text-[10px] font-semibold text-[#0f6e56]">
                                        <ShieldCheck className="h-3 w-3" />
                                        Verified Supplier
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Scrollable body */}
                        <div className="flex-1 overflow-y-auto px-6 py-5">

                            {/* Main image */}
                            <div className="mb-3 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                                <img
                                    key={mainImage}
                                    src={mainImage}
                                    alt={selected.name}
                                    className="h-[280px] w-full object-cover"
                                />
                            </div>

                            {/* Thumbnail strip */}
                            <div className="mb-6 flex gap-2">
                                {images.slice(0, 4).map((src, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => setActiveImg(i)}
                                        className={[
                                            "h-16 w-16 shrink-0 overflow-hidden rounded-md border-2 transition-colors",
                                            i === activeImg
                                                ? "border-[#0f6e56]"
                                                : "border-transparent hover:border-slate-300",
                                        ].join(" ")}
                                        aria-label={`View image ${i + 1}`}
                                    >
                                        <img
                                            src={src}
                                            alt={`${selected.name} view ${i + 1}`}
                                            className="h-full w-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>

                            {/* Details grid */}
                            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                                {detailRows(selected).map((row, i, arr) => (
                                    <div
                                        key={row.label}
                                        className={[
                                            "flex items-center justify-between px-4 py-3",
                                            i < arr.length - 1 ? "border-b border-slate-100" : "",
                                        ].join(" ")}
                                    >
                                        <span className="text-[12px] font-medium uppercase tracking-wide text-slate-400">
                                            {row.label}
                                        </span>
                                        <span
                                            className={[
                                                "text-[14px] font-medium",
                                                row.highlight
                                                    ? "font-bold text-[#0f6e56]"
                                                    : "text-slate-800",
                                            ].join(" ")}
                                        >
                                            {row.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sticky action row */}
                        <div className="shrink-0 border-t border-slate-200 bg-white px-6 py-4">
                            <button
                                type="button"
                                className="flex h-12 w-full items-center justify-center rounded-lg bg-[#0f6e56] text-[15px] font-medium text-white transition-colors hover:bg-[#085041]"
                            >
                                Accept Bid
                            </button>
                            <button
                                type="button"
                                className="mt-2 flex h-12 w-full items-center justify-center rounded-lg border border-[#0f6e56] bg-white text-[15px] font-medium text-[#0f6e56] transition-colors hover:bg-[#e1f5ee]"
                            >
                                Request Changes
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-1 items-center justify-center">
                        <p className="text-[14px] text-slate-400">Select a bid to view details</p>
                    </div>
                )}
            </div>
        </div>
    )
}
