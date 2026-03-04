import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
export default function NavbarLanding() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 w-full z-50 transition ${
        scrolled ? "bg-white/40 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="font-bold text-xl tracking-tight">
          Aether<span className="text-blue-900">Flow</span>
        </h1>

        <div className="hidden md:flex gap-8 text-sm text-gray-600">
          <a href="#features" className="hover:text-black transition">
            Fiture
          </a>
          <a href="#preview" className="hover:text-black transition">
            Sekilas
          </a>
          <a href="#cta" className="hover:text-black transition">
            Coba Sekarang
          </a>
        </div>

        <Link
          to="/dashboard"
          className="px-5 py-2 rounded-lg bg-black text-white text-sm hover:opacity-80 transition"
        >
          Coba Demo
        </Link>
      </div>
    </header>
  );
}
