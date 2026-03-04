import {motion} from "framer-motion";
export default function FeaturesLanding() {
  const features = [
    {
      id: 1,
      title: "Smart Task Management",
      description: "Atur tugas dan tenggat waktu dengan mudah."
    },
    {
      id: 2,
      title: "Focus Mode",
      description: "Timer Pomodoro bawaan untuk memaksimalkan konsentrasi."
    },
    {
      id: 3,
      title: "Progress Analytics",
      description: "Wawasan visual tentang performa akademik Anda."
    }
    
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold">
          Semua yang Anda Butuhkan untuk Tetap Produktif
        </h2>
        <p className="mt-4 text-gray-600">
          Dirancang untuk menyederhanakan kehidupan akademik Anda.
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
