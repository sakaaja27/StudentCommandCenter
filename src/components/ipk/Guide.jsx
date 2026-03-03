export default function GuideCard() {
  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-gray-200">
      <h2 className="text-xl font-semibold mb-4">
        Panduan Penggunaan
      </h2>

      <ul className="space-y-3 text-sm text-gray-600">
        <li>• Masukkan total semester program studi Anda.</li>
        <li>• Isi IP setiap semester yang sudah ditempuh.</li>
        <li>• Tentukan target IPK akhir yang ingin dicapai.</li>
        <li>• Gunakan slider untuk prediksi IP semester berikutnya.</li>
        <li>• Perhatikan proyeksi dan rata-rata yang dibutuhkan.</li>
      </ul>
    </div>
  )
}