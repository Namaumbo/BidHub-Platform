import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"

export default function ProductImageComponent({ images, alt }) {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isHoverZooming, setIsHoverZooming] = useState(false)
    const [zoomOrigin, setZoomOrigin] = useState("50% 50%")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalZoom, setModalZoom] = useState(1)

    useEffect(() => {
        setActiveIndex(0)
    }, [images])

    if (!images?.length) {
        return (
            <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 py-8 text-center text-sm text-slate-500">
                No product images
            </p>
        )
    }

    const currentImage = images[activeIndex] ?? images[0]
    const canSlide = images.length > 1

    const goPrev = () => {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
        setIsHoverZooming(false)
    }

    const goNext = () => {
        setActiveIndex((prev) => (prev + 1) % images.length)
        setIsHoverZooming(false)
    }

    const openModal = () => {
        setModalZoom(1)
        setIsModalOpen(true)
    }

    return (
        <div className="w-full min-w-0">
            <div className="grid gap-3 sm:grid-cols-[72px_minmax(0,1fr)]">
                <ul className="order-2 flex gap-2 overflow-x-auto sm:order-1 sm:flex-col sm:overflow-y-auto">
                    {images.map((src, i) => {
                        const isActive = i === activeIndex
                        return (
                            <li key={`${src}-${i}`} className="shrink-0">
                                <button
                                    type="button"
                                    onClick={() => setActiveIndex(i)}
                                    className={`overflow-hidden rounded-lg border transition ${
                                        isActive
                                            ? "border-[#0b4a74] ring-2 ring-[#0b4a74]/20"
                                            : "border-slate-200 hover:border-slate-300"
                                    }`}
                                    aria-label={`View image ${i + 1}`}
                                >
                                    <img
                                        src={src}
                                        alt={alt ? `${alt} thumbnail ${i + 1}` : `Thumbnail ${i + 1}`}
                                        className="h-14 w-14 object-cover sm:h-16 sm:w-16"
                                        loading={i < 4 ? "eager" : "lazy"}
                                    />
                                </button>
                            </li>
                        )
                    })}
                </ul>

                <div className="order-1 sm:order-2">
                    <div
                        className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 ring-1 ring-slate-100"
                        onMouseEnter={() => setIsHoverZooming(true)}
                        onMouseLeave={() => {
                            setIsHoverZooming(false)
                            setZoomOrigin("50% 50%")
                        }}
                        onMouseMove={(event) => {
                            const bounds = event.currentTarget.getBoundingClientRect()
                            const x = ((event.clientX - bounds.left) / bounds.width) * 100
                            const y = ((event.clientY - bounds.top) / bounds.height) * 100
                            setZoomOrigin(`${x}% ${y}%`)
                        }}
                    >
                        <img
                            src={currentImage}
                            alt={alt ? `${alt} ${activeIndex + 1}` : `Product ${activeIndex + 1}`}
                            className="aspect-square w-full object-cover transition duration-150 cursor-zoom-in"
                            style={{
                                transform: isHoverZooming ? "scale(1.9)" : "scale(1)",
                                transformOrigin: zoomOrigin,
                            }}
                            loading="eager"
                        />

                        <button
                            type="button"
                            onClick={openModal}
                            className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white/95 px-2 py-1 text-xs font-medium text-slate-700 shadow-sm hover:bg-white"
                        >
                            <Search className="h-3.5 w-3.5" />
                            Zoom
                        </button>

                        {canSlide && (
                            <>
                                <button
                                    type="button"
                                    onClick={goPrev}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-slate-200 bg-white/95 p-1.5 text-slate-700 shadow-sm hover:bg-white"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </button>
                                <button
                                    type="button"
                                    onClick={goNext}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-slate-200 bg-white/95 p-1.5 text-slate-700 shadow-sm hover:bg-white"
                                    aria-label="Next image"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </>
                        )}
                    </div>

                    <p className="mt-2 text-center text-xs text-slate-500">
                        Image {activeIndex + 1} of {images.length} - hover to zoom, or use the Zoom button.
                    </p>
                </div>
            </div>

            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4"
                    role="dialog"
                    aria-modal="true"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="w-full max-w-4xl rounded-xl bg-white p-3 shadow-xl sm:p-4"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="mb-3 flex items-center justify-between">
                            <p className="text-sm font-medium text-slate-700">
                                {alt || "Product image"} - {activeIndex + 1}/{images.length}
                            </p>
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50"
                            >
                                Close
                            </button>
                        </div>

                        <div className="relative overflow-auto rounded-lg border border-slate-200 bg-slate-100">
                            <img
                                src={currentImage}
                                alt={alt ? `${alt} zoomed ${activeIndex + 1}` : `Zoomed ${activeIndex + 1}`}
                                className="mx-auto max-h-[75vh] w-full object-contain transition"
                                style={{ transform: `scale(${modalZoom})`, transformOrigin: "center center" }}
                            />
                        </div>

                        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => setModalZoom((zoom) => Math.max(1, zoom - 0.25))}
                                    className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                                >
                                    - Zoom out
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setModalZoom((zoom) => Math.min(3, zoom + 0.25))}
                                    className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                                >
                                    + Zoom in
                                </button>
                            </div>

                            {canSlide && (
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={goPrev}
                                        className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                                    >
                                        Prev
                                    </button>
                                    <button
                                        type="button"
                                        onClick={goNext}
                                        className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}