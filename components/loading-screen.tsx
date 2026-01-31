"use client"

interface LoadingScreenProps {
  isLoading: boolean
}

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-all duration-700 ease-out ${
        isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Minimal text */}
        <div className="text-sm tracking-[0.3em] text-muted-foreground uppercase">
          Loading
        </div>

        {/* Loader line */}
        <div className="w-48 h-[2px] bg-border rounded-full overflow-hidden">
          <div
            className={`h-full bg-primary rounded-full ${
              isLoading ? "loader-line" : ""
            }`}
          />
        </div>
      </div>
    </div>
  )
}
