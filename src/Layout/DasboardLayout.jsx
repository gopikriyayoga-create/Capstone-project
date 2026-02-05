import { Outlet, Navigate, useLocation } from "react-router";
import Sidebar from "../Component/Sidebar";

export default function DashboardLayout() {
  const location = useLocation();

  // Correct way to handle redirect within the component body
  if (location.pathname === "/dashboard") {
    return <Navigate to="/dashboard/overview" replace />;
  }

  return (
    
    <main className="flex h-dvh bg-black">
      
    
      <aside className="flex-1 max-w-55">
        <Sidebar />
      </aside>

    
      <section className="flex flex-col flex-1 h-full">
        
        
        <div className="flex overflow-y-auto">
          <Outlet />
        </div>
        
      </section>
    </main>
  );
}
