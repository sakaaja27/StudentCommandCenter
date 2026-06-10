import { useState, useEffect } from "react";
import Calendar from "../components/Calender";

export default function Planner() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("plannerTasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("plannerTasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = () => {
    if (!title || !date) return;
    setTasks([...tasks, { id: Date.now(), title, date }]);
    setTitle("");
    setDate("");
  };

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Smart Study Planner</h1>

      <div className="bg-white p-6 rounded-2xl shadow mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Enter task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 px-5 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border rounded-lg px-4 py-2"
          />
          <button
            onClick={addTask}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105 transition duration-300"
          >
            Add
          </button>
        </div>
        <div className="bg-white mt-5 p-6 rounded-2xl shadow border border-gray-200">
          <Calendar tasks={tasks} />
        </div>
      </div>
    </div>
  );
}
