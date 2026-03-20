export default function ProductImageComponent({ images, alt }) {
    if (!images?.length) {
        return (
            <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 py-8 text-center text-sm text-slate-500">
                No product images
            </p>
        )
    }

    return (
        <div className="w-full min-w-0">
            {/* Mobile / narrow: horizontal scroll, snap */}
            <div
                className="flex gap-2 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch] sm:hidden"
                style={{ scrollbarGutter: "stable" }}
            >
                {images.map((src, i) => (
                    <div
                        key={`${src}-${i}`}
                        className="w-[min(72vw,280px)] shrink-0 snap-start snap-always"
                    >
                        <img
                            src={src}
                            alt={alt ? `${alt} ${i + 1}` : `Product ${i + 1}`}
                            className="aspect-square w-full rounded-lg object-cover ring-1 ring-slate-200"
                            loading={i === 0 ? "eager" : "lazy"}
                        />
                    </div>
                ))}
            </div>

            {/* sm and up: responsive grid (more columns as width grows) */}
            <ul className="hidden min-w-0 grid-cols-2 gap-2 sm:grid md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                {images.map((src, i) => (
                    <li key={`${src}-${i}`} className="min-w-0">
                        <img
                            src={src}
                            alt={alt ? `${alt} ${i + 1}` : `Product ${i + 1}`}
                            className="aspect-square w-full rounded-lg object-cover ring-1 ring-slate-200"
                            loading={i < 4 ? "eager" : "lazy"}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}