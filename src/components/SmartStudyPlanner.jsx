import { useEffect, useMemo, useState } from "react";
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
} from "date-fns";
import {
  readStoredArray,
  STORAGE_KEYS,
  writeStoredArray,
} from "../utils/storage";

export default function SmartStudyPlanner() {
  const [monthCursor, setMonthCursor] = useState(new Date());
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [deadlines, setDeadlines] = useState(() =>
    readStoredArray(STORAGE_KEYS.deadlines),
  );
  const [selectedDeadline, setSelectedDeadline] = useState(null);

  useEffect(() => {
    writeStoredArray(STORAGE_KEYS.deadlines, deadlines);
  }, [deadlines]);

  const gridDays = useMemo(() => {
    const firstDay = startOfMonth(monthCursor);
    const lastDay = endOfMonth(monthCursor);
    return eachDayOfInterval({
      start: startOfWeek(firstDay, { weekStartsOn: 1 }),
      end: endOfWeek(lastDay, { weekStartsOn: 1 }),
    });
  }, [monthCursor]);

  const deadlinesByDate = useMemo(
    () =>
      deadlines.reduce((acc, item) => {
        if (!acc[item.deadline]) {
          acc[item.deadline] = [];
        }
        acc[item.deadline].push(item);
        return acc;
      }, {}),
    [deadlines],
  );

  const upcomingTasks = useMemo(() => {
    const today = startOfDay(new Date());
    return [...deadlines]
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
      .filter(
        (item) =>
          !Number.isNaN(new Date(item.deadline)) &&
          parseISO(item.deadline) >= today,
      )
      .slice(0, 3);
  }, [deadlines]);

  const addDeadline = (event) => {
    event.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle || !deadline) {
      return;
    }

    const newTask = {
      id: crypto.randomUUID(),
      title: cleanTitle,
      deadline,
    };

    setDeadlines((previous) => [...previous, newTask]);
    setTitle("");
    setDeadline("");
  };

  const removeDeadline = (id) => {
    setDeadlines((previous) => previous.filter((item) => item.id !== id));
  };

  return (
    <section className="rounded-2xl bg-white p-4 sm:p-6 shadow-sm ring-1 ring-gray-200">
      <div className="mb-6 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Smart Study Planner
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Kelola deadline tugas dalam kalender sederhana.
          </p>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() =>
              setMonthCursor(
                (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
              )
            }
            className="rounded-lg border border-gray-200 px-2 sm:px-3 py-1.5 text-xs sm:text-sm text-gray-600 transition hover:bg-gray-100"
          >
            ◀ Sebelum
          </button>
          <p className="flex-1 sm:flex-none text-center text-xs sm:text-sm font-semibold text-gray-700">
            {format(monthCursor, "MMM yyyy")}
          </p>
          <button
            type="button"
            onClick={() =>
              setMonthCursor(
                (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
              )
            }
            className="rounded-lg border border-gray-200 px-2 sm:px-3 py-1.5 text-xs sm:text-sm text-gray-600 transition hover:bg-gray-100"
          >
            Selanjutnya ▶
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-[2fr_1fr]">
        <div>
          <form
            onSubmit={addDeadline}
            className="mb-4 grid grid-cols-1 gap-2 sm:gap-3 sm:grid-cols-[1.6fr_1fr_auto]"
          >
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Contoh: Laporan Matematika"
              className="rounded-lg border border-gray-200 px-3 py-2 text-xs sm:text-sm outline-none ring-blue-100 transition focus:ring-2"
            />
            <input
              type="date"
              value={deadline}
              onChange={(event) => setDeadline(event.target.value)}
              className="rounded-lg border border-gray-200 px-3 py-2 text-xs sm:text-sm outline-none ring-blue-100 transition focus:ring-2"
            />
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white transition hover:bg-blue-700 whitespace-nowrap"
            >
              Tambah
            </button>
          </form>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-gray-500">
            {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((day) => (
              <div key={day} className="rounded-lg bg-gray-50 py-1.5 sm:py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="mt-1 sm:mt-2 grid grid-cols-7 gap-1 sm:gap-2">
            {gridDays.map((day) => {
              const dateKey = format(day, "yyyy-MM-dd");
              const hasDeadline = Boolean(deadlinesByDate[dateKey]?.length);
              return (
                <div
                  key={dateKey}
                  className={`min-h-16 sm:min-h-20 rounded-lg sm:rounded-xl border p-1 sm:p-2 text-[10px] sm:text-xs transition ${
                    isSameMonth(day, monthCursor)
                      ? "bg-white"
                      : "bg-gray-200 text-gray-400"
                  } ${hasDeadline ? "border-red-200 bg-red-50" : "border-gray-200"}`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className={`font-semibold ${isSameDay(day, new Date()) ? "text-blue-600" : "text-gray-700"}`}
                    >
                      {format(day, "d")}
                    </span>
                    {hasDeadline && (
                      <span className="rounded-full bg-red-500 px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] font-semibold text-white flex-shrink-0">
                        {deadlinesByDate[dateKey].length}
                      </span>
                    )}
                  </div>
                  {hasDeadline && (
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedDeadline(deadlinesByDate[dateKey][0])
                      }
                      className="mt-1 line-clamp-2 w-full rounded-md bg-red-100 px-1 sm:px-1.5 py-0.5 sm:py-1 text-[8px] sm:text-[10px] font-medium text-red-700 transition hover:bg-red-200 cursor-pointer text-left"
                    >
                      {deadlinesByDate[dateKey][0].title}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <aside className="rounded-xl border border-gray-200 bg-gray-50 p-3 sm:p-4">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-800">
            3 Deadline Terdekat
          </h3>
          <div className="mt-3 space-y-2">
            {upcomingTasks.length === 0 && (
              <p className="text-xs sm:text-sm text-gray-500">
                Belum ada deadline yang akan datang.
              </p>
            )}

            {upcomingTasks.map((item) => (
              <div
                key={item.id}
                className="rounded-lg border border-gray-200 bg-white p-2 sm:p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-medium text-gray-700 line-clamp-2">
                      {item.title}
                    </p>
                    <p className="mt-1 text-[10px] sm:text-xs text-red-600">
                      {format(parseISO(item.deadline), "dd MMM yyyy")}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeDeadline(item.id)}
                    className="rounded-md px-1.5 sm:px-2 py-1 text-[10px] sm:text-xs transition bg-red-50 text-red-600 hover:bg-red-100 flex-shrink-0"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {selectedDeadline && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 sm:p-8 shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-800">
              Detail Deadline
            </h3>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">
                  Title
                </p>
                <p className="mt-2 text-sm sm:text-base text-gray-800">
                  {selectedDeadline.title}
                </p>
              </div>

              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">
                  Tanggal Deadline
                </p>
                <p className="mt-2 text-sm sm:text-base text-red-600 font-semibold">
                  {format(parseISO(selectedDeadline.deadline), "dd MMMM yyyy")}
                </p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setSelectedDeadline(null)}
                className="flex-1 rounded-xl bg-gray-200 px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 transition hover:bg-gray-300"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => {
                  removeDeadline(selectedDeadline.id);
                  setSelectedDeadline(null);
                }}
                className="flex-1 rounded-xl bg-red-600 px-4 py-2 text-xs sm:text-sm font-medium text-white transition hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
