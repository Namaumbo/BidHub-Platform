import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import InquiryService from "@/core/services/inquiries/InquiryService"
import { queryKeys } from "@/core/query/queryKeys"
import { useAuth } from "@/context/AuthContext"

export function useMyInquiries(userId) {
    return useQuery({
        queryKey: queryKeys.inquiries.mine(userId),
        queryFn: () => InquiryService.fetchInquiries({ user_id: userId }),
        enabled: !!userId,
    })
}

export function useCreateInquiry() {
    const queryClient = useQueryClient()
    const { userId } = useAuth()

    return useMutation({
        mutationFn: InquiryService.createInquiry,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.inquiries.mine(userId) })
            queryClient.invalidateQueries({ queryKey: queryKeys.inquiries.all })
            queryClient.invalidateQueries({ queryKey: ["buyer-requirements"] })
        },
    })
}

export function useDeleteInquiry() {
    const queryClient = useQueryClient()
    const { userId } = useAuth()

    return useMutation({
        mutationFn: InquiryService.deleteInquiry,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.inquiries.mine(userId) })
            queryClient.invalidateQueries({ queryKey: queryKeys.inquiries.all })
            queryClient.invalidateQueries({ queryKey: ["buyer-requirements"] })
        },
    })
}
