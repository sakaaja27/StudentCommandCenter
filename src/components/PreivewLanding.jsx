import { motion } from "framer-motion";
import { useEffect, useState } from "react";
export default function PreviewLanding() {
  function Counter({ target }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const duration = 1500;
      const increment = target / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [target]);

    return <span>{count}</span>;
  }
  return (
    <>
      <section
        id="preview"
        className="py-24 bg-linear-to-br from-gray-50 to-white"
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold">A Dashboard Built for Clarity</h2>
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 blur-2xl opacity-40 rounded-3xl"></div>

            <div className="relative rounded-3xl shadow-2xl overflow-hidden border bg-white transform hover:scale-[1.02] transition duration-500">
              <img
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Dashboard Preview"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 bg-white text-center">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-4xl font-bold text-blue-600">
              <Counter target={1200} />+
            </h3>
            <p className="mt-2 text-gray-600">Tasks Managed</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-purple-600">
              <Counter target={350} />+
            </h3>
            <p className="mt-2 text-gray-600">Focus Sessions</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-pink-600">
              <Counter target={98} />%
            </h3>
            <p className="mt-2 text-gray-600">Productivity Boost</p>
          </div>
        </div>
      </section>
    </>
  );
}
