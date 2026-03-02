import { Link } from "react-router-dom";
import NavbarLanding from "../components/NavbarLanding";
export default function Landing() {

  return (
    <div className="bg-white text-gray-900">
      <NavbarLanding/>
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-linear-to-br from-blue-500 via-white to-purple-50">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight max-w-4xl">
          The Smart Productivity Hub for Modern Students
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl">
          Organize tasks, track goals, and boost academic performance — all in
          one intelligent dashboard.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            to="/dashboard"
            className="px-6 py-3 rounded-lg bg-black text-white hover:opacity-80 transition"
          >
            Try Demo
          </Link>

          <button className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition">
            Learn More
          </button>
        </div>
      </section>
    </div>
  );
}
