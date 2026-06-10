import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { subDays, format } from "date-fns";
import { useEffect, useState } from "react";
import {
  STORAGE_KEYS,
  readStoredArray,
  subscribeStorageUpdates,
} from "../../utils/storage";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function WeeklyProductivityChart() {
  const [dataSesi, setDataSesi] = useState(() =>
    readStoredArray(STORAGE_KEYS.FocusMode),
  );

  const hariIndonesia = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];

  useEffect(() => {
    const refresh = () => {
      setDataSesi(readStoredArray(STORAGE_KEYS.FocusMode));
    };

    return subscribeStorageUpdates(refresh);
  }, []);

  const labels = [];
  const values = [];

  for (let i = 6; i >= 0; i--) {
    const dateKey = format(subDays(new Date(), i), "yyyy-MM-dd");
    const dayOfWeek = new Date(subDays(new Date(), i)).getDay();
    const label = hariIndonesia[dayOfWeek];

    const found = dataSesi.find((item) => item.date === dateKey);

    labels.push(label);
    values.push(found ? parseInt(found.count, 10) : 0);
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Sesi Fokus",
        data: values,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderWidth: 2,
        fill: true,
        pointRadius: 5,
        pointBackgroundColor: "#3b82f6",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          callback: function (value) {
            return Number.isInteger(value) ? value : "";
          },
        },
      },
    },
  };

  return (
    <div className="w-full bg-white p-6 rounded-2xl ring-1 ring-gray-200">
      <h3 className="text-sm font-semibold text-gray-800 mb-4">
        Produktivitas 7 Hari Terakhir
      </h3>
      <Line data={data} options={options} />
    </div>
  );
}
