

export default function formatMoney(n) {
    return n.toLocaleString("en-US", { style: "currency", currency: "MWK" })
}
