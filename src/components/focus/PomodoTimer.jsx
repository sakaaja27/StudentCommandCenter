import { useState, useEffect, useRef } from "react";
import { DURASI_DEFAULT, formatTime } from "../../utils/PomodoroUtils";
export default function PomodoTimer({sessionCount = 0, setSessionCount}) {
  const [waktu, setWaktu] = useState(DURASI_DEFAULT);
  const [aktif, setAktif] = useState(false);

  const intervalRef = useRef(null);

  useEffect(() => {
    if(!aktif) return;
    if (aktif) {
      intervalRef.current = setInterval(() => {
        setWaktu((prev) => {
          return prev > 1 ? prev -1 : 0
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [aktif]);

  useEffect(()  => {
    if (waktu === 0 && aktif) {
        typeof setSessionCount === "function" &&
        setSessionCount((s) => s +1);
        setAktif(false);
        setWaktu(DURASI_DEFAULT);
    }
  }, [waktu, aktif, setSessionCount])

  const start = () => setAktif(true);
  const pause = () => setAktif(false);
  const reset = () => {
    setAktif(false);
    setWaktu(DURASI_DEFAULT);
  };

  const progress = (waktu / DURASI_DEFAULT) * 100;
  return (
    <div
      className={`rounded-3xl p-10 text-center transition-all duration-500 ${
        aktif ? "bg-blue-100" : "bg-white"
      } ring-1 ring-gray-200`}
    >
      <div className="relative w-48 h-48 mx-auto">
        <svg className="w-full h-full rotate-[-90deg]">
          <circle
            cx="96"
            cy="96"
            r="80"
            stroke="#e5e7eb"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx="96"
            cy="96"
            r="80"
            stroke="#3b82f6"
            strokeWidth="10"
            fill="none"
            strokeDasharray={502}
            strokeDashoffset={502 - (progress / 100) * 502}
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-gray-800">
          {formatTime(waktu)}
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <button
          onClick={start}
          className="px-5 py-2 rounded-xl bg-green-600 text-white"
        >
          Start
        </button>
        <button
          onClick={pause}
          className="px-5 py-2 rounded-xl bg-yellow-500 text-white"
        >
          Pause
        </button>
        <button
          onClick={reset}
          className="px-5 py-2 rounded-xl bg-gray-700 text-white"
        >
          Reset
        </button>
      </div>

      <p className="mt-6 text-sm text-gray-600">
        Sesi selesai hari ini:{" "}
        <span className="font-semibold">{sessionCount}</span>
      </p>
    </div>
  );
}
