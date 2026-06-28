import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { useAuth } from "@/context/AuthContext"
import { useCategories } from "@/core/hooks/useCategories"
import { useMyInquiries } from "@/core/hooks/useInquiries"
import BidService from "@/core/services/bids/BidService"
import { mapInquiryWithBidsToRequirement } from "@/core/mappers/inquiryMapper"

export function useBuyerRequirements() {
    const { userId } = useAuth()
    const { data: categories = [] } = useCategories()
    const inquiriesQuery = useMyInquiries(userId)

    const categoryMap = useMemo(
        () => Object.fromEntries(categories.map((category) => [category.id, category.name])),
        [categories],
    )

    const requirementsQuery = useQuery({
        queryKey: ["buyer-requirements", userId, inquiriesQuery.data?.map((item) => item.id)],
        queryFn: async () => {
            const inquiries = inquiriesQuery.data ?? []
            if (!inquiries.length) return []

            return Promise.all(
                inquiries.map(async (inquiry) => {
                    const bids = await BidService.fetchBids({ inquiry_id: inquiry.id })
                    return mapInquiryWithBidsToRequirement(
                        inquiry,
                        bids,
                        categoryMap[inquiry.category_id] || "",
                    )
                }),
            )
        },
        enabled: !!userId && inquiriesQuery.isSuccess,
    })

    return {
        requirements: requirementsQuery.data ?? [],
        isLoading: inquiriesQuery.isLoading || requirementsQuery.isLoading,
        error: inquiriesQuery.error || requirementsQuery.error,
        refetch: requirementsQuery.refetch,
    }
}
