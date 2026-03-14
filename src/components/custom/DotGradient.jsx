


export default function DotGradient({ children }) {
    return (
        <div className="min-h-screen w-full bg-white relative">
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "#ffffff",
                    backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.35) 1px, transparent 0)",
                    backgroundSize: "20px 20px",
                    WebkitMaskImage:
                        "linear-gradient(to right, #000 0%, #000 50%, transparent 20%, transparent 100%)",
                    maskImage:
                        "linear-gradient(to right, #000 0%, #000 50%, transparent 20%, transparent 100%)",
                }}
            />
            {children}
        </div>
    )
}