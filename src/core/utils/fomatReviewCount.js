export default function formatReviewCount(count) {
    if (count >= 1000) {
        const value = count / 1000
        const formatted = Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1)
        return `(${formatted}k)`
    }
    return `(${count})`
}
