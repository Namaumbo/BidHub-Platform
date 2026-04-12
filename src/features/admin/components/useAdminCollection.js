import { useEffect, useState } from "react"

export function useAdminCollection(loader, initialFilters) {
  const [filters, setFilters] = useState(initialFilters)
  const [data, setData] = useState({ items: [], summary: {}, page: 1, pageSize: 10, total: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let active = true

    async function load() {
      setIsLoading(true)
      setError("")
      try {
        const response = await loader(filters)
        if (active) setData(response)
      } catch (loadError) {
        if (active) setError(loadError?.message || "Unable to load admin data.")
      } finally {
        if (active) setIsLoading(false)
      }
    }

    load()

    return () => {
      active = false
    }
  }, [filters, loader])

  return { data, filters, setFilters, isLoading, error, setData }
}
