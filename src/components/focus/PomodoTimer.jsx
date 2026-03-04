import { useState, useEffect, useRef } from "react";
import { DURASI_DEFAULT, formatTime } from "../../utils/PomodoroUtils";
import {
  STORAGE_KEYS,
  readStoredArray,
  writeStoredArray,
} from "../../utils/storage";
import { format } from "date-fns";

export default function PomodoTimer({ sessionCount = 0, setSessionCount }) {
  const todayKey = format(new Date(), "yyyy-MM-dd");

  const [waktu, setWaktu] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.pomodoTimer);
      if (saved) {
        const { waktu: savedWaktu, aktif, lastUpdate } = JSON.parse(saved);

        if (aktif) {
          const elapsed = Math.floor((Date.now() - lastUpdate) / 1000);
          const newWaktu = Math.max(0, savedWaktu - elapsed);
          return newWaktu;
        }
        return savedWaktu;
      }
    } catch (e) {
      console.error("Error loading timer state:", e);
    }
    return DURASI_DEFAULT;
  });

  const [aktif, setAktif] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.pomodoTimer);
      if (saved) {
        const { aktif: savedAktif } = JSON.parse(saved);
        return savedAktif;
      }
    } catch (e) {
      console.error("Error loading timer state:", e);
    }
    return false;
  });

  const intervalRef = useRef(null);

  useEffect(() => {
    const timerState = {
      waktu,
      aktif,
      lastUpdate: Date.now(),
    };
    localStorage.setItem(STORAGE_KEYS.pomodoTimer, JSON.stringify(timerState));
  }, [waktu, aktif]);

  const simpanSesi = () => {
    const existing = readStoredArray(STORAGE_KEYS.FocusMode);
    const index = existing.findIndex((item) => item.date === todayKey);

    if (index !== -1) {
      existing[index].count += 1;
    } else {
      existing.push({ date: todayKey, count: 1 });
    }

    writeStoredArray(STORAGE_KEYS.FocusMode, existing);

    setSessionCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (!aktif) return;
    if (aktif) {
      intervalRef.current = setInterval(() => {
        setWaktu((prev) => {
          return prev > 1 ? prev - 1 : 0;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [aktif]);

  useEffect(() => {
    if (waktu === 0 && aktif) {
      setAktif(false);
      clearInterval(intervalRef.current);
      simpanSesi();
      setWaktu(DURASI_DEFAULT);
    }
  }, [waktu, aktif, setSessionCount]);

  useEffect(() => {
    const existing = readStoredArray(STORAGE_KEYS.FocusMode);
    const todayData = existing.find((item) => item.date === todayKey);

    setSessionCount(todayData ? todayData.count : 0);
  }, []);

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
