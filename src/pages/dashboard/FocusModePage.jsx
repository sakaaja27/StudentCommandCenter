import ActionPlan from "../../components/focus/ActionPlan";
import GuideFocusCard from "../../components/focus/GuideFocusCard";
import PomodoTimer from "../../components/focus/PomodoTimer";
import { useState } from "react";

export default function FocusMode() {
  const [sessionCount, setSessionCount] = useState(0);

  return (
    <div className="min-h-screen space-y-4">
      <div className="grid md:grid-cols-2 gap-6">
        <GuideFocusCard/>
        <ActionPlan sessionCount={sessionCount}/>
      </div>
      <PomodoTimer/>
    </div>
  );
}
