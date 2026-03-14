import { useEffect, useState } from "react"

export default function useAuthCarousel(totalSlides, intervalMs = 5000) {
    const [activeSlide, setActiveSlide] = useState(0)

    useEffect(() => {
        if (!totalSlides || totalSlides <= 1) {
            return undefined
        }

        const timer = setInterval(() => {
            setActiveSlide((current) => (current + 1) % totalSlides)
        }, intervalMs)

        return () => clearInterval(timer)
    }, [intervalMs, totalSlides])

    return {
        activeSlide,
        setActiveSlide,
    }
}
