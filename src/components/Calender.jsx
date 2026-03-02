import { useState } from "react";
export default function Calendar({ tasks }) {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(null);

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
        >
          ←
        </button>

        <h2 className="text-xl font-semibold">
          {currentDate.toLocaleString("default", { month: "long" })} {year}
        </h2>

        <button
          onClick={nextMonth}
          className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          const dateStr = day
            ? `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
            : null;

          const hasTask = tasks.some((task) => task.date === dateStr);

          const todayStr = `${today.getFullYear()}-${String(
            today.getMonth() + 1,
          ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
          const isToday = dateStr === todayStr;
          const isDeadline = hasTask;

          return (
            <div
              key={index}
              onClick={() => day && setSelectedDate(dateStr)}
              className={`h-24 p-3 rounded-2xl border flex flex-col justify-between
                ${isToday
                  ? "bg-blue-100 border-blue-200"
                  : isDeadline
                  ? "bg-red-200 border-red-500"
                  : "bg-white border-gray-200"}
                hover:shadow-md transition duration-300`}
            >
              {day}
            </div>
          );
        })}
      </div>

      {selectedDate && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl w-[400px] p-8 shadow-2xl">
            <h3 className="text-lg font-semibold mb-4">
              Tasks on {selectedDate}
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto">
              {tasks.filter((t) => t.date === selectedDate).length === 0 && (
                <p className="text-gray-500 text-sm">No tasks.</p>
              )}

              {tasks
                .filter((t) => t.date === selectedDate)
                .map((task) => (
                  <div key={task.id} className="p-3 bg-gray-50 rounded-xl">
                    {task.title}
                  </div>
                ))}
            </div>

            <button
              onClick={() => setSelectedDate(null)}
              className="mt-6 w-full py-2 bg-black text-white rounded-xl hover:opacity-80 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="p-5 mt-5 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition">
        <h2 className="text-lg font-semibold mb-4">Upcoming Deadlines</h2>

        <div className="space-y-3">
          {tasks
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 3)
            .map((task) => (
              <div
                key={task.id}
                className="p-4 bg-gray-50 rounded-xl flex justify-between"
              >
                <span>{task.title}</span>
                <span className="text-sm text-gray-500">{task.date}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
