export default function GuideFocusCard() {
  return (
    <div className="bg-white p-6 rounded-2xl ring-1 ring-gray-200">
      <h2 className="text-lg font-semibold text-gray-800">
        Panduan Focus Mode
      </h2>

      <ul className="mt-3 space-y-2 text-sm text-gray-600">
        <li>• Klik Start untuk memulai sesi 25 menit.</li>
        <li>• Gunakan Pause jika ingin berhenti sementara.</li>
        <li>• Klik Reset untuk mengulang timer.</li>
        <li>• Satu sesi selesai akan menambah penghitung fokus.</li>
        <li>• Disarankan istirahat 5 menit setiap sesi selesai.</li>
      </ul>
    </div>
  )
}
