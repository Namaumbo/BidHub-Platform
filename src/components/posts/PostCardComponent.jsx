

export function PostCardComponent({ post }) {
    const isCompleted = post.status === "completed"

    return (
        <article className="flex flex-col gap-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-stretch md:gap-6 lg:p-6">
            {isCompleted && post.imageUrl ? (
                <div className="mx-auto shrink-0 md:mx-0">
                    <img
                        src={post.imageUrl}
                        alt=""
                        className="h-28 w-28 rounded-md object-cover ring-1 ring-slate-200 md:h-32 md:w-32"
                    />
                </div>
            ) : null}

            <div className="min-w-0 flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-2 gap-y-2">
                    <StatusTag status={post.status} />
                    <span className="text-xs text-slate-500">Post ID: #{post.id}</span>
                </div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">{post.title}</h2>
                <p className="max-w-2xl text-sm leading-relaxed text-slate-600">{post.description}</p>

                <div className="grid grid-cols-1 gap-4 border-t border-slate-100 pt-4 sm:grid-cols-3">
                    {isCompleted ? (
                        <>
                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Final volume</p>
                                <p className="mt-1 text-sm font-semibold text-slate-900">{post.finalVolume}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Closed price</p>
                                <p className="mt-1 text-sm font-semibold text-slate-900">{post.closedPrice}</p>
                            </div>
                            <div className="sm:text-right" />
                        </>
                    ) : (
                        <>
                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Target volume</p>
                                <p className="mt-1 text-sm font-semibold text-slate-900">{post.targetVolume}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Target price</p>
                                <p className="mt-1 text-sm font-semibold text-slate-900">{post.targetPrice}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Offers</p>
                                <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-slate-900">
                                    <span>{String(post.offersCount).padStart(2, "0")}</span>
                                    <span
                                        className={cn(
                                            "inline-block size-2 rounded-full",
                                            post.offersActive ? "bg-emerald-500" : "bg-slate-300"
                                        )}
                                        aria-hidden
                                    />
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="flex shrink-0 flex-col justify-center gap-2 border-t border-slate-100 pt-4 md:w-52 md:border-t-0 md:border-l md:pl-6 md:pt-0">
                {post.status === "awaiting" && (
                    <>
                        <Button className="h-10 w-full rounded-md bg-[#001F3F] font-semibold uppercase tracking-wide text-white hover:bg-[#003566]">
                            Manage offers
                        </Button>
                        <Button variant="outline" className="h-10 w-full rounded-md border-slate-300 font-semibold uppercase tracking-wide">
                            View details
                        </Button>
                    </>
                )}
                {post.status === "negotiation" && (
                    <>
                        <Button className="h-10 w-full rounded-md bg-[#001F3F] font-semibold uppercase tracking-wide text-white hover:bg-[#003566]">
                            Manage offers
                        </Button>
                        <Button variant="outline" className="h-10 w-full rounded-md border-slate-300 font-semibold uppercase tracking-wide">
                            View details
                        </Button>
                    </>
                )}
                {post.status === "completed" && (
                    <>
                        <Button
                            variant="outline"
                            className="h-10 w-full rounded-md border-neutral-900 font-semibold uppercase tracking-wide text-neutral-900 hover:bg-neutral-50"
                        >
                            Archive case
                        </Button>
                        <button
                            type="button"
                            className="text-center text-sm font-semibold uppercase tracking-wide text-[#001F3F] underline-offset-4 hover:underline"
                        >
                            Download PDF
                        </button>
                    </>
                )}
            </div>
        </article>
    )
}