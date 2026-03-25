import { useEffect, useMemo, useRef, useState } from "react"
import {
  CheckCircle2,
  ChevronDown,
  FileText,
  GalleryHorizontal,
  Info,
  MapPin,
  Package,
  Save,
  ShieldCheck,
  Truck,
  UploadCloud,
  X,
} from "lucide-react"

const commodityCatalog = {
  "Grains & Cereals": {
    types: [
      { name: "Maize / Corn", units: ["Metric Tons (MT)", "Kilograms (kg)"] },
      { name: "Wheat", units: ["Metric Tons (MT)", "Kilograms (kg)"] },
    ],
  },
  "Cooking Oil": {
    types: [{ name: "Vegetable Oil", units: ["Liters (L)", "Metric Tons (MT)", "Kilograms (kg)"] }],
  },
  "Construction Materials": {
    types: [
      { name: "Cement", units: ["Metric Tons (MT)", "Pieces (pcs)"] },
      { name: "Sand / Gravel", units: ["Metric Tons (MT)"] },
    ],
  },
  Electronics: {
    types: [
      { name: "Phone", units: ["Pieces (pcs)"] },
      { name: "Laptop", units: ["Pieces (pcs)"] },
      { name: "Accessories", units: ["Pieces (pcs)", "Kilograms (kg)"] },
    ],
  },
  Fertilizer: {
    types: [{ name: "Urea", units: ["Metric Tons (MT)", "Kilograms (kg)"] }],
  },
}

