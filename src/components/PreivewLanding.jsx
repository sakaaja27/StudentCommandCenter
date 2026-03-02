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

          <div className="mt-16 rounded-3xl shadow-2xl overflow-hidden border">
            <img
              src="https://via.placeholder.com/1200x600"
              alt="Dashboard Preview"
              className="w-full"
            />
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
