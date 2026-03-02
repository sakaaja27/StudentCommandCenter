export default function Navbar({ title, subtitle }) {
  const todayLabel = new Date().toLocaleDateString("id-ID", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  })

  return (
    <header className="sticky top-0 z-10 h-16 border-b border-gray-100 bg-white/90 px-6 backdrop-blur">
      <div className="flex h-full items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Dashboard</p>
          <h1 className="text-base font-semibold text-gray-800">{title}</h1>
          <p className="text-[11px] text-gray-500">{subtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-gray-500 sm:inline">{todayLabel}</span>
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-200" />
        </div>
      </div>
    </header>
  )
}