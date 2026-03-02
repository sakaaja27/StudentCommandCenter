import { useEffect, useMemo, useState } from "react"
import TaskManagerProgress from "../../components/TaskManagerProgress"
import { readStoredArray, STORAGE_KEYS, subscribeStorageUpdates } from "../../utils/storage"

export default function TaskTrackerPage() {
  const [tasks, setTasks] = useState(() => readStoredArray(STORAGE_KEYS.tasks))

  useEffect(() => {
    const refresh = () => setTasks(readStoredArray(STORAGE_KEYS.tasks))
    return subscribeStorageUpdates(refresh)
  }, [])

  const taskMetrics = useMemo(() => {
    const completed = tasks.filter((item) => item.completed).length
    const pending = tasks.length - completed
    const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0

    return [
      { label: "Task Aktif", value: tasks.length, note: "Total task tersimpan" },
      { label: "Task Selesai", value: completed, note: "Sudah diselesaikan" },
      { label: "Progress", value: `${progress}%`, note: `${pending} task masih pending` },
    ]
  }, [tasks])

  const quickTips = [
    "Selesaikan 1 task mudah lebih dulu.",
    "Gunakan filter Pending untuk fokus.",
    "Update checklist di akhir sesi belajar.",
  ]

  return (
    <div className="space-y-4">
      <section className="rounded-2xl bg-white p-5 ring-1 ring-gray-100">
        <h2 className="text-sm font-semibold text-gray-800">Task Guide</h2>
        <p className="mt-2 text-sm text-gray-600">
          Tambah task, centang selesai, lalu pantau progress otomatis.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {taskMetrics.map((item) => (
          <article key={item.label} className="rounded-2xl bg-white p-5 ring-1 ring-gray-100">
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="mt-2 text-2xl font-semibold text-gray-800">{item.value}</p>
            <p className="mt-1 text-xs text-gray-500">{item.note}</p>
          </article>
        ))}
      </section>

      <section className="rounded-2xl bg-white p-5 ring-1 ring-gray-100">
        <h3 className="text-sm font-semibold text-gray-800">Quick Tips</h3>
        <ul className="mt-2 space-y-1 text-sm text-gray-600">
          {quickTips.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </section>

      <TaskManagerProgress />
    </div>
  )
}
