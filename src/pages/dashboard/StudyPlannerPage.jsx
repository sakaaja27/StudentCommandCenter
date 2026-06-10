import { format, parseISO, startOfDay } from "date-fns"
import { useEffect, useMemo, useState } from "react"
import SmartStudyPlanner from "../../components/SmartStudyPlanner"
import { readStoredArray, STORAGE_KEYS, subscribeStorageUpdates } from "../../utils/storage"

export default function StudyPlannerPage() {
  const [deadlines, setDeadlines] = useState(() => readStoredArray(STORAGE_KEYS.deadlines))

  useEffect(() => {
    const refresh = () => setDeadlines(readStoredArray(STORAGE_KEYS.deadlines))
    return subscribeStorageUpdates(refresh)
  }, [])

  const plannerSummary = useMemo(() => {
    const today = startOfDay(new Date())
    const upcoming = deadlines
      .filter((item) => !Number.isNaN(parseISO(item.deadline)) && parseISO(item.deadline) >= today)
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))

    return {
      total: deadlines.length,
      upcomingCount: upcoming.length,
      nearest: upcoming[0] ?? null,
    }
  }, [deadlines])

  const plannerTips = [
    "Tambah deadline segera setelah dapat tugas.",
    "Gunakan preview 3 deadline terdekat setiap pagi.",
    "Sisakan 1 hari buffer sebelum deadline utama.",
  ]

  return (
    <div className="space-y-4">
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="rounded-2xl bg-white p-4 ring-1 ring-gray-200">
          <p className="text-xs text-gray-500">Total Deadline</p>
          <p className="mt-1 text-2xl font-semibold text-gray-800">{plannerSummary.total}</p>
        </article>
        <article className="rounded-2xl bg-white p-4 ring-1 ring-gray-200">
          <p className="text-xs text-gray-500">Deadline Terdekat</p>
          <p className="mt-1 text-2xl font-semibold text-gray-800">{plannerSummary.upcomingCount}</p>
        </article>
        <article className="rounded-2xl bg-white p-4 ring-1 ring-gray-200">
          <p className="text-xs text-gray-500">Tanggal Deadline Terdekat</p>
          <p className="mt-1 text-sm font-semibold text-gray-800">
            {plannerSummary.nearest ? format(parseISO(plannerSummary.nearest.deadline), "dd MMM yyyy") : "-"}
          </p>
        </article>
      </section>

      <section className="rounded-2xl bg-white p-5 ring-1 ring-gray-200">
        <h2 className="text-sm font-semibold text-gray-800">Panduan Planner</h2>
        <ul className="mt-2 space-y-1 text-sm text-gray-600">
          {plannerTips.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </section>

      <SmartStudyPlanner />
    </div>
  )
}
