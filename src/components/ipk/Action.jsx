export default function ActionPlanCard({
  rataDibutuhkan,
  sisaSemester,
}) {
  let rekomendasi = ""
  let warna = "text-green-600"

  if (sisaSemester === 0) {
    rekomendasi = "Semua semester telah ditempuh."
  } else if (rataDibutuhkan > 4) {
    rekomendasi =
      "Target sulit dicapai. Pertimbangkan menyesuaikan target atau konsultasi akademik."
    warna = "text-red-500"
  } else if (rataDibutuhkan > 3.75) {
    rekomendasi =
      "Anda perlu performa sangat tinggi di semester tersisa. Fokus pada manajemen waktu dan prioritas."
    warna = "text-orange-500"
  } else if (rataDibutuhkan > 3.5) {
    rekomendasi =
      "Target realistis dengan konsistensi belajar dan strategi evaluasi rutin."
  } else {
    rekomendasi =
      "Target sangat realistis. Pertahankan konsistensi dan evaluasi setiap semester."
  }

  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-gray-200">
      <h2 className="text-xl font-semibold mb-4">
        Rencana Aksi Akademik
      </h2>

      <p className={`text-sm ${warna}`}>
        {rekomendasi}
      </p>

      {sisaSemester > 0 && (
        <div className="mt-4 text-sm text-gray-600">
          <p>Strategi yang disarankan:</p>
          <ul className="mt-2 space-y-2">
            <li>• Prioritaskan mata kuliah dengan bobot SKS besar.</li>
            <li>• Evaluasi metode belajar setiap akhir semester.</li>
            <li>• Manfaatkan konsultasi dosen pembimbing.</li>
            <li>• Gunakan fitur Focus Mode secara konsisten.</li>
          </ul>
        </div>
      )}
    </div>
  )
}