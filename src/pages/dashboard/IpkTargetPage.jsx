import { useState } from "react";
import { useEffect } from "react";
import {
  hitungIPK,
  hitungKebutuhanIPK,
  tentukanPredikat,
} from "../../utils/IpkController";
import { STORAGE_KEYS } from "../../utils/storage";
import FormIPK from "../../components/ipk/FromIpk";
import HasilIPK from "../../components/ipk/HasilIpk";
import GrafikProyeksi from "../../components/ipk/GrafikProyeksiIpk";
import GuideCard from "../../components/ipk/Guide";
import ActionPlanCard from "../../components/ipk/Action";
import AlertToast from "../../components/ui/AlertToast";

export default function IPKPlanner() {
  const [showAlert, setShowAlert] = useState(false);

  const [state, setState] = useState({
    totalSemester: 8,
    targetIPK: 3.75,
    daftarSemester: [3.4, 3.6],
    simulasiIP: 3.5,
  });

  const { totalSemester, targetIPK, daftarSemester, simulasiIP } = state;
  const setTotalSemester = (value) =>
    setState((prev) => ({ ...prev, totalSemester: value }));
  const setTargetIPK = (value) =>
    setState((prev) => ({ ...prev, targetIPK: value }));
  const setDaftarSemester = (value) =>
    setState((prev) => ({ ...prev, daftarSemester: value }));
  const setSimulasiIP = (value) =>
    setState((prev) => ({ ...prev, simulasiIP: value }));

  const ipkAktual = hitungIPK(daftarSemester);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ipkPlanner);
    if (saved) {
      const parsed = JSON.parse(saved);
      setState({
        totalSemester: parsed.totalSemester || 8,
        targetIPK: parsed.targetIPK || 3.75,
        daftarSemester: parsed.daftarSemester || [3.0],
        simulasiIP: parsed.simulasiIP || 3.5,
      });
    }
  }, []);
  const simpanData = () => {
    const data = {
      totalSemester,
      targetIPK,
      daftarSemester,
      simulasiIP,
    };

    localStorage.setItem(STORAGE_KEYS.ipkPlanner, JSON.stringify(data));

    setShowAlert(true);
  };
  const { sisaSemester, rataDibutuhkan } = hitungKebutuhanIPK({
    totalSemester,
    targetIPK,
    daftarSemester,
  });

  const ipkSimulasi = hitungIPK([...daftarSemester, simulasiIP]);

  const predikat = tentukanPredikat(ipkSimulasi);

  return (
    <div className="min-h-screen space-y-4">
      <AlertToast
        show={showAlert}
        setShow={setShowAlert}
        message="Data IPK berhasil disimpan!"
        type="success"
      />
      <div className="grid md:grid-cols-2 gap-6">
        <GuideCard />

        <ActionPlanCard
          rataDibutuhkan={rataDibutuhkan}
          sisaSemester={sisaSemester}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <FormIPK
          totalSemester={totalSemester}
          setTotalSemester={setTotalSemester}
          targetIPK={targetIPK}
          setTargetIPK={setTargetIPK}
          daftarSemester={daftarSemester}
          setDaftarSemester={setDaftarSemester}
          simulasiIP={simulasiIP}
          setSimulasiIP={setSimulasiIP}
          simpanData={simpanData}
        />

        <HasilIPK
          ipkAktual={ipkAktual}
          sisaSemester={sisaSemester}
          rataDibutuhkan={rataDibutuhkan}
          ipkSimulasi={ipkSimulasi}
          predikat={predikat}
        />
      </div>

      <GrafikProyeksi
        daftarSemester={daftarSemester}
        totalSemester={totalSemester}
        simulasiIP={simulasiIP}
      />
    </div>
  );
}
