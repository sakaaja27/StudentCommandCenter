import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement)

export default function GrafikProyeksi({
  daftarSemester,
  totalSemester,
  simulasiIP,
}) {
  const dataProyeksi = [...daftarSemester]

  while (dataProyeksi.length < totalSemester) {
    dataProyeksi.push(simulasiIP)
  }

  const labels = dataProyeksi.map(
    (_, i) => `Semester ${i + 1}`
  )

  const cumulative = []
  dataProyeksi.reduce((acc, val, i) => {
    acc += val
    cumulative.push(acc / (i + 1))
    return acc
  }, 0)

  const data = {
    labels,
    datasets: [
      {
        label: "Proyeksi IPK",
        data: cumulative,
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6",
      },
    ],
  }

  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
      <Line data={data} />
    </div>
  )
}