const PostRequirementPage = () => {
  const commodityGroups = useMemo(() => Object.keys(commodityCatalog), [])
  const [commodityGroup, setCommodityGroup] = useState("")
  const [commodityType, setCommodityType] = useState("")
  const [quantity, setQuantity] = useState("")
  const [unit, setUnit] = useState("")
  const [deliveryLocation, setDeliveryLocation] = useState("")
  const [transportMin, setTransportMin] = useState("")
  const [transportMax, setTransportMax] = useState("")
  const [specs, setSpecs] = useState("")
  const [attachments, setAttachments] = useState([])
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null)
  const attachmentsInputRef = useRef(null)
  const imageObjectUrlRef = useRef(null)

  const availableTypes = useMemo(
    () => (commodityGroup ? commodityCatalog[commodityGroup]?.types ?? [] : []),
    [commodityGroup]
  )
  const availableUnits = useMemo(() => {
    if (!commodityGroup || !commodityType) return []
    const match = commodityCatalog[commodityGroup]?.types?.find((t) => t.name === commodityType)
    return match?.units ?? []
  }, [commodityGroup, commodityType])

  useEffect(() => {
    const types = commodityGroup ? commodityCatalog[commodityGroup]?.types ?? [] : []
    const nextType = types[0]?.name ?? ""
    setCommodityType(nextType)
    setUnit(types[0]?.units?.[0] ?? "")
  }, [commodityGroup])

  useEffect(() => {
    const match = commodityGroup ? commodityCatalog[commodityGroup]?.types?.find((t) => t.name === commodityType) : null
    setUnit(match?.units?.[0] ?? "")
  }, [commodityType, commodityGroup])

  const canPublish = useMemo(() => {
    return (
      Boolean(commodityGroup) &&
      Boolean(commodityType) &&
      Number(quantity) > 0 &&
      Boolean(unit) &&
      Boolean(deliveryLocation.trim()) &&
      Boolean(specs.trim())
    )
  }, [commodityGroup, commodityType, unit, quantity, deliveryLocation, specs])

  useEffect(() => {
    return () => {
      if (imageObjectUrlRef.current) {
        URL.revokeObjectURL(imageObjectUrlRef.current)
      }
    }
  }, [])

  const clearAttachments = () => {
    setAttachments([])
    setImagePreviewUrl(null)
    if (imageObjectUrlRef.current) {
      URL.revokeObjectURL(imageObjectUrlRef.current)
      imageObjectUrlRef.current = null
    }
    if (attachmentsInputRef.current) attachmentsInputRef.current.value = ""
  }

  const handleAttachmentsChange = (event) => {
    const files = Array.from(event.target.files ?? [])
    const maxBytes = 5 * 1024 * 1024

    const normalized = files
      .filter((f) => f.size <= maxBytes)
      .filter((f) => {
        const name = (f.name ?? "").toLowerCase()
        return name.endsWith(".jpg") || name.endsWith(".jpeg") || name.endsWith(".png") || name.endsWith(".pdf")
      })

    setAttachments(normalized)

    const firstImage = normalized.find((f) => (f.type ?? "").startsWith("image/")) ?? normalized.find((f) => /(\.png|\.jpe?g)$/i.test(f.name))

    if (imageObjectUrlRef.current) {
      URL.revokeObjectURL(imageObjectUrlRef.current)
      imageObjectUrlRef.current = null
    }

    if (firstImage) {
      const url = URL.createObjectURL(firstImage)
      imageObjectUrlRef.current = url
      setImagePreviewUrl(url)
    } else {
      setImagePreviewUrl(null)
    }
  }

  return (
    <div className="w-full p-4 md:p-6">
      <div className="mx-auto">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-100">
          <header className="border-b border-slate-100 px-5 py-4 md:px-7">
            <h1 className="text-2xl font-extrabold text-slate-900">New Requirement</h1>
            <p className="mt-1 text-sm text-slate-500">
              Define your trade parameters for the global marketplace.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-[minmax(0,1fr)_340px] md:gap-6 md:p-7">
            {/* Left: form */}
            <div className="space-y-4">
              {/* Commodity details */}
              <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3">
                  <Package className="h-4 w-4 text-[#0b4a74]" />
                  <h2 className="text-sm font-bold text-slate-900">Commodity Details</h2>
                </div>

                <div className="space-y-4 px-4 py-4">
                  <div className="space-y-3">
                    <div>
                      <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                        Commodity Category <span className="text-red-500">*</span>
                      </label>
                      <div className="relative mt-2">
                        <select
                          value={commodityGroup}
                          onChange={(e) => setCommodityGroup(e.target.value)}
                          className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 pr-10 text-sm text-slate-700 outline-none focus:border-[#0b4a74]/40 focus:ring-2 focus:ring-[#0b4a74]/15"
                        >
                          <option value="" disabled>
                            Select a category
                          </option>
                          {commodityGroups.map((g) => (
                            <option key={g} value={g}>
                              {g}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                        Commodity Type <span className="text-red-500">*</span>
                      </label>
                      <div className="relative mt-2">
                        <select
                          value={commodityType}
                          onChange={(e) => setCommodityType(e.target.value)}
                          disabled={!commodityGroup}
                          className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 pr-10 text-sm text-slate-700 outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:border-[#0b4a74]/40 focus:ring-2 focus:ring-[#0b4a74]/15"
                        >
                          {(availableTypes ?? []).map((t) => (
                            <option key={t.name} value={t.name}>
                              {t.name}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_180px]">
                    <div>
                      <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                        Quantity <span className="text-red-500">*</span>
                      </label>
                      <input
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        type="number"
                        min="0"
                        placeholder="0.00"
                        className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#0b4a74]/40 focus:ring-2 focus:ring-[#0b4a74]/15"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                        Unit <span className="text-red-500">*</span>
                      </label>
                      <div className="relative mt-2">
                        <select
                          value={unit}
                          onChange={(e) => setUnit(e.target.value)}
                          disabled={!commodityType}
                          className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 pr-10 text-sm text-slate-700 outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:border-[#0b4a74]/40 focus:ring-2 focus:ring-[#0b4a74]/15"
                        >
                          {availableUnits.map((u) => (
                            <option key={u} value={u}>
                              {u}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Logistics & value */}
              <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3">
                  <Truck className="h-4 w-4 text-[#0b4a74]" />
                  <h2 className="text-sm font-bold text-slate-900">Logistics &amp; Value</h2>
                </div>

                <div className="space-y-4 px-4 py-4">
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      Delivery Location (Port/Facility)
                    </label>
                    <div className="relative mt-2">
                      <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        value={deliveryLocation}
                        onChange={(e) => setDeliveryLocation(e.target.value)}
                        placeholder="e.g. Port of Beira"
                        className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-700 outline-none focus:border-[#0b4a74]/40 focus:ring-2 focus:ring-[#0b4a74]/15"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      Transport Price Range (MWK)  <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2 grid grid-cols-2 gap-3">
                      <input
                        value={transportMin}
                        onChange={(e) => setTransportMin(e.target.value)}
                        type="number"
                        min="0"
                        placeholder="Min"
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#0b4a74]/40 focus:ring-2 focus:ring-[#0b4a74]/15"
                      />
                      <input
                        value={transportMax}
                        onChange={(e) => setTransportMax(e.target.value)}
                        type="number"
                        min="0"
                        placeholder="Max"
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#0b4a74]/40 focus:ring-2 focus:ring-[#0b4a74]/15"
                      />
                    </div>
                    <p className="mt-2 text-xs text-slate-500">
                      Leave blank to accept market pricing.
                    </p>
                  </div>
                </div>
              </section>

              {/* Specs */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_600px]">
                <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3">
                    <ShieldCheck className="h-4 w-4 text-[#0b4a74]" />
                    <h2 className="text-sm font-bold text-slate-900">Specifications &amp; Quality Standards (Optional)</h2>
                  </div>

                  <div className="px-4 py-4">
                    <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      Requirements (Optional)
                    </label>
                    <textarea
                      value={specs}
                      onChange={(e) => setSpecs(e.target.value)}
                      placeholder="Specify purity, grade, moisture content, or specific certification requirements..."
                      rows={5}
                      className="mt-2 w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#0b4a74]/40 focus:ring-2 focus:ring-[#0b4a74]/15"
                    />
                  </div>
                </section>

                <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3">
                    <GalleryHorizontal className="h-4 w-4 text-[#0b4a74]" />
                    <h2 className="text-sm font-bold text-slate-900">Pictures &amp; Documents (Optional)</h2>
                  </div>
                {/* Image/document upload (Optional) */}
                <div className="px-4 py-4">
                  <input
                    ref={attachmentsInputRef}
                    id="attachments"
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    multiple
                    onChange={handleAttachmentsChange}
                    className="sr-only"
                  />

                  <div className="mb-3">
                    <label htmlFor="attachments" className="cursor-pointer">
                      <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center hover:border-[#0b4a74]/30 hover:bg-white transition">
                        <UploadCloud className="h-5 w-5 text-[#0b4a74]" />
                        <p className="mt-2 text-sm font-semibold text-slate-700">Click to upload</p>
                        <p className="mt-1 text-xs text-slate-500">
                          JPG, PNG, or PDF (max 5MB each)
                        </p>
                      </div>
                    </label>
                  </div>

                  {imagePreviewUrl ? (
                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                      <img src={imagePreviewUrl} alt="Attachment preview" className="h-56 w-full object-cover" />
                    </div>
                  ) : attachments.length > 0 ? (
                    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-3">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-slate-500" />
                        <div>
                          <p className="text-xs font-semibold text-slate-800">{attachments[0]?.name ?? "Document"}</p>
                          <p className="text-[11px] text-slate-500">
                            {attachments.length} file{attachments.length === 1 ? "" : "s"} selected
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {attachments.length > 0 && (
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <p className="text-xs text-slate-500">{attachments.length} file{attachments.length === 1 ? "" : "s"} selected</p>
                      <button
                        type="button"
                        onClick={clearAttachments}
                        className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                      >
                        <X className="h-3.5 w-3.5" />
                        Remove
                      </button>
                    </div>
                  )}

                  <p className="mt-2 text-xs text-slate-500">
                    Attach relevant documents such as product photos, quality certificates, or test results.
                  </p>
                </div>

                </section>

                <button
                  type="button"
                  disabled={!canPublish}
                  className=" flex items-center gap-2 justify-center mt-3 w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <CheckCircle2 />
                  Publish Requirement
                </button>
                <button
                  type="button"
                  className="flex items-center gap-2 justify-center mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <Save />
                  Save as Draft
                </button>
              </div>
            </div>

            {/* Right: guidance + actions */}
            <aside className="space-y-4 md:sticky md:top-6 md:self-start">
              <section className="rounded-2xl bg-linear-to-br from-[#0b4a74] to-[#083754] p-4 text-white shadow-sm ring-1 ring-[#0b4a74]/25">
                <div className="flex items-start gap-3">
                  <Info className="mt-0.5 h-5 w-5 text-white/90" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-white/80">Market Guidance</p>
                    <ul className="mt-3 space-y-2 text-sm text-white/90">
                      <li className="flex gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-200" />
                        <span>
                          <span className="font-semibold">Market is currently trending</span> on immediate delivery.
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-200" />
                        <span>
                          <span className="font-semibold">Trust factors</span>: detailed specs increase match rates.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostRequirementPage
