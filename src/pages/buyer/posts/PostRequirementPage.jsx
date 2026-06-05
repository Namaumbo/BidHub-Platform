import { useEffect, useMemo, useRef, useState } from "react"
import {
  ChevronDown,
  FileText,
  GalleryHorizontal,
  Info,
  MapPin,
  Package,
  ShieldCheck,
  Truck,
  UploadCloud,
  X,
} from "lucide-react"
import { Input } from "@/components/ui/input"

const fieldClass =
  "w-full h-[44px] appearance-none rounded-lg border border-slate-200 bg-white px-3 text-[14px] text-slate-700 placeholder:text-slate-400 outline-none focus:border-[#0EA432]/50 focus:ring-2 focus:ring-[#0EA432]/10 transition-colors disabled:cursor-not-allowed disabled:opacity-50"

const labelClass = "block text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-2"

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
    <div className="mx-auto max-w-7xl m-5 mt-8">

      {/* ── Minimal page header ── */}
      <div className="mb-7">
        <span className="inline-block rounded-full bg-[#e1f5ee] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#0EA432] mb-3">
          Post Requirement
        </span>
        <h1 className="text-[24px] font-medium text-slate-900 leading-tight">
          Post a new requirement
        </h1>
        <p className="mt-1.5 text-[13px] text-slate-500 max-w-lg">
          Describe what you need and verified suppliers will send you competing offers.
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-[1fr_310px] lg:gap-6 xl:grid-cols-[1fr_330px]">
        <div className="space-y-4">

          {/* ── Commodity Details ── */}
          <section className="overflow-hidden rounded-xl bg-white ring-1 ring-slate-200">
            <div className="flex items-center gap-2.5 border-b border-slate-100 px-5 py-3.5">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-[#e1f5ee]">
                <Package className="h-3.5 w-3.5 text-[#0EA432]" />
              </div>
              <h2 className="text-[16px] font-medium text-slate-900">Commodity Details</h2>
            </div>

            <div className="space-y-5 px-5 py-5">
              <div>
                <label className={labelClass}>
                  Commodity Category <span className="text-red-400 normal-case tracking-normal">*</span>
                </label>
                <div className="relative">
                  <select
                    value={commodityGroup}
                    onChange={(e) => setCommodityGroup(e.target.value)}
                    className={fieldClass + " pr-10"}
                  >
                    <option value="" disabled>Select a category</option>
                    {commodityGroups.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  Commodity Type <span className="text-red-400 normal-case tracking-normal">*</span>
                </label>
                <div className="relative">
                  <select
                    value={commodityType}
                    onChange={(e) => setCommodityType(e.target.value)}
                    disabled={!commodityGroup}
                    className={fieldClass + " pr-10"}
                  >
                    {!commodityGroup && (
                      <option value="" disabled>Select a type</option>
                    )}
                    {(availableTypes ?? []).map((t) => (
                      <option key={t.name} value={t.name}>{t.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_180px]">
                <div>
                  <label className={labelClass}>
                    Quantity <span className="text-red-400 normal-case tracking-normal">*</span>
                  </label>
                  <input
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    type="number"
                    min="0"
                    placeholder="e.g. 200"
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    Unit <span className="text-red-400 normal-case tracking-normal">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      disabled={!commodityType}
                      className={fieldClass + " pr-10"}
                    >
                      {availableUnits.map((u) => (
                        <option key={u} value={u}>{u}</option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── Logistics & Value ── */}
          <section className="overflow-hidden rounded-xl bg-white ring-1 ring-slate-200">
            <div className="flex items-center gap-2.5 border-b border-slate-100 px-5 py-3.5">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-[#e1f5ee]">
                <Truck className="h-3.5 w-3.5 text-[#0EA432]" />
              </div>
              <h2 className="text-[16px] font-medium text-slate-900">Logistics &amp; Value</h2>
            </div>

            <div className="space-y-5 px-5 py-5">
              <div>
                <label className={labelClass}>
                  Delivery Location <span className="text-red-400 normal-case tracking-normal">*</span>
                </label>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0EA432]" />
                  <input
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    placeholder="e.g. Lilongwe, Area 18"
                    className={fieldClass + " pl-9"}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Transport Price Range (MWK)</label>
                <div className="flex items-center gap-0">
                  <input
                    value={transportMin}
                    onChange={(e) => setTransportMin(e.target.value)}
                    type="number"
                    min="0"
                    placeholder="Min"
                    className={fieldClass + " rounded-r-none"}
                  />
                  <div className="flex h-[44px] shrink-0 items-center border-y border-slate-200 bg-slate-50 px-3 text-[12px] font-medium text-slate-400">
                    to
                  </div>
                  <input
                    value={transportMax}
                    onChange={(e) => setTransportMax(e.target.value)}
                    type="number"
                    min="0"
                    placeholder="Max"
                    className={fieldClass + " rounded-l-none border-l-0"}
                  />
                </div>
                <p className="mt-2 text-[12px] text-slate-400">
                  Leave blank to receive market-priced offers.
                </p>
              </div>
            </div>
          </section>

          {/* ── Specifications ── */}
          <section className="overflow-hidden rounded-xl bg-white ring-1 ring-slate-200">
            <div className="flex items-center gap-2.5 border-b border-slate-100 px-5 py-3.5">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-[#e1f5ee]">
                <ShieldCheck className="h-3.5 w-3.5 text-[#0EA432]" />
              </div>
              <h2 className="text-[16px] font-medium text-slate-900">Specifications &amp; Quality Standards</h2>
              <span className="ml-auto text-[11px] text-slate-400">Optional</span>
            </div>

            <div className="px-5 py-5">
              <label className={labelClass}>Requirements</label>
              <textarea
                value={specs}
                onChange={(e) => setSpecs(e.target.value)}
                placeholder="Specify purity, grade, moisture content, certification standards, or any other quality requirements..."
                rows={5}
                className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-3 text-[14px] text-slate-700 placeholder:text-slate-400 outline-none focus:border-[#0EA432]/50 focus:ring-2 focus:ring-[#0EA432]/10 transition-colors"
              />
            </div>
          </section>

          {/* ── Attachments ── */}
          <section className="overflow-hidden rounded-xl bg-white ring-1 ring-slate-200">
            <div className="flex items-center gap-2.5 border-b border-slate-100 px-5 py-3.5">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-[#e1f5ee]">
                <GalleryHorizontal className="h-3.5 w-3.5 text-[#0EA432]" />
              </div>
              <h2 className="text-[16px] font-medium text-slate-900">Pictures &amp; Documents</h2>
              <span className="ml-auto text-[11px] text-slate-400">Optional</span>
            </div>

            <div className="px-5 py-5">
              <Input
                ref={attachmentsInputRef}
                id="attachments"
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                multiple
                onChange={handleAttachmentsChange}
                className="sr-only"
              />
              <label htmlFor="attachments" className="cursor-pointer">
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center transition hover:border-[#0EA432]/40 hover:bg-white">
                  <UploadCloud className="h-5 w-5 text-[#0EA432]" />
                  <p className="mt-2 text-[13px] font-medium text-slate-700">Click to upload files</p>
                  <p className="mt-1 text-[12px] text-slate-400">JPG, PNG, or PDF — max 5MB each</p>
                </div>
              </label>

              {imagePreviewUrl ? (
                <div className="mt-3 overflow-hidden rounded-lg border border-slate-200">
                  <img src={imagePreviewUrl} alt="Attachment preview" className="h-48 w-full object-cover" />
                </div>
              ) : attachments.length > 0 ? (
                <div className="mt-3 flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-slate-400" />
                    <div>
                      <p className="text-[13px] font-medium text-slate-700">{attachments[0]?.name ?? "Document"}</p>
                      <p className="text-[11px] text-slate-400">
                        {attachments.length} file{attachments.length === 1 ? "" : "s"} selected
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}

              {attachments.length > 0 && (
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-[12px] text-slate-400">{attachments.length} file{attachments.length === 1 ? "" : "s"} attached</p>
                  <button
                    type="button"
                    onClick={clearAttachments}
                    className="inline-flex items-center gap-1 rounded border border-slate-200 bg-white px-2 py-1 text-[12px] font-medium text-slate-500 hover:bg-slate-50"
                  >
                    <X className="h-3 w-3" />
                    Remove
                  </button>
                </div>
              )}
              <p className="mt-3 text-[12px] text-slate-400">
                Photos, certificates, or test results help suppliers provide more accurate quotes.
              </p>
            </div>
          </section>
        </div>

        {/* ── Right panel ── */}
        <aside className="mt-4 space-y-3 lg:mt-0 lg:sticky lg:top-4 lg:self-start">

          {/* Before You Publish */}
          <section className="rounded-xl bg-white p-4 ring-1 ring-slate-200 border-l-[3px] border-l-[#0EA432]">
            <h3 className="text-[14px] font-medium text-slate-900 mb-4">Before You Publish</h3>
            <div className="space-y-4">
              {[
                { n: "1", t: "Select clear category", d: "Accurate categories help suppliers find your request faster." },
                { n: "2", t: "Add full location", d: "City, district, or facility details improve quote accuracy." },
                { n: "3", t: "Attach proof where possible", d: "Specs and photos improve trust and response quality." },
              ].map((tip) => (
                <div key={tip.n} className="flex gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0EA432]">
                    <span className="text-[13px] font-bold text-white">{tip.n}</span>
                  </div>
                  <div>
                    <p className="text-[14px] font-medium text-slate-800 leading-tight">{tip.t}</p>
                    <p className="mt-1 text-[12px] leading-relaxed text-slate-500">{tip.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Info tip */}
          <div className="flex items-start gap-2.5 rounded-lg bg-[#e1f5ee] px-4 py-3">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#0EA432]" />
            <p className="text-[13px] leading-relaxed text-[#0EA432]">
              Detailed requirements typically receive faster and more competitive offers from suppliers.
            </p>
          </div>

          {/* Publish actions */}
          <div className="space-y-2">
            <button
              type="button"
              disabled={!canPublish}
              className="flex h-12 w-full items-center justify-center rounded-lg bg-[#0EA432] text-[15px] font-medium text-white transition-colors hover:bg-[#085041] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Publish Requirement
            </button>
            <button
              type="button"
              className="flex h-12 w-full items-center justify-center rounded-lg border border-[#0EA432] bg-white text-[15px] font-medium text-[#0EA432] transition-colors hover:bg-[#e1f5ee]"
            >
              Save as Draft
            </button>
          </div>

          <p className="text-[11px] text-slate-400 text-center">
            Required: category, type, quantity, unit, and delivery location.
          </p>
        </aside>
      </div>
    </div>
  )
}

export default PostRequirementPage
