export default function HasilIPK({
  ipkAktual,
  sisaSemester,
  rataDibutuhkan,
  ipkSimulasi,
  predikat,
}) {
  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-gray-200">

      <Card title="IPK Saat Ini" value={ipkAktual.toFixed(2)} />
      <Card title="Sisa Semester" value={sisaSemester} />

      <Card
        title="Rata-rata yang Dibutuhkan"
        value={
          sisaSemester > 0
            ? rataDibutuhkan.toFixed(2)
            : "-"
        }
        highlight={rataDibutuhkan > 4 ? "text-red-500" : "text-green-600"}
      />

      <Card
        title="IPK Jika Semester Berikutnya Sesuai Prediksi"
        value={ipkSimulasi.toFixed(2)}
        highlight="text-blue-600"
      />

      <Card
        title="Estimasi Predikat Kelulusan"
        value={predikat}
        highlight="text-purple-600"
      />
    </div>
  )
}

function Card({ title, value, highlight }) {
  return (
    <div className="p-5 bg-gray-50 rounded-2xl">
      <p className="text-sm text-gray-500">{title}</p>
      <p className={`text-xl font-bold ${highlight || ""}`}>
        {value}
      </p>
    </div>
  )
}