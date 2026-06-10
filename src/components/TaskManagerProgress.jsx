import { useEffect, useMemo, useState } from "react"
import { readStoredArray, STORAGE_KEYS, writeStoredArray } from "../utils/storage"

export default function TaskManagerProgress() {
  const [taskName, setTaskName] = useState("")
  const [filter, setFilter] = useState("all")
  const [tasks, setTasks] = useState(() => readStoredArray(STORAGE_KEYS.tasks))

  useEffect(() => {
    writeStoredArray(STORAGE_KEYS.tasks, tasks)
  }, [tasks])

  const completedTasks = tasks.filter((task) => task.completed).length
  const progress = tasks.length ? Math.round((completedTasks / tasks.length) * 100) : 0

  const filteredTasks = useMemo(() => {
    if (filter === "completed") {
      return tasks.filter((task) => task.completed)
    }
    if (filter === "pending") {
      return tasks.filter((task) => !task.completed)
    }
    return tasks
  }, [filter, tasks])

  const addTask = (event) => {
    event.preventDefault()
    const cleanTaskName = taskName.trim()
    if (!cleanTaskName) {
      return
    }

    setTasks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: cleanTaskName,
        completed: false,
      },
    ])
    setTaskName("")
  }

  const toggleTask = (id) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const removeTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Manajer Tugas</h2>
          <p className="text-sm text-gray-500">Track task harian dan progres otomatis.</p>
        </div>
        <span className="rounded-lg bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">{progress}%</span>
      </div>

      <form onSubmit={addTask} className="mb-4 flex flex-col gap-2 md:flex-row">
        <input
          type="text"
          value={taskName}
          onChange={(event) => setTaskName(event.target.value)}
          placeholder="Tambahkan task baru"
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none ring-blue-100 transition focus:ring-2"
        />
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
         Tambah Tugas
        </button>
      </form>

      <div>
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium text-gray-700">
            {completedTasks}/{tasks.length || 0} selesai
          </span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {["all", "completed", "pending"].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition ${
              filter === item ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-2">
        {filteredTasks.length === 0 && <p className="text-sm text-gray-500">Tidak ada task untuk filter ini.</p>}

        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-3 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="h-4 w-4 accent-blue-600"
              />
              <span className={`text-sm ${task.completed ? "text-gray-400 line-through" : "text-gray-700"}`}>
                {task.title}
              </span>
            </div>
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-medium ${task.completed ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
            >
              {task.completed ? "Selesai" : "Pending"}
            </span>
            <button
              type="button"
              onClick={() => removeTask(task.id)}
              className="ml-2 rounded-md px-2 py-1 text-xs text-red-500 transition bg-red-100"
            >
              Hapus
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}