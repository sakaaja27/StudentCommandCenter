export default function Navbar() {
  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-gray-700">
        Dashboard Overview
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">Welcome back 👋</span>
        <div className="w-8 h-8 rounded-full bg-gray-300"></div>
      </div>
    </header>
  )
}