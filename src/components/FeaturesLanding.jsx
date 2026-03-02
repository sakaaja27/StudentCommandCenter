import { motion } from "framer-motion";

export default function FeaturesLanding() {
  const features = [
    {
      id: 1,
      title: "Smart Task Manager",
      description: "Organize assignments and deadlines effortlessly."
    },
    {
      id: 2,
      title: "Focus Mode",
      description: "Built-in Pomodoro timer to maximize concentration."
    },
    {
      id: 3,
      title: "Progress Analytics",
      description: "Visual insights into your academic performance."
    }
  ];

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
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-gray-50 hover:shadow-lg transition border border-gray-300"
            >
              <h3 className="font-semibold text-lg">{feature.title}</h3>
              <p className="mt-3 text-sm text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
