import { addDays, parseISO, startOfDay } from "date-fns"
import { useEffect, useMemo, useState } from "react"
import WeeklyProductivityChart from "../../components/WeeklyProductivityChart"
import { readStoredArray, STORAGE_KEYS, subscribeStorageUpdates } from "../../utils/storage"

export default function ProductivityInsightsPage() {
  const [tasks, setTasks] = useState(() => readStoredArray(STORAGE_KEYS.tasks))
  const [deadlines, setDeadlines] = useState(() => readStoredArray(STORAGE_KEYS.deadlines))

  useEffect(() => {
    const refresh = () => {
      setTasks(readStoredArray(STORAGE_KEYS.tasks))
      setDeadlines(readStoredArray(STORAGE_KEYS.deadlines))
    }
    return subscribeStorageUpdates(refresh)
  }, [])

  const { keyFindings, actionPlan } = useMemo(() => {
    const completed = tasks.filter((item) => item.completed).length
    const pending = tasks.length - completed
    const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0
    const today = startOfDay(new Date())
    const nextWeek = addDays(today, 7)
    const weekDeadlines = deadlines.filter((item) => {
      const date = parseISO(item.deadline)
      return !Number.isNaN(date) && date >= today && date <= nextWeek
    }).length

    return {
      keyFindings: [
        `Progress task saat ini ${progress}% dari total ${tasks.length || 0} task.`,
        `${pending} task masih pending dan ${weekDeadlines} deadline ada dalam 7 hari.`,
        "Performa akan lebih stabil jika review progress dilakukan setiap akhir hari.",
      ],
      actionPlan: [
        "Selesaikan minimal 1 task pending prioritas setiap hari.",
        "Pantau deadline minggu ini dari Study Planner sebelum mulai belajar.",
        "Gunakan mode chart yang sama tiap minggu untuk evaluasi konsisten.",
      ],
    }
  }, [tasks, deadlines])

  return (
    <div className="space-y-4">
      <section className="rounded-2xl bg-white p-5 ring-1 ring-gray-100">
        <h2 className="text-sm font-semibold text-gray-800">Insight Guide</h2>
        <p className="mt-2 text-sm text-gray-600">
          Lihat pola fokus dan penyelesaian task mingguan secara cepat.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <article className="rounded-2xl bg-white p-5 ring-1 ring-gray-100">
          <h3 className="text-sm font-semibold text-gray-800">Key Findings</h3>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            {keyFindings.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl bg-white p-5 ring-1 ring-gray-100">
          <h3 className="text-sm font-semibold text-gray-800">Action Plan</h3>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            {actionPlan.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </article>
      </section>

      <WeeklyProductivityChart />
    </div>
  )
}
