export default function AuthCarouselPanel({ messages, activeSlide, onSelectSlide }) {
    return (
        <section className="relative hidden overflow-hidden rounded-2xl bg-linear-to-br from-teal-700 via-teal-800 to-cyan-950 p-8 lg:block">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_45%),linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-size-[100%_100%,36px_36px,36px_36px]" />

            <div className="relative mx-auto mt-10 h-[270px] w-[320px]">
                <div className="absolute right-5 top-1 w-[175px] rounded-xl border border-white/30 bg-white/95 p-3 shadow-2xl">
                    <p className="text-[10px] font-medium text-slate-500">Roofing Nails</p>
                    <p className="mt-1 text-lg font-semibold text-slate-800">2,005.45 MWK</p>
                    <div className="mt-2 h-12 rounded-md bg-linear-to-r from-teal-500 to-cyan-500" />
                </div>

                <div className="absolute right-0 top-24 w-[195px] rounded-xl border border-white/20 bg-slate-100/95 p-3 shadow-xl">
                    <p className="text-[10px] font-medium text-slate-500">Plumbing Nails</p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">190.00 MWK</p>
                    <div className="mt-2 h-2 rounded bg-slate-200">
                        <div className="h-2 w-2/3 rounded bg-teal-500" />
                    </div>
                </div>

                <div className="absolute left-0 top-28 w-[220px] rounded-xl border border-white/20 bg-white/95 p-4 shadow-2xl">
                    <p className="text-[10px] font-medium text-slate-500">Oraimo Headsets</p>
                    <p className="mt-1 text-base font-semibold text-slate-800">13,656.00 MWK</p>
                    <div className="mt-3 space-y-2">
                        <div className="h-2 rounded bg-slate-200">
                            <div className="h-2 w-4/5 rounded bg-cyan-600" />
                        </div>
                        <div className="h-2 rounded bg-slate-200">
                            <div className="h-2 w-2/3 rounded bg-teal-500" />
                        </div>
                        <div className="h-2 rounded bg-slate-200">
                            <div className="h-2 w-1/2 rounded bg-indigo-400" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative mt-24 text-center text-white">
                <h2 className="text-3xl font-semibold leading-tight">{messages[activeSlide].titleTop}</h2>
                <h2 className="text-3xl font-semibold leading-tight">{messages[activeSlide].titleBottom}</h2>
                <p className="mx-auto mt-4 max-w-md text-sm text-cyan-100/90">
                    {messages[activeSlide].description}
                </p>
            </div>

            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
                {messages.map((slide, index) => (
                    <button
                        key={slide.titleTop}
                        type="button"
                        aria-label={`Show message ${index + 1}`}
                        onClick={() => onSelectSlide(index)}
                        className={`h-1.5 rounded-full transition-all ${activeSlide === index ? "w-16 bg-white" : "w-8 bg-white/40 hover:bg-white/60"
                            }`}
                    />
                ))}
            </div>
        </section>
    )
}
