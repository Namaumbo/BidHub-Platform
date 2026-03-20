import { useEffect, useMemo, useState } from "react"
import { BriefcaseBusiness, Globe, List, LocateFixed, MapPin, Search, SlidersHorizontal } from "lucide-react"
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

const requirements = [
    {
        id: "1",
        category: "Creative",
        title: "Custom Brand Identity for Tech Startup",
        description:
            "Looking for an experienced designer to build a complete visual language including logo, color palette, and social templates.",
        location: "San Francisco, CA (2.4 miles)",
        due: "Due in 5 days",
        budgetLabel: "$1.2k - $2.5k",
        coordinates: [-15.7850, 35.0085],
    },
    {
        id: "2",
        category: "Maintenance",
        title: "Office HVAC Maintenance and Filter Replacement",
        description: "Quarterly maintenance needed for our small office. Need someone licensed and insured to check three rooftop units.",
        location: "Palo Alto, CA (12.1 miles)",
        due: "Urgent",
        budgetLabel: "$300 - $500",
        coordinates: [-15.7906, 35.0073],
    },
    {
        id: "3",
        category: "Development",
        title: "E-commerce Mobile App Development",
        description: "We need a Flutter developer to build our consumer-facing mobile app. Must have experience with Stripe and Firebase.",
        location: "Oakland, CA (5.8 miles)",
        due: "Due in 14 days",
        budgetLabel: "$5,000+",
        coordinates: [-15.6785, 34.9737],
    },
    {
        id: "4",
        category: "Writing",
        title: "Technical Documentation for API",
        description: "Seeking a technical writer to document our new REST API. Familiarity with Swagger/OpenAPI is required.",
        location: "Berkeley, CA (8.1 miles)",
        due: "Due in 2 days",
        budgetLabel: "$50 - $100/hr",
        coordinates: [37.8715, -122.273],
    },
]

const getCategoryClass = (category) => {
    if (category === "Creative") return "bg-blue-100 text-blue-700"
    if (category === "Maintenance") return "bg-emerald-100 text-emerald-700"
    if (category === "Development") return "bg-purple-100 text-purple-700"
    return "bg-orange-100 text-orange-700"
}

const createPriceIcon = (label, isSelected) =>
    L.divIcon({
        className: "",
        html: `<div style="
            background:${isSelected ? "#0b4a74" : "#ffffff"};
            color:${isSelected ? "#ffffff" : "#334155"};
            border:1px solid ${isSelected ? "rgba(11,74,116,0.25)" : "rgba(148,163,184,0.45)"};
            border-radius:9999px;
            padding:6px 10px;
            font-size:11px;
            font-weight:700;
            line-height:1;
            box-shadow:0 1px 3px rgba(15,23,42,0.15);
            white-space:nowrap;
            transform:${isSelected ? "scale(1.05)" : "scale(1)"};
        ">${label}</div>`,
        iconSize: [90, 28],
        iconAnchor: [45, 14],
    })

const SelectedRequirementFlyTo = ({ selectedRequirement }) => {
    const map = useMap()

    useEffect(() => {
        if (!selectedRequirement?.coordinates) return
        map.flyTo(selectedRequirement.coordinates, Math.max(map.getZoom(), 10), {
            duration: 0.5,
        })
    }, [map, selectedRequirement])

    return null
}

