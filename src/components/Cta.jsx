import { Link } from "react-router-dom";
export default function Cta() {
  return (
    <>
      <section
        id="cta"
        className="py-24 bg-linear-to-br from-blue-600 to-purple-600 text-white text-center"
      >
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold">
            Siap Mentransformasi Alur Kerja Akademik Anda?
          </h2>

          <p className="mt-4 text-white/80">
            Rasakan masa depan produktivitas mahasiswa hari ini.
          </p>

          <div className="mt-8">
            <Link
              to="/dashboard"
              className="px-8 py-4 rounded-xl bg-white text-black font-medium hover:opacity-90 transition"
            >
              Coba Sekarang
            </Link>
          </div>
        </div>
      </section>
      
    </>
  );
}
