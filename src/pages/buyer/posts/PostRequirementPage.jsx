import { useRef, useState } from "react"
import {
  ChevronDown,
  ImagePlus,
  LayoutGrid,
  MapPin,
  MessageSquare,
  Send,
  ShoppingBag,
  Wallet,
  X,
} from "lucide-react"
import { Input } from "@/components/ui/input"

const categories = [
  "Grains & Cereals",
  "Cooking Oil",
  "Construction Materials",
  "Electronics",
  "Fertilizer",
]

const MAX_IMAGES = 3

const PostRequirementPage = () => {
  const [itemName, setItemName] = useState("")
  const [description, setDescription] = useState("")
  const [budget, setBudget] = useState("")
  const [location, setLocation] = useState("")
  const [category, setCategory] = useState("")
  const [images, setImages] = useState([]) // [{ file, url }]
  const fileInputRef = useRef(null)

  const handleImagePick = (e) => {
    const picked = Array.from(e.target.files ?? [])
    const remaining = MAX_IMAGES - images.length
    if (remaining <= 0) return

    const added = picked.slice(0, remaining).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }))
    setImages((prev) => [...prev, ...added])
    e.target.value = ""
  }

  const removeImage = (index) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index].url)
      return prev.filter((_, i) => i !== index)
    })
  }

  const canSubmit = itemName.trim() && description.trim() && budget && location.trim() && category

  return (
    <div className="bg-linear-to-br from-[#f0fdf4] via-gray-50 to-gray-100 flex items-start justify-center px-4 py-10">
      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#0EA432]/10 px-3 py-1 mb-3">
            <ShoppingBag className="h-3.5 w-3.5 text-[#0EA432]" />
            <span className="text-xs font-semibold text-[#0EA432] uppercase tracking-wide">New Request</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">Post a Request</h1>
          <p className="mt-1 text-sm text-gray-500">Fill in the details and suppliers will send you their best offers.</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">

          {/* Image upload strip */}
          <div className="bg-gray-50 border-b border-gray-100 px-5 py-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <ImagePlus className="h-3.5 w-3.5" /> Photos
              <span className="ml-auto font-normal normal-case tracking-normal text-gray-400">{images.length}/{MAX_IMAGES}</span>
            </p>
            <div className="flex gap-3">
              {images.map((img, i) => (
                <div key={i} className="relative h-20 w-20 shrink-0 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                  <img src={img.url} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-900/70 text-white hover:bg-red-500 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}

              {images.length < MAX_IMAGES && (
                <>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png"
                    multiple
                    className="sr-only"
                    onChange={handleImagePick}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex h-20 w-20 shrink-0 flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-gray-300 bg-white text-gray-400 hover:border-[#0EA432] hover:bg-[#f0fdf4] hover:text-[#0EA432] transition-all"
                  >
                    <ImagePlus className="h-5 w-5" />
                    <span className="text-[10px] font-semibold leading-none">Add photo</span>
                  </button>
                </>
              )}

              {/* Empty placeholder slots */}
              {Array.from({ length: MAX_IMAGES - images.length - (images.length < MAX_IMAGES ? 1 : 0) }).map((_, i) => (
                <div key={`placeholder-${i}`} className="h-20 w-20 shrink-0 rounded-xl border border-dashed border-gray-200 bg-gray-50" />
              ))}
            </div>
          </div>

          {/* Form body */}
          <div className="px-5 py-5 space-y-4">

            {/* What do you need */}
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                <ShoppingBag className="h-3.5 w-3.5 text-[#0EA432]" />
                What do you need? <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="e.g. iPhone 13, Toyota Fielder..."
              />
            </div>

            {/* Describe requirement */}
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                <MessageSquare className="h-3.5 w-3.5 text-[#0EA432]" />
                Describe your requirement <span className="text-red-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Colour, condition, quantity, any specific details..."
                rows={4}
                className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#0EA432] focus:bg-white focus:ring-2 focus:ring-[#0EA432]/10 transition-all"
              />
            </div>

            {/* Budget + Location */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                  <Wallet className="h-3.5 w-3.5 text-[#0EA432]" />
                  Budget (MWK) <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={budget}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, '');
                    setBudget(raw);
                  }}
                  placeholder="0"
                />
                <div className="mt-1 h-5">
                  <p className="text-green-700 text-sm min-h-4">
                    MWK {budget
                      ? Number(budget).toLocaleString()
                      : ""}
                  </p>
                </div>
              </div>
       
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                  <MapPin className="h-3.5 w-3.5 text-[#0EA432]" />
                  Location <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Lilongwe"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                <LayoutGrid className="h-3.5 w-3.5 text-[#0EA432]" />
                Category <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 pr-10 text-sm text-gray-800 outline-none focus:border-[#0EA432] focus:bg-white focus:ring-2 focus:ring-[#0EA432]/10 transition-all"
                >
                  <option value="" disabled>Select Category</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Footer / Submit */}
          <div className="border-t border-gray-100 bg-gray-50 px-5 py-4">
            <button
              type="button"
              disabled={!canSubmit}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0EA432] py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0b8829] hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
              Post Request
            </button>
            <p className="mt-2.5 text-center text-xs text-gray-400">
              All fields marked <span className="text-red-400">*</span> are required
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostRequirementPage
