import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import { readStoredArray, STORAGE_KEYS, subscribeStorageUpdates } from "../utils/storage"
import { format, parseISO } from "date-fns"

export default function Sidebar({ menuItems }) {
  const [summary, setSummary] = useState({
    tasks: 0,
    completed: 0,
    pending: 0,
    deadlines: 0,
    dueSoon: 0,
    completionRate: 0,
    upcomingDeadlines: [],
  })

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const refresh = () => {
      const taskData = readStoredArray(STORAGE_KEYS.tasks)
      const deadlineData = readStoredArray(STORAGE_KEYS.deadlines)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const inSevenDays = new Date(today)
      inSevenDays.setDate(inSevenDays.getDate() + 7)

      const completed = taskData.filter((item) => item.completed).length
      const completionRate = taskData.length ? Math.round((completed / taskData.length) * 100) : 0
      const dueSoon = deadlineData.filter((item) => {
        const date = new Date(item.deadline)
        return !Number.isNaN(date.getTime()) && date >= today && date <= inSevenDays
      }).length
      const upcomingDeadlines = [...deadlineData]
        .filter((item) => !Number.isNaN(new Date(item.deadline).getTime()) && new Date(item.deadline) >= today)
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
        .slice(0, 3)

      setSummary({
        tasks: taskData.length,
        completed,
        pending: taskData.length - completed,
        deadlines: deadlineData.length,
        dueSoon,
        completionRate,
        upcomingDeadlines,
      })
    }

    refresh()
    return subscribeStorageUpdates(refresh)
  }, [])

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 flex md:hidden flex-col gap-1.5 rounded-lg bg-white p-2.5 ring-1 ring-gray-200 hover:bg-gray-50"
        aria-label="Toggle sidebar"
      >
        <div className={`h-0.5 w-6 bg-gray-700 transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`}></div>
        <div className={`h-0.5 w-6 bg-gray-700 transition-all ${isOpen ? "opacity-0" : ""}`}></div>
        <div className={`h-0.5 w-6 bg-gray-700 transition-all ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}></div>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 border-r border-gray-200 bg-white transition-transform duration-300 md:sticky md:translate-x-0 md:block ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:flex md:flex-col`}
      >
        <div className="p-6 pb-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Student Command</p>
          <p className="mt-1 text-xl font-bold text-gray-800">AtherFLow</p>
        </div>

        <nav className="mt-2 flex-1">
          <p className="px-6 pb-2 text-[11px] font-semibold uppercase tracking-wide text-gray-400">Navigasi</p>
          <ul className="space-y-2 px-4">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === "/dashboard/overview"}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                      isActive
                        ? "bg-blue-50 text-blue-700 ring-1 ring-blue-100"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                    }`
                  }
                >
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="m-4 rounded-xl border border-gray-100 bg-gray-50 p-3">
          <p className="text-xs font-semibold text-gray-700">Ringkasan Cepat</p>
          <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-gray-600">
            <p>Total Tugas: {summary.tasks}</p>
            <p>Selesai: {summary.completed}</p>
            <p>Pending: {summary.pending}</p>
            <p>Deadline: {summary.deadlines}</p>
            <p className="col-span-2">Deadline dalam 7 hari: {summary.dueSoon}</p>
          </div>

          <div className="mt-3">
            <div className="mb-1 flex items-center justify-between text-[11px] text-gray-600">
              <span>Rate Selesai</span>
              <span className="font-semibold text-gray-700">{summary.completionRate}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-500"
                style={{ width: `${summary.completionRate}%` }}
              />
            </div>
          </div>

          <div className="mt-3 border-t border-gray-200 pt-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">Deadline Mendatang</p>
            <div className="mt-2 space-y-1.5">
              {summary.upcomingDeadlines.length === 0 && <p className="text-[11px] text-gray-500">Tidak ada deadline yang akan datang</p>}

              {summary.upcomingDeadlines.map((item) => (
                <div key={item.id} className="rounded-lg border border-gray-200 bg-white px-2 py-1.5">
                  <p className="truncate text-[11px] font-medium text-gray-700">{item.title}</p>
                  <p className="text-[10px] text-gray-500">{format(parseISO(item.deadline), "dd MMM yyyy")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}