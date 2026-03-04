export default function ActionPlan({ sessionCount }) {
    let pesan = "";
    let warna = "text-green-500";

    if (sessionCount === 0) {
        pesan = "Mulai hari ini dengan fokus pada tugas penting";
        warna = "text-gray-500";
    } else if (sessionCount <4){
        pesan = "Bagus! Terus tingkatkan fokusmu hari ini.";
        warna = "text-yellow-500";
    } else {
        pesan = "Produktivitas Tinggi! Jangan lupa istirahat.";
    }
  return (
    <div className="bg-white p-6 rounded-2xl ring-1 ring-gray-200">
      <h2 className="text-lg font-semibold text-gray-800">
        Rencana Fokus Harian
      </h2>

      <p className={`mt-3 text-sm ${warna}`}>{pesan}</p>

      <div className="mt-4 text-sm text-gray-600">
        <p>Rekomendasi:</p>
        <ul className="mt-2 space-y-1">
          <li>• Target minimal 4 sesi per hari.</li>
          <li>• Gunakan tanpa gangguan notifikasi.</li>
          <li>• Evaluasi progres di akhir hari.</li>
        </ul>
      </div>
    </div>
  );
}
