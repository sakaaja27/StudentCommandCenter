import { Link } from "react-router-dom";
import NavbarLanding from "../components/NavbarLanding";
import FeaturesLanding from "../components/FeaturesLanding";
import PreviewLanding from "../components/PreivewLanding";
import Cta from "../components/Cta";
import Footer from "../components/FooterLanding";

export default function Landing() {
  return (
    <div className="bg-white text-gray-900">
      <NavbarLanding/>
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-linear-to-br from-blue-500 via-white to-purple-50">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight max-w-4xl">
          The Smart Productivity Hub for{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Modern Students
          </span>
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl">
          AtherFlow menggabungkan task management, study planning, dan fokus mode dalam satu platform yang dirancang khusus untuk kebutuhan pelajar masa kini.
        </p>

        
      </section>
      <FeaturesLanding/>
      <PreviewLanding/>
      <Cta/>
      <Footer/>
    </div>
  );
}
