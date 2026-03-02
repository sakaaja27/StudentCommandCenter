import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/LandingPages";
import Dashboard from "./pages/Dashboard";
import Planner from "./pages/Planners";
import DashboardLayout from "./layouts/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route element={<DashboardLayout />}> 
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/study-planner" element={<Planner />} />
          <Route path="/Focus-Mode" element={<Dashboard />} />
          <Route path="/Analytics-Mode" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}