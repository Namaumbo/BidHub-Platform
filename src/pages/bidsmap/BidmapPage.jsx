import { useEffect, useMemo, useRef, useState } from "react"
import { BriefcaseBusiness, Globe, List, LocateFixed, MapPin, Search, SlidersHorizontal } from "lucide-react"
import { Circle, MapContainer, Marker, TileLayer, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

const DEFAULT_CENTER = [-15.7902, 35.0165]

const requirements = [
    {
        id: "1",
        category: "Creative",
        title: "Custom Brand Identity for Tech Startup",
        description:
            "Looking for an experienced designer to build a complete visual language including logo, color palette, and social templates.",
        location: "San Francisco, CA (2.4 miles)",
        due: "Due in 5 days",
        isUrgent: false,
        budgetMin: 1200,
        budgetMax: 2500,
        budgetLabel: "$1.2k - $2.5k",
        coordinates: [-15.787519, 35.008686],
    },
    {
        id: "2",
        category: "Maintenance",
        title: "Office HVAC Maintenance and Filter Replacement",
        description: "Quarterly maintenance needed for our small office. Need someone licensed and insured to check three rooftop units.",
        location: "Palo Alto, CA (12.1 miles)",
        due: "Urgent",
        isUrgent: true,
        budgetMin: 300,
        budgetMax: 500,
        budgetLabel: "$300 - $500",
        coordinates: [-15.802376, 35.034319],
    },
    {
        id: "3",
        category: "Development",
        title: "E-commerce Mobile App Development",
        description: "We need a Flutter developer to build our consumer-facing mobile app. Must have experience with Stripe and Firebase.",
        location: "Oakland, CA (5.8 miles)",
        due: "Due in 14 days",
        isUrgent: false,
        budgetMin: 5000,
        budgetMax: null,
        budgetLabel: "$5,000+",
        coordinates: [-15.787363, 35.010407],
    },
    {
        id: "4",
        category: "Writing",
        title: "Hi-Tech Electronics",
        description: "Seeking a technical writer to document our new REST API. Familiarity with Swagger/OpenAPI is required.",
        location: "Berkeley, CA (8.1 miles)",
        due: "Due in 2 days",
        isUrgent: false,
        budgetMin: 50,
        budgetMax: 100,
        budgetLabel: "$50 - $100/hr",
        coordinates: [-15.791540, 35.018511],
    },
]

const getCategoryClass = (category) => {
    if (category === "Creative") return "bg-blue-100 text-blue-700"
    if (category === "Maintenance") return "bg-emerald-100 text-emerald-700"
    if (category === "Development") return "bg-purple-100 text-purple-700"
    return "bg-orange-100 text-orange-700"
}

const distanceKm = ([lat1, lng1], [lat2, lng2]) => {
    const toRad = (value) => (value * Math.PI) / 180
    const earthRadiusKm = 6371
    const dLat = toRad(lat2 - lat1)
    const dLng = toRad(lng2 - lng1)
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
    return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

const isInBounds = (coordinates, bounds) =>
    coordinates[0] >= bounds.south &&
    coordinates[0] <= bounds.north &&
    coordinates[1] >= bounds.west &&
    coordinates[1] <= bounds.east

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

/** Blue dot + ring — clearly distinct from budget pill markers */
const userLocationIcon = L.divIcon({
    className: "",
    html: `<div style="
        width:16px;
        height:16px;
        background:#2563eb;
        border:3px solid #ffffff;
        border-radius:50%;
        box-shadow:0 0 0 2px rgba(37,99,235,0.35),0 2px 8px rgba(15,23,42,0.25);
    "></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
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
    const [selectedId, setSelectedId] = useState(requirements[0]?.id ?? null)
    const [mapInstance, setMapInstance] = useState(null)
    const [viewMode, setViewMode] = useState("map")
    const [scope, setScope] = useState("local")
    const [searchTerm, setSearchTerm] = useState("")
    const [showFilters, setShowFilters] = useState(false)
    const [categoryFilter, setCategoryFilter] = useState("all")
    const [budgetFilter, setBudgetFilter] = useState("all")
    const [urgentOnly, setUrgentOnly] = useState(false)
    const [areaBounds, setAreaBounds] = useState(null)
    /** Current device position from Geolocation API — [lat, lng] */
    const [myPosition, setMyPosition] = useState(null)
    const [myAccuracyM, setMyAccuracyM] = useState(null)
    const [geoDenied, setGeoDenied] = useState(false)
    const watchIdRef = useRef(null)
    const geoSupported = typeof navigator !== "undefined" && "geolocation" in navigator

    const filteredRequirements = useMemo(() => {
        const normalizedSearch = searchTerm.trim().toLowerCase()

        return requirements.filter((item) => {
            const matchesSearch =
                !normalizedSearch ||
                item.title.toLowerCase().includes(normalizedSearch) ||
                item.description.toLowerCase().includes(normalizedSearch) ||
                item.location.toLowerCase().includes(normalizedSearch)

            const matchesCategory = categoryFilter === "all" || item.category === categoryFilter

            const matchesBudget =
                budgetFilter === "all" ||
                (budgetFilter === "under-500" && item.budgetMin < 500) ||
                (budgetFilter === "500-2000" && item.budgetMin <= 2000 && (item.budgetMax ?? Infinity) >= 500) ||
                (budgetFilter === "2000-plus" && (item.budgetMin >= 2000 || (item.budgetMax ?? Infinity) >= 2000))

            const matchesUrgency = !urgentOnly || item.isUrgent

            const matchesScope =
                scope === "global" ||
                !myPosition ||
                distanceKm(myPosition, item.coordinates) <= 25

            const matchesArea = !areaBounds || isInBounds(item.coordinates, areaBounds)

            return matchesSearch && matchesCategory && matchesBudget && matchesUrgency && matchesScope && matchesArea
        })
    }, [searchTerm, categoryFilter, budgetFilter, urgentOnly, scope, myPosition, areaBounds])

    useEffect(() => {
        if (!filteredRequirements.length) {
            setSelectedId(null)
            return
        }
        if (!filteredRequirements.some((item) => item.id === selectedId)) {
            setSelectedId(filteredRequirements[0].id)
        }
    }, [filteredRequirements, selectedId])

    const selectedRequirement = useMemo(() => {
        if (!filteredRequirements.length) return null
        return filteredRequirements.find((item) => item.id === selectedId) ?? filteredRequirements[0]
    }, [selectedId, filteredRequirements])

    useEffect(() => {
        if (!geoSupported) {
            setGeoDenied(true)
            return
        }

        const onSuccess = (pos) => {
            setGeoDenied(false)
            setMyPosition([pos.coords.latitude, pos.coords.longitude])
            setMyAccuracyM(
                typeof pos.coords.accuracy === "number" && pos.coords.accuracy > 0
                    ? pos.coords.accuracy
                    : null
            )
        }

        const onError = () => {
            setGeoDenied(true)
            setMyPosition(null)
            setMyAccuracyM(null)
        }

        watchIdRef.current = navigator.geolocation.watchPosition(onSuccess, onError, {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0,
        })

        return () => {
            if (watchIdRef.current !== null) {
                navigator.geolocation.clearWatch(watchIdRef.current)
            }
        }
    }, [geoSupported])

    const flyToMyLocation = () => {
        if (!geoSupported || !mapInstance) return

        if (myPosition) {
            mapInstance.flyTo(myPosition, Math.max(mapInstance.getZoom(), 14), { duration: 0.6 })
            return
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const latLng = [pos.coords.latitude, pos.coords.longitude]
                setMyPosition(latLng)
                setMyAccuracyM(
                    typeof pos.coords.accuracy === "number" && pos.coords.accuracy > 0
                        ? pos.coords.accuracy
                        : null
                )
                setGeoDenied(false)
                mapInstance.flyTo(latLng, Math.max(mapInstance.getZoom(), 14), { duration: 0.6 })
            },
            () => setGeoDenied(true),
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
        )
    }

    const applyAreaFilterFromMap = () => {
        if (!mapInstance) return
        const bounds = mapInstance.getBounds()
        setAreaBounds({
            south: bounds.getSouth(),
            west: bounds.getWest(),
            north: bounds.getNorth(),
            east: bounds.getEast(),
        })
    }

    const activeFilterCount =
        (categoryFilter !== "all" ? 1 : 0) +
        (budgetFilter !== "all" ? 1 : 0) +
        (urgentOnly ? 1 : 0) +
        (areaBounds ? 1 : 0)

    const mapCenter = selectedRequirement?.coordinates ?? myPosition ?? DEFAULT_CENTER

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
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-[#0b4a74]/40 focus:ring-2 focus:ring-[#0b4a74]/15"
                            />
                        </label>

                        <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5">
                            <button
                                type="button"
                                onClick={() => setScope("local")}
                                className={`rounded-md px-3 py-1.5 text-xs font-semibold ${
                                    scope === "local" ? "bg-white text-slate-700 shadow-sm" : "text-slate-500"
                                }`}
                            >
                                Local
                            </button>
                            <button
                                type="button"
                                onClick={() => setScope("global")}
                                className={`rounded-md px-3 py-1.5 text-xs font-semibold ${
                                    scope === "global" ? "bg-white text-slate-700 shadow-sm" : "text-slate-500"
                                }`}
                            >
                                Global
                            </button>
                        </div>

                        <div className="ml-auto flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setViewMode("list")}
                                className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-xs font-semibold ${
                                    viewMode === "list"
                                        ? "border-[#0b4a74]/20 bg-[#0b4a74]/10 text-[#0b4a74]"
                                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                                }`}
                            >
                                <List className="h-3.5 w-3.5" />
                                List
                            </button>
                            <button
                                type="button"
                                onClick={() => setViewMode("map")}
                                className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-xs font-semibold ${
                                    viewMode === "map"
                                        ? "border-[#0b4a74]/20 bg-[#0b4a74]/10 text-[#0b4a74]"
                                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                                }`}
                            >
                                <MapPin className="h-3.5 w-3.5" />
                                Map
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowFilters((open) => !open)}
                                className="inline-flex items-center gap-1 rounded-md bg-[#0b4a74] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#083754]"
                            >
                                <SlidersHorizontal className="h-3.5 w-3.5" />
                                Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ""}
                            </button>
                        </div>
                    </div>

                    {showFilters && (
                        <div className="mt-3 grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 sm:grid-cols-2 lg:grid-cols-4">
                            <label className="text-xs">
                                <span className="mb-1 block font-semibold text-slate-600">Category</span>
                                <select
                                    value={categoryFilter}
                                    onChange={(event) => setCategoryFilter(event.target.value)}
                                    className="w-full rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-700"
                                >
                                    <option value="all">All categories</option>
                                    <option value="Creative">Creative</option>
                                    <option value="Maintenance">Maintenance</option>
                                    <option value="Development">Development</option>
                                    <option value="Writing">Writing</option>
                                </select>
                            </label>

                            <label className="text-xs">
                                <span className="mb-1 block font-semibold text-slate-600">Budget</span>
                                <select
                                    value={budgetFilter}
                                    onChange={(event) => setBudgetFilter(event.target.value)}
                                    className="w-full rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-700"
                                >
                                    <option value="all">All budgets</option>
                                    <option value="under-500">Under $500</option>
                                    <option value="500-2000">$500 - $2,000</option>
                                    <option value="2000-plus">$2,000+</option>
                                </select>
                            </label>

                            <label className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-slate-600">
                                <input
                                    type="checkbox"
                                    checked={urgentOnly}
                                    onChange={(event) => setUrgentOnly(event.target.checked)}
                                    className="h-3.5 w-3.5 rounded border-slate-300 text-[#0b4a74] focus:ring-[#0b4a74]"
                                />
                                Urgent only
                            </label>

                            <div className="flex items-center gap-2 sm:justify-end">
                                <button
                                    type="button"
                                    onClick={() => setAreaBounds(null)}
                                    className="rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                                >
                                    Clear area
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setCategoryFilter("all")
                                        setBudgetFilter("all")
                                        setUrgentOnly(false)
                                        setAreaBounds(null)
                                    }}
                                    className="rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                                >
                                    Reset all
                                </button>
                            </div>
                        </div>
                    )}
                </header>

                <div className={viewMode === "map" ? "grid grid-cols-1 lg:grid-cols-[420px_minmax(0,1fr)]" : "grid grid-cols-1"}>
                    {viewMode !== "map" && (
                        <aside className="bg-white">
                            <div className="flex items-center justify-between px-4 py-4 md:px-5">
                                <h2 className="text-base font-bold text-slate-900">
                                    {filteredRequirements.length} matching requirements
                                </h2>
                                <span className="text-xs font-medium text-slate-500">View: List only</span>
                            </div>

                            <div className="max-h-[78vh] space-y-3 overflow-y-auto px-4 pb-5 md:px-5">
                                {filteredRequirements.map((item) => {
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

                                {filteredRequirements.length === 0 && (
                                    <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 py-6 text-center text-sm text-slate-500">
                                        No requirements match your filters.
                                    </p>
                                )}
                            </div>
                        </aside>
                    )}

                    {viewMode === "map" && (
                        <>
                    <aside className="border-r border-slate-100 bg-white">
                        <div className="flex items-center justify-between px-4 py-4 md:px-5">
                            <h2 className="text-base font-bold text-slate-900">
                                {filteredRequirements.length} requirements near you
                            </h2>
                            <button
                                type="button"
                                className="text-xs font-medium text-slate-500 hover:text-slate-700"
                            >
                                Sorted by: Newest
                            </button>
                        </div>

                        <div className="max-h-[70vh] space-y-3 overflow-y-auto px-4 pb-5 md:px-5">
                            {filteredRequirements.map((item) => {
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

                            {filteredRequirements.length === 0 && (
                                <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 py-6 text-center text-sm text-slate-500">
                                    No requirements match your filters.
                                </p>
                            )}
                        </div>
                    </aside>

                    <section className="relative min-h-[600px] overflow-hidden bg-slate-50">
                        <MapContainer
                            center={mapCenter}
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

                            {selectedRequirement && (
                                <SelectedRequirementFlyTo selectedRequirement={selectedRequirement} />
                            )}

                            {filteredRequirements.map((item) => {
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

                            {myPosition && myAccuracyM != null && myAccuracyM < 5000 && (
                                <Circle
                                    center={myPosition}
                                    radius={myAccuracyM}
                                    pathOptions={{
                                        color: "#2563eb",
                                        weight: 1,
                                        fillColor: "#2563eb",
                                        fillOpacity: 0.12,
                                    }}
                                />
                            )}

                            {myPosition && (
                                <Marker
                                    position={myPosition}
                                    icon={userLocationIcon}
                                    zIndexOffset={2000}
                                    interactive={false}
                                />
                            )}
                        </MapContainer>

                        <div className="absolute left-1/2 top-5 z-10 -translate-x-1/2">
                            <button
                                type="button"
                                onClick={applyAreaFilterFromMap}
                                className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
                            >
                                <LocateFixed className="h-3.5 w-3.5" />
                                Search this area
                            </button>
                        </div>

                        <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
                            <button
                                type="button"
                                onClick={flyToMyLocation}
                                title={geoDenied ? "Location unavailable — check browser permissions" : "Center map on my location"}
                                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-[#0b4a74] shadow-sm hover:bg-slate-50 disabled:opacity-50"
                                aria-label="My location"
                                disabled={!geoSupported}
                            >
                                <LocateFixed className="h-4 w-4" />
                            </button>
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

                        <div className="absolute bottom-4 left-4 z-10 max-w-[min(100%,280px)] rounded-lg border border-slate-200 bg-white/90 px-3 py-2 text-xs text-slate-600 shadow-sm backdrop-blur">
                            {selectedRequirement ? (
                                <>
                                    <p className="font-semibold text-slate-700">{selectedRequirement.title}</p>
                                    <p className="mt-0.5 inline-flex items-center gap-1">
                                        <Globe className="h-3.5 w-3.5" />
                                        {selectedRequirement.location}
                                    </p>
                                </>
                            ) : (
                                <p className="font-semibold text-slate-700">No result in current filters.</p>
                            )}
                            {myPosition && (
                                <p className="mt-2 flex items-center gap-1 border-t border-slate-100 pt-2 text-[11px] text-slate-500">
                                    <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-blue-600 ring-2 ring-blue-200" />
                                    You are here (blue dot)
                                </p>
                            )}
                            {myPosition && (
                                <p className="mt-1 text-[11px] text-slate-500">
                                    {myPosition[0].toFixed(6)}, {myPosition[1].toFixed(6)}
                                </p>
                            )}
                            {geoDenied && !myPosition && (
                                <p className="mt-2 border-t border-slate-100 pt-2 text-[11px] text-amber-700">
                                    Enable location in your browser to see where you are on the map.
                                </p>
                            )}
                        </div>
                    </section>
                    </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default BidmapPage