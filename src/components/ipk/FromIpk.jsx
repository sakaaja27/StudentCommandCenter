import { useState, useEffect } from "react"

export default function FormIPK({
  totalSemester,
  setTotalSemester,
  targetIPK,
  setTargetIPK,
  daftarSemester,
  setDaftarSemester,
  simulasiIP,
  setSimulasiIP,
  simpanData,
}) {
  const [error, setError] = useState("")

  const tambahSemester = () => {
    setDaftarSemester([...daftarSemester, 0])
  }

  const hapusSemester = (index) => {
    if (daftarSemester.length <= 1) return
    const updated = daftarSemester.filter((_, i) => i !== index)
    setDaftarSemester(updated)
  }

  const ubahSemester = (index, value) => {
    const angka = parseFloat(value)

    if (angka > 4 || angka < 0) {
      setError("IP semester harus berada di antara 0.00 - 4.00")
      return
    }

    setError("")
    const updated = [...daftarSemester]
    updated[index] = angka
    setDaftarSemester(updated)
  }

  const handleTargetChange = (value) => {
    const angka = parseFloat(value)

    if (angka > 4 || angka < 0) {
      setError("Target IPK harus berada di antara 0.00 - 4.00")
      return
    }

    setError("")
    setTargetIPK(angka)
  }

  const handleSimulasiChange = (value) => {
    const angka = parseFloat(value)

    if (angka > 4 || angka < 0) return

    setSimulasiIP(angka)
  }

  const adaInputKosong = daftarSemester.some(
    (ip) => ip === null || ip === undefined || ip === ""
  )

  const bolehSimpan = !error && !adaInputKosong

  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-gray-200">

      <div>
        <label className="text-sm text-gray-500 block my-3">
          Total Semester
        </label>
        <input
          type="number"
          min="1"
          value={totalSemester}
          onChange={(e) =>
            setTotalSemester(parseInt(e.target.value))
          }
          className="w-full px-4 py-3 rounded-2xl border border-gray-200"
        />
      </div>

      <div>
        <label className="text-sm text-gray-500 block my-3">
          Target IPK
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          max="4"
          value={targetIPK}
          onChange={(e) =>
            handleTargetChange(e.target.value)
          }
          className={`w-full px-4 py-3 rounded-2xl border ${
            error ? "border-red-400" : "border-gray-200"
          }`}
        />
      </div>

      <div>
        <label className="text-sm text-gray-500 block mb-4">
          IP Semester yang Sudah Ditempuh
        </label>

        <div className="space-y-3">
          {daftarSemester.map((sem, index) => (
            <div key={index} className="flex gap-3">
              <input
                type="number"
                step="0.01"
                min="0"
                max="4"
                placeholder={`Semester ${index + 1}`}
                value={sem}
                onChange={(e) =>
                  ubahSemester(index, e.target.value)
                }
                className={`flex-1 px-4 py-3 rounded-2xl border ${
                  error ? "border-red-400" : "border-gray-200"
                }`}
              />

              <button
                onClick={() => hapusSemester(index)}
                disabled={daftarSemester.length <= 1}
                className="px-4 py-3 rounded-2xl bg-red-50 text-red-500 hover:bg-red-100 transition disabled:opacity-40"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={tambahSemester}
          className="mt-4 px-5 py-2 bg-blue-500 text-white rounded-xl hover:opacity-80 transition"
        >
          + Tambah Semester
        </button>
      </div>

      <div>
        <label className="text-sm  text-gray-500 block my-3">
          Prediksi IP Semester Berikutnya
        </label>

        <input
          type="range"
          min="0"
          max="4"
          step="0.01"
          value={simulasiIP}
          onChange={(e) =>
            handleSimulasiChange(e.target.value)
          }
          className="w-full"
        />

        <p className="mt-2 font-semibold">
          {simulasiIP.toFixed(2)}
        </p>
      </div>

      {error && (
        <div className="text-sm text-red-500 bg-red-50 p-3 rounded-xl">
          {error}
        </div>
      )}

      <button
        onClick={simpanData}
        disabled={!bolehSimpan}
        className={`w-full my-3 py-3 rounded-2xl font-semibold transition ${
          bolehSimpan
            ? "bg-blue-500 text-white hover:scale-[1.02]"
            : "bg-gray-200 text-gray-500 cursor-not-allowed"
        }`}
      >
        Simpan Data
      </button>
    </div>
  )
}