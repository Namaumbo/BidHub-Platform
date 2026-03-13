

export default function BoxGradient({ children }) {
    return (
        <div className="min-h-screen w-full bg-white relative">
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `
        linear-gradient(to right, #e5e7eb 1px, transparent 1px),
        linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
      `,
                    backgroundSize: "40px 40px",
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