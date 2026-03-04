export const DURASI_DEFAULT = 0.2 * 60
export function formatTime(totalseconds){
    const minutes = Math.floor(totalseconds / 60)
    const seconds = totalseconds % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`
}