import Sidebar from "@/components/sidebar/Sidebar"
import Navbar from "@/components/navbar/Navbar"
import { Outlet } from "react-router-dom"

export default function DashboardLayout() {
  return (
    <div className="flex bg-background min-h-screen text-white">
      
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}