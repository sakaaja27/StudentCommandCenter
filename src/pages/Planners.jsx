import { useState, useEffect } from "react";

export default function Planner() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("plannerTasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("plannerTasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!title || !date) return;
    setTasks([...tasks, { id: Date.now(), title, date }]);
    setTitle("");
    setDate("");
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Smart Study Planner</h1>

      {/* Input Form */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-2"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border rounded-lg px-4 py-2"
          />
          <button
            onClick={addTask}
            className="bg-black text-white px-6 py-2 rounded-lg hover:opacity-80 transition"
          >
            Add
          </button>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <Calendar tasks={tasks} />
        </div>
      </div>
    </div>
  );
}

function Calendar({ tasks }) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        {today.toLocaleString("default", { month: "long" })} {year}
      </h2>

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

          return (
            <div
              key={index}
              className={`h-20 flex items-center justify-center rounded-xl border 
              ${day ? "bg-gray-50" : "bg-transparent border-none"} 
              ${hasTask ? "border-red-500 bg-red-50" : ""}`}
            >
              {day}
            </div>
          );
        })}
      </div>
      <div className="bg-white p-6 rounded-2xl shadow mt-8">
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
