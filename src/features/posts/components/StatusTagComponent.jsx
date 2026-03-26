import { cn } from "@/lib/utils"

export function StatusTagComponent({ status }) {
  const styles = {
    awaiting: "bg-emerald-100 text-emerald-800",
    negotiation: "bg-sky-100 text-sky-900",
    completed: "bg-neutral-900 text-white",
  }

  const labels = {
    awaiting: "AWAITING OFFERS",
    negotiation: "UNDER NEGOTIATION",
    completed: "COMPLETED",
  }

  return (
    <span
      className={cn(
        "inline-flex rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide",
        styles[status]
      )}
    >
      {labels[status]}
    </span>
  )
}
