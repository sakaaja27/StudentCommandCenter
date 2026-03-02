export default function Dashboard() {
  return (
    <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-gray-600 text-sm">Total Tasks</h2>
        <p className="text-3xl font-bold mt-2">12</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-gray-600 text-sm">Completed</h2>
        <p className="text-3xl font-bold mt-2">8</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-gray-600 text-sm">Focus Hours</h2>
        <p className="text-3xl font-bold mt-2">24h</p>
      </div>
    </main>
  );
}