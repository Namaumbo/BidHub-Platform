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
import { Input } from "@/components/ui/input"

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
      Boolean(deliveryLocation.trim())

    )
  }, [commodityGroup, commodityType, unit, quantity, deliveryLocation])

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
    <div className="mx-auto mt-10 max-w-7xl m-5">
      <section className="relative mb-5 overflow-hidden rounded-2xl border border-[#e5f2dd] bg-[#f9fff6]  p-5">
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#0b4a74]/10" />
        <div className="pointer-events-none absolute right-24 top-8 h-14 w-14 rounded-full bg-[#0b4a74]/10" />
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 inline-block rounded-full bg-[#e7f8dd] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#149330]">
              Buyer workspace
            </p>
            <h1 className="text-xl font-extrabold leading-snug text-[#129a2f] md:text-2xl">Thinking it, Buy it</h1>
            <p className="mt-1 text-sm text-slate-600">
              Share what you need and receive offers from verified suppliers across Malawi.
            </p>
          </div>
          <div className=" p-3 sm:block">
            <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/thinking-face-emoji.png" alt="thinking-face-emoji" />
          </div>
        </div>
      </section>

      <div className="lg:grid lg:grid-cols-[1fr_310px] lg:gap-6 xl:grid-cols-[1fr_330px]">
        <div className="space-y-4">
          <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
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
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 pr-10 text-sm text-slate-700 outline-none focus:border-[#0b4a74]/40 focus:ring-2 focus:ring-[#0b4a74]/15"
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
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 pr-10 text-sm text-slate-700 outline-none focus:border-[#0b4a74]/40 focus:ring-2 focus:ring-[#0b4a74]/15 disabled:cursor-not-allowed disabled:opacity-50"
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
                  <Input
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    type="number"
                    min="0"
                    placeholder="0.00"
                    className="mt-2"
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
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 pr-10 text-sm text-slate-700 outline-none focus:border-[#0b4a74]/40 focus:ring-2 focus:ring-[#0b4a74]/15 disabled:cursor-not-allowed disabled:opacity-50"
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

          <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3">
              <Truck className="h-4 w-4 text-[#0b4a74]" />
              <h2 className="text-sm font-bold text-slate-900">Logistics &amp; Value</h2>
            </div>

            <div className="space-y-4 px-4 py-4">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Delivery Location (Port/Facility) <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-2">
                  <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    placeholder="e.g. Port of Beira"
                    className="pl-9"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Transport Price Range (MWK)
                </label>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <Input
                    value={transportMin}
                    onChange={(e) => setTransportMin(e.target.value)}
                    type="number"
                    min="0"
                    placeholder="Min"
                  />
                  <Input
                    value={transportMax}
                    onChange={(e) => setTransportMax(e.target.value)}
                    type="number"
                    min="0"
                    placeholder="Max"
                  />
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  Leave blank if you prefer market pricing.
                </p>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
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
                placeholder="Specify purity, grade, moisture content, or certification needs..."
                rows={5}
                className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#0b4a74]/40 focus:ring-2 focus:ring-[#0b4a74]/15"
              />
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3">
              <GalleryHorizontal className="h-4 w-4 text-[#0b4a74]" />
              <h2 className="text-sm font-bold text-slate-900">Pictures &amp; Documents (Optional)</h2>
            </div>

            <div className="px-4 py-4">
              <Input
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
                  <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center transition hover:border-[#0b4a74]/30 hover:bg-white">
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
                Add photos, certificates, or test results to improve supplier response quality.
              </p>
            </div>
          </section>
        </div>

        <aside className="mt-4 space-y-4 lg:mt-0 lg:sticky lg:top-4 lg:self-start">
          <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <h3 className="text-sm font-bold text-slate-900">Before You Publish</h3>
            <div className="mt-3 space-y-3.5">
              {[
                { n: "1", t: "Select clear category", d: "Accurate categories help suppliers find your request faster." },
                { n: "2", t: "Add full location", d: "City, district, or facility details improve quote accuracy." },
                { n: "3", t: "Attach proof where possible", d: "Specs and photos improve trust and response quality." },
              ].map((tip) => (
                <div key={tip.n} className="flex gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0b4a74]">
                    <span className="text-[11px] font-bold text-white">{tip.n}</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">{tip.t}</p>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500">{tip.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-[#0b4a74]/8 p-4 ring-1 ring-[#0b4a74]/15">
            <div className="flex items-start gap-2">
              <Info className="mt-0.5 h-4 w-4 text-[#0b4a74]" />
              <p className="text-xs text-[#0b4a74]/90">
                Detailed requirements usually receive faster and more competitive offers.
              </p>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <button
              type="button"
              disabled={!canPublish}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0b4a74] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#083754] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CheckCircle2 className="h-4 w-4" />
              Publish Requirement
            </button>
            <button
              type="button"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Save className="h-4 w-4" />
              Save as Draft
            </button>

            <div className="mt-3 rounded-xl bg-slate-50 px-3 py-2.5">
              <p className="text-[11px] text-slate-500">
                <span className="font-semibold text-slate-700">Required:</span> category, type, quantity, unit, and delivery location.
              </p>
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}

export default PostRequirementPage
