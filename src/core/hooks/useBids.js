import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import BidService from "@/core/services/bids/BidService"
import { queryKeys } from "@/core/query/queryKeys"
import { useAuth } from "@/context/AuthContext"

export function useBidsByInquiry(inquiryId) {
    return useQuery({
        queryKey: queryKeys.bids.byInquiry(inquiryId),
        queryFn: () => BidService.fetchBids({ inquiry_id: inquiryId }),
        enabled: !!inquiryId,
    })
}

export function useAcceptBid() {
    const queryClient = useQueryClient()
    const { userId } = useAuth()

    return useMutation({
        mutationFn: BidService.acceptBid,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.bids.all })
            queryClient.invalidateQueries({ queryKey: queryKeys.inquiries.mine(userId) })
            queryClient.invalidateQueries({ queryKey: ["buyer-requirements"] })
        },
    })
}

export function useRejectBid() {
    const queryClient = useQueryClient()
    const { userId } = useAuth()

    return useMutation({
        mutationFn: BidService.rejectBid,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.bids.all })
            queryClient.invalidateQueries({ queryKey: queryKeys.inquiries.mine(userId) })
            queryClient.invalidateQueries({ queryKey: ["buyer-requirements"] })
        },
    })
}
