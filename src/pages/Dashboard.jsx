import { Outlet, useLocation } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"

export default function Dashboard() {
  const location = useLocation()

  const menuItems = [
    { path: "/dashboard/overview", label: "Overview" },
    { path: "/dashboard/study-planner", label: "Study Planner" },
    { path: "/dashboard/task-tracker", label: "Task Tracker" },
    { path: "/dashboard/productivity-insights", label: "Productivity Insights" },
  ]

  const metaByPath = {
    "/dashboard/overview": {
      title: "Overview",
      subtitle: "Ringkasan cepat aktivitas belajar.",
    },
    "/dashboard/study-planner": {
      title: "Study Planner",
      subtitle: "Kelola deadline dengan simpel.",
    },
    "/dashboard/task-tracker": {
      title: "Task Tracker",
      subtitle: "Track task dan progress otomatis.",
    },
    "/dashboard/productivity-insights": {
      title: "Productivity Insights",
      subtitle: "Insight mingguan berbasis chart.",
    },
  }

  const currentMeta = metaByPath[location.pathname] ?? metaByPath["/dashboard/overview"]

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <Sidebar menuItems={menuItems} />

      <div className="flex-1 flex flex-col">
        <Navbar title={currentMeta.title} subtitle={currentMeta.subtitle} />

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}