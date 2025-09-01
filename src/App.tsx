import { useState } from "react";
import { LoginPage } from "./components/LoginPage";
import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Navbar";
import { Dashboard } from "./components/Dashboard";
import { StudentsPage } from "./components/StudentsPage";
import { AttendancePage } from "./components/AttendancePage";
import { FeesPage } from "./components/FeesPage";
import { ReportsPage } from "./components/ReportsPage";
import { SettingsPage } from "./components/SettingsPage";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveView("dashboard");
  };

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />;
      case "students":
        return <StudentsPage />;
      case "attendance":
        return <AttendancePage />;
      case "fees":
        return <FeesPage />;
      case "reports":
        return <ReportsPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="hidden lg:block fixed inset-y-0 left-0 z-50">
        <Sidebar
          activeView={activeView}
          onViewChange={setActiveView}
        />
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 flex-1 flex flex-col min-h-0">
        {/* Top Navbar */}
        <Navbar onLogout={handleLogout} />

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>

      {/* Mobile Sidebar Overlay - for future mobile responsiveness */}
      <div className="lg:hidden">
        {/* Mobile sidebar would go here */}
      </div>
    </div>
  );
}