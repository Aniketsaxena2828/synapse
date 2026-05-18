export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="
      min-h-screen
      bg-background
      flex items-center
      justify-center
      px-6
    ">
      <div className="
        w-full
        max-w-md
        bg-card
        border border-border
        rounded-2xl
        p-8
        shadow-glow
      ">
        {children}
      </div>
    </div>
  )
}