const BidmapPage = () => {
    const [selectedId, setSelectedId] = useState(requirements[0].id)
    const [mapInstance, setMapInstance] = useState(null)
    const selectedRequirement = useMemo(
        () => requirements.find((item) => item.id === selectedId) ?? requirements[0],
        [selectedId]
    )

    return (
        <div className="w-full p-4 md:p-6">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-100">
                <header className="border-b border-slate-100 px-4 py-4 md:px-6">
                    <div className="flex flex-wrap items-center gap-4">
                        <div>
                            <h1 className="text-xl font-bold text-slate-900">MarketLink</h1>
                            <p className="text-xs text-slate-500">Browse Requirements</p>
                        </div>
                        <nav className="flex items-center gap-4 text-sm text-slate-500">
                            <button type="button" className="font-semibold text-[#0b4a74]">
                                Browse Requirements
                            </button>
                            <button type="button" className="hover:text-slate-700">My Proposals</button>
                            <button type="button" className="hover:text-slate-700">Dashboard</button>
                        </nav>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                        <label className="relative min-w-[250px] flex-1">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search for jobs (e.g. Logo Design, Plumbing)"
                                className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-[#0b4a74]/40 focus:ring-2 focus:ring-[#0b4a74]/15"
                            />
                        </label>

                        <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5">
                            <button
                                type="button"
                                className="rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm"
                            >
                                Local
                            </button>
                            <button type="button" className="rounded-md px-3 py-1.5 text-xs font-semibold text-slate-500">
                                Global
                            </button>
                        </div>

                        <div className="ml-auto flex items-center gap-2">
                            <button
                                type="button"
                                className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                            >
                                <List className="h-3.5 w-3.5" />
                                List
                            </button>
                            <button
                                type="button"
                                className="inline-flex items-center gap-1 rounded-md border border-[#0b4a74]/20 bg-[#0b4a74]/10 px-2.5 py-1.5 text-xs font-semibold text-[#0b4a74]"
                            >
                                <MapPin className="h-3.5 w-3.5" />
                                Map
                            </button>
                            <button
                                type="button"
                                className="inline-flex items-center gap-1 rounded-md bg-[#0b4a74] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#083754]"
                            >
                                <SlidersHorizontal className="h-3.5 w-3.5" />
                                Filters
                            </button>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-[420px_minmax(0,1fr)]">
                    <aside className="border-r border-slate-100 bg-white">
                        <div className="flex items-center justify-between px-4 py-4 md:px-5">
                            <h2 className="text-base font-bold text-slate-900">124 Requirements near you</h2>
                            <button
                                type="button"
                                className="text-xs font-medium text-slate-500 hover:text-slate-700"
                            >
                                Sorted by: Newest
                            </button>
                        </div>

                        <div className="max-h-[70vh] space-y-3 overflow-y-auto px-4 pb-5 md:px-5">
                            {requirements.map((item) => {
                                const isSelected = item.id === selectedId
                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => setSelectedId(item.id)}
                                        className={`w-full rounded-xl border p-4 text-left ring-1 transition ${
                                            isSelected
                                                ? "border-[#0b4a74]/30 bg-[#0b4a74]/5 ring-[#0b4a74]/20"
                                                : "border-slate-200 bg-white ring-slate-100 hover:border-[#0b4a74]/25 hover:ring-[#0b4a74]/10"
                                        }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <span
                                                className={`inline-flex rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${getCategoryClass(item.category)}`}
                                            >
                                                {item.category}
                                            </span>
                                            <span className="ml-auto text-xs font-bold text-slate-700">
                                                {item.budgetLabel}
                                            </span>
                                        </div>
                                        <h3 className="mt-3 text-sm font-bold text-slate-900">{item.title}</h3>
                                        <p className="mt-1.5 line-clamp-2 text-xs text-slate-500">{item.description}</p>
                                        <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                                            <span className="inline-flex items-center gap-1">
                                                <MapPin className="h-3.5 w-3.5" />
                                                {item.location}
                                            </span>
                                            <span className="inline-flex items-center gap-1">
                                                <BriefcaseBusiness className="h-3.5 w-3.5" />
                                                {item.due}
                                            </span>
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    </aside>

                    <section className="relative min-h-[600px] overflow-hidden bg-slate-50">
                        <MapContainer
                            center={selectedRequirement.coordinates}
                            zoom={10}
                            minZoom={4}
                            maxZoom={18}
                            scrollWheelZoom
                            className="h-full min-h-[600px] w-full"
                            whenReady={(event) => setMapInstance(event.target)}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            <SelectedRequirementFlyTo selectedRequirement={selectedRequirement} />

                            {requirements.map((item) => {
                                const isSelected = item.id === selectedId
                                return (
                                    <Marker
                                        key={item.id}
                                        position={item.coordinates}
                                        icon={createPriceIcon(item.budgetLabel, isSelected)}
                                        eventHandlers={{
                                            click: () => setSelectedId(item.id),
                                        }}
                                    />
                                )
                            })}
                        </MapContainer>

                        <div className="absolute left-1/2 top-5 z-10 -translate-x-1/2">
                            <button
                                type="button"
                                onClick={() => mapInstance?.flyTo(selectedRequirement.coordinates, mapInstance.getZoom())}
                                className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
                            >
                                <LocateFixed className="h-3.5 w-3.5" />
                                Search this area
                            </button>
                        </div>

                        <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
                            <button
                                type="button"
                                onClick={() => mapInstance?.zoomIn()}
                                className="h-8 w-8 rounded-md border border-slate-200 bg-white text-lg font-bold text-slate-600 shadow-sm hover:bg-slate-50"
                                aria-label="Zoom in"
                            >
                                +
                            </button>
                            <button
                                type="button"
                                onClick={() => mapInstance?.zoomOut()}
                                className="h-8 w-8 rounded-md border border-slate-200 bg-white text-lg font-bold text-slate-600 shadow-sm hover:bg-slate-50"
                                aria-label="Zoom out"
                            >
                                -
                            </button>
                        </div>

                        <div className="absolute bottom-4 left-4 z-10 rounded-lg border border-slate-200 bg-white/90 px-3 py-2 text-xs text-slate-600 shadow-sm backdrop-blur">
                            <p className="font-semibold text-slate-700">{selectedRequirement.title}</p>
                            <p className="mt-0.5 inline-flex items-center gap-1">
                                <Globe className="h-3.5 w-3.5" />
                                {selectedRequirement.location}
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default BidmapPage