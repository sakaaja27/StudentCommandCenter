export function hitungIPK(daftarSemester) {
  const total = daftarSemester.reduce((a, b) => a + (b || 0), 0)
  return total / daftarSemester.length || 0
}

export function hitungKebutuhanIPK({
  totalSemester,
  targetIPK,
  daftarSemester,
}) {
  const totalSaatIni = daftarSemester.reduce((a, b) => a + (b || 0), 0)
  const semesterTerpakai = daftarSemester.length
  const sisaSemester = totalSemester - semesterTerpakai

  const totalTarget = targetIPK * totalSemester
  const sisaNilai = totalTarget - totalSaatIni

  const rataDibutuhkan =
    sisaSemester > 0 ? sisaNilai / sisaSemester : 0

  return {
    sisaSemester,
    rataDibutuhkan,
  }
}

export function tentukanPredikat(ipk) {
  if (ipk >= 3.9) return "Summa Cumlaude"
  if (ipk >= 3.75) return "Magna Cumlaude"
  if (ipk >= 3.5) return "Cumlaude"
  if (ipk >= 3.0) return "Sangat Memuaskan"
  return "Memuaskan"
}