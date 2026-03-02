export default function UpcomingDeadline({ tasks = [] }) {
  return (
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
  );
}
