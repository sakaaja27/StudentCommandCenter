export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg hidden md:block">
      <div className="p-6 text-xl font-bold text-gray-800">
        Command Center
      </div>

      <nav className="mt-6">
        <ul className="space-y-2 px-4">
          <li className="p-3 rounded-lg bg-blue-100 text-blue-600 font-medium">
            Dashboard
          </li>
          <li className="p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
            Tasks
          </li>
          <li className="p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
            Focus Mode
          </li>
          <li className="p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
            Analytics
          </li>
        </ul>
      </nav>
    </aside>
  )
}