export default function FeaturesLanding() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold">
          Everything You Need to Stay Productive
        </h2>
        <p className="mt-4 text-gray-600">
          Designed to simplify your academic life.
        </p>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-gray-50 hover:shadow-lg transition">
            <h3 className="font-semibold text-lg">Smart Task Manager</h3>
            <p className="mt-3 text-sm text-gray-600">
              Organize assignments and deadlines effortlessly.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-gray-50 hover:shadow-lg transition">
            <h3 className="font-semibold text-lg">Focus Mode</h3>
            <p className="mt-3 text-sm text-gray-600">
              Built-in Pomodoro timer to maximize concentration.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-gray-50 hover:shadow-lg transition">
            <h3 className="font-semibold text-lg">Progress Analytics</h3>
            <p className="mt-3 text-sm text-gray-600">
              Visual insights into your academic performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
