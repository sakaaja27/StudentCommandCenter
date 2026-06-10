import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Navbar({ title, subtitle }) {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const todayLabel = new Date().toLocaleDateString("id-ID", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  })

  const handleLogout = () => {
    setIsMenuOpen(false)
    navigate("/")
  }

  return (
    <header className="sticky top-0 z-10 h-14 sm:h-16 border-b border-gray-200 bg-white/90 px-4 sm:px-6 backdrop-blur">
      <div className="flex h-full items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wide text-gray-400">Dashboard</p>
          <h1 className="text-sm sm:text-base font-semibold text-gray-800 truncate">{title}</h1>
          <p className="hidden sm:block text-[11px] text-gray-500 truncate">{subtitle}</p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <span className="hidden text-xs sm:text-sm text-gray-500 md:inline whitespace-nowrap">{todayLabel}</span>
          
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 transition flex items-center justify-center text-sm font-semibold text-blue-700"
            >
              U
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-gray-200 py-1 z-50">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  )
}