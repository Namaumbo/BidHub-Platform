import ReviewsEmptyState from "@/features/reviews/components/ReviewsEmptyState"

export default function ReviewsPage() {
    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10">
            <div className="mx-auto max-w-5xl">
                <h1 className="mb-6 text-2xl font-semibold text-slate-900">Buyer and Bidder Reviews</h1>
                <ReviewsEmptyState />
            </div>
        </main>
    )
}
