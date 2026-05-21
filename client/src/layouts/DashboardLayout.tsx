import Sidebar from "@/components/sidebar/Sidebar"
import Navbar from "@/components/navbar/Navbar"
import { Outlet } from "react-router-dom"

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-background text-white md:flex">
      <Sidebar />

      <div className="flex flex-1 flex-col min-w-0">
        <Navbar />

        <main
          className="
            flex-1
            overflow-x-hidden
            p-4
            sm:p-6
            md:p-8
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}