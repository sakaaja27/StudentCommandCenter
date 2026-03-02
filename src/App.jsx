import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Landing from "./pages/LandingPages"
import Dashboard from "./pages/Dashboard"
import DashboardOverviewPage from "./pages/dashboard/DashboardOverviewPage"
import StudyPlannerPage from "./pages/dashboard/StudyPlannerPage"
import TaskTrackerPage from "./pages/dashboard/TaskTrackerPage"
import ProductivityInsightsPage from "./pages/dashboard/ProductivityInsightsPage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<DashboardOverviewPage />} />
          <Route path="study-planner" element={<StudyPlannerPage />} />
          <Route path="task-tracker" element={<TaskTrackerPage />} />
          <Route path="productivity-insights" element={<ProductivityInsightsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}