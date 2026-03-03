import { addDays, format, isAfter, parseISO, startOfDay } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import {
  readStoredArray,
  STORAGE_KEYS,
  subscribeStorageUpdates,
} from "../../utils/storage";
import { hitungIPK } from "../../utils/IpkController";

export default function DashboardOverviewPage() {
  const [tasks, setTasks] = useState(() => readStoredArray(STORAGE_KEYS.tasks));
  const [deadlines, setDeadlines] = useState(() =>
    readStoredArray(STORAGE_KEYS.deadlines),
  );
  const [ipkData, setIpkData] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.ipkPlanner);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  useEffect(() => {
    const refresh = () => {
      setTasks(readStoredArray(STORAGE_KEYS.tasks));
      setDeadlines(readStoredArray(STORAGE_KEYS.deadlines));
      const rawIPK = localStorage.getItem(STORAGE_KEYS.ipkPlanner);
      setIpkData(rawIPK ? JSON.parse(rawIPK) : null);
    };

    return subscribeStorageUpdates(refresh);
  }, []);

  const metrics = useMemo(() => {
    const today = startOfDay(new Date());
    const nextWeek = addDays(today, 7);
    const completedTasks = tasks.filter((item) => item.completed).length;
    const pendingTasks = tasks.length - completedTasks;
    const weekDeadlines = deadlines.filter((item) => {
      const date = parseISO(item.deadline);
      return !Number.isNaN(date) && isAfter(date, today) && date <= nextWeek;
    }).length;
    const progress = tasks.length
      ? Math.round((completedTasks / tasks.length) * 100)
      : 0;
    const nearestDeadline = [...deadlines]
      .filter((item) => !Number.isNaN(parseISO(item.deadline)))
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))[0];
    const ipkSaatIni = ipkData?.daftarSemester?.length
      ? hitungIPK(ipkData.daftarSemester)
      : 0;

    const ipkTarget = ipkData?.targetIPK || 0;

    const progressIPK =
      ipkTarget > 0
        ? Math.min(Math.round((ipkSaatIni / ipkTarget) * 100), 100)
        : 0;

    return {
      completedTasks,
      pendingTasks,
      weekDeadlines,
      progress,
      nearestDeadline,
      ipkSaatIni,
      ipkTarget,
      progressIPK,
    };
  }, [tasks, deadlines, ipkData]);

  const quickStats = [
    { label: "Deadline 7 Hari", value: metrics.weekDeadlines },
    { label: "Task Selesai", value: metrics.completedTasks },
    { label: "Task Pending", value: metrics.pendingTasks },
    { label: "Progress Task", value: `${metrics.progress}%` },
    {
      label: "IPK Saat Ini",
      value: metrics.ipkSaatIni ? metrics.ipkSaatIni.toFixed(2) : "-",
    },
    {
      label: "Target IPK",
      value: metrics.ipkTarget ? metrics.ipkTarget.toFixed(2) : "-",
    },
  ];

  const todayChecklist = [
    "Selesaikan 1 tugas prioritas",
    "Fokus belajar minimal 2 jam",
    "Cek deadline besok",
  ];

  return (
    <div className="space-y-4">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {quickStats.map((item) => (
          <article
            key={item.label}
            className="rounded-2xl bg-white p-5 ring-1 ring-gray-200"
          >
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="mt-2 text-2xl font-semibold text-gray-800">
              {item.value}
            </p>
          </article>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1.2fr_1fr]">
        <article className="rounded-2xl bg-white p-5 ring-1 ring-gray-200">
          <h3 className="text-sm font-semibold text-gray-800">Quick Notes</h3>
          <p className="mt-2 text-sm text-gray-600">
            {metrics.nearestDeadline
              ? `Deadline terdekat: ${metrics.nearestDeadline.title} (${format(parseISO(metrics.nearestDeadline.deadline), "dd MMM")}).`
              : "Belum ada deadline. Tambahkan tugas di Study Planner."}
          </p>
        </article>

        <article className="rounded-2xl bg-white p-5 ring-1 ring-gray-200">
          <h3 className="text-sm font-semibold text-gray-800">
            Today Checklist
          </h3>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            {todayChecklist.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}
