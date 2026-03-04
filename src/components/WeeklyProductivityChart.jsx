import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js"
import { Bar, Line } from "react-chartjs-2"
import { useEffect, useState } from "react"

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend)

const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const focusHours = [2.5, 3, 1.5, 4, 2, 5, 3.5]
const tasksCompletion = [3, 4, 2, 6, 4, 7, 5]
const CHART_MODE_KEY = "scc-chart-mode"

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: "rgba(148, 163, 184, 0.2)",
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
}

export default function WeeklyProductivityChart() {
  const [mode, setMode] = useState(() => localStorage.getItem(CHART_MODE_KEY) || "bar")

  useEffect(() => {
    localStorage.setItem(CHART_MODE_KEY, mode)
  }, [mode])

  const chartData =
    mode === "bar"
      ? {
          labels,
          datasets: [
            {
              label: "Focus Hours",
              data: focusHours,
              backgroundColor: "rgba(59, 130, 246, 0.8)",
              borderRadius: 8,
              maxBarThickness: 34,
            },
          ],
        }
      : {
          labels,
          datasets: [
            {
              label: "Tasks Completed",
              data: tasksCompletion,
              borderColor: "rgba(37, 99, 235, 0.95)",
              backgroundColor: "rgba(59, 130, 246, 0.15)",
              borderWidth: 3,
              pointBackgroundColor: "rgba(37, 99, 235, 1)",
              pointRadius: 4,
              tension: 0.35,
              fill: true,
            },
          ],
        }

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Chart Produktivitas Mingguan</h2>
          <p className="text-sm text-gray-500">Visualisasi produktivitas mingguan dengan data fokus dan task.</p>
        </div>

        <div className="rounded-lg bg-gray-100 p-1 text-sm">
          <button
            type="button"
            onClick={() => setMode("bar")}
            className={`rounded-md px-3 py-1.5 transition ${mode === "bar" ? "bg-white text-blue-600 shadow" : "text-gray-600"}`}
          >
            Bar
          </button>
          <button
            type="button"
            onClick={() => setMode("line")}
            className={`rounded-md px-3 py-1.5 transition ${mode === "line" ? "bg-white text-blue-600 shadow" : "text-gray-600"}`}
          >
            Line
          </button>
        </div>
      </div>

      <div className="h-72">
        {mode === "bar" ? <Bar data={chartData} options={options} /> : <Line data={chartData} options={options} />}
      </div>
    </section>
  )
}