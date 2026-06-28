import { useQuery } from "@tanstack/react-query"
import CategoryService from "@/core/services/categories/CategoryService"
import { queryKeys } from "@/core/query/queryKeys"

export function useCategories() {
    return useQuery({
        queryKey: queryKeys.categories.all,
        queryFn: CategoryService.fetchCategories,
        staleTime: 5 * 60_000,
    })
}
