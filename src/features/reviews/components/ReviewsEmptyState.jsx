export default function ReviewsEmptyState() {
    return (
        <section className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Reviews</h2>
            <p className="mt-2 text-sm text-slate-500">
                Reviews are not loaded yet. Connect this page to your backend endpoint and render buyer and bidder feedback here.
            </p>
        </section>
    )
}
