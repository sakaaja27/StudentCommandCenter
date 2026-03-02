import { useEffect, useMemo, useState } from "react"
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns"
import { readStoredArray, STORAGE_KEYS, writeStoredArray } from "../utils/storage"

export default function SmartStudyPlanner() {
  const [monthCursor, setMonthCursor] = useState(new Date())
  const [title, setTitle] = useState("")
  const [deadline, setDeadline] = useState("")
  const [deadlines, setDeadlines] = useState(() => readStoredArray(STORAGE_KEYS.deadlines))

  useEffect(() => {
    writeStoredArray(STORAGE_KEYS.deadlines, deadlines)
  }, [deadlines])

  const gridDays = useMemo(() => {
    const firstDay = startOfMonth(monthCursor)
    const lastDay = endOfMonth(monthCursor)
    return eachDayOfInterval({
      start: startOfWeek(firstDay, { weekStartsOn: 1 }),
      end: endOfWeek(lastDay, { weekStartsOn: 1 }),
    })
  }, [monthCursor])

  const deadlinesByDate = useMemo(
    () =>
      deadlines.reduce((acc, item) => {
        if (!acc[item.deadline]) {
          acc[item.deadline] = []
        }
        acc[item.deadline].push(item)
        return acc
      }, {}),
    [deadlines],
  )

  const upcomingTasks = useMemo(() => {
    const today = startOfDay(new Date())
    return [...deadlines]
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
      .filter((item) => !Number.isNaN(new Date(item.deadline)) && parseISO(item.deadline) >= today)
      .slice(0, 3)
  }, [deadlines])

  const addDeadline = (event) => {
    event.preventDefault()
    const cleanTitle = title.trim()
    if (!cleanTitle || !deadline) {
      return
    }

    const newTask = {
      id: crypto.randomUUID(),
      title: cleanTitle,
      deadline,
    }

    setDeadlines((previous) => [...previous, newTask])
    setTitle("")
    setDeadline("")
  }

  const removeDeadline = (id) => {
    setDeadlines((previous) => previous.filter((item) => item.id !== id))
  }

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Smart Study Planner</h2>
          <p className="text-sm text-gray-500">Kelola deadline tugas dalam kalender sederhana.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMonthCursor((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 transition hover:bg-gray-100"
          >
            Prev
          </button>
          <p className="min-w-36 text-center text-sm font-semibold text-gray-700">{format(monthCursor, "MMMM yyyy")}</p>
          <button
            type="button"
            onClick={() => setMonthCursor((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 transition hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[2fr_1fr]">
        <div>
          <form onSubmit={addDeadline} className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-[1.6fr_1fr_auto]">
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Contoh: Laporan Matematika"
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none ring-blue-100 transition focus:ring-2"
            />
            <input
              type="date"
              value={deadline}
              onChange={(event) => setDeadline(event.target.value)}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none ring-blue-100 transition focus:ring-2"
            />
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Add Deadline
            </button>
          </form>

          <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div key={day} className="rounded-lg bg-gray-50 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="mt-2 grid grid-cols-7 gap-2">
            {gridDays.map((day) => {
              const dateKey = format(day, "yyyy-MM-dd")
              const hasDeadline = Boolean(deadlinesByDate[dateKey]?.length)
              return (
                <div
                  key={dateKey}
                  className={`min-h-20 rounded-xl border p-2 text-xs transition ${
                    isSameMonth(day, monthCursor) ? "bg-white" : "bg-gray-50 text-gray-400"
                  } ${hasDeadline ? "border-red-200 bg-red-50" : "border-gray-100"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-semibold ${isSameDay(day, new Date()) ? "text-blue-600" : "text-gray-700"}`}>
                      {format(day, "d")}
                    </span>
                    {hasDeadline && <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-semibold text-white">{deadlinesByDate[dateKey].length}</span>}
                  </div>
                  {hasDeadline && (
                    <p className="mt-2 line-clamp-2 rounded-md bg-red-100 px-1.5 py-1 text-[10px] font-medium text-red-700">
                      {deadlinesByDate[dateKey][0].title}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <aside className="rounded-xl border border-gray-100 bg-gray-50 p-4">
          <h3 className="text-sm font-semibold text-gray-800">Next 3 Deadlines</h3>
          <div className="mt-3 space-y-2">
            {upcomingTasks.length === 0 && <p className="text-sm text-gray-500">Belum ada deadline yang akan datang.</p>}

            {upcomingTasks.map((item) => (
              <div key={item.id} className="rounded-lg border border-gray-200 bg-white p-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium text-gray-700">{item.title}</p>
                    <p className="mt-1 text-xs text-red-600">{format(parseISO(item.deadline), "dd MMM yyyy")}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeDeadline(item.id)}
                    className="rounded-md px-2 py-1 text-xs text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  )
}