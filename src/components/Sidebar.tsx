import { cn } from './ui/utils';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  CreditCard, 
  FileText, 
  Settings,
  BookOpen
} from 'lucide-react';

const navigationItems = [
  { name: 'Dashboard', icon: LayoutDashboard, id: 'dashboard' },
  { name: 'Students', icon: Users, id: 'students' },
  { name: 'Attendance', icon: Calendar, id: 'attendance' },
  { name: 'Fees', icon: CreditCard, id: 'fees' },
  { name: 'Reports', icon: FileText, id: 'reports' },
  { name: 'Settings', icon: Settings, id: 'settings' },
];

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  return (
    <div className="bg-white border-r border-gray-200 w-64 h-full flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">TuitionHub</h2>
            <p className="text-sm text-gray-500">Management System</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors",
                activeView === item.id
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}