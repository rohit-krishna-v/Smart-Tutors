import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Users, UserCheck, CreditCard, Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import { Badge } from './ui/badge';

const summaryCards = [
  {
    title: 'Total Students',
    value: '248',
    change: '+12',
    changeType: 'increase',
    icon: Users,
    color: 'bg-blue-500'
  },
  {
    title: 'Present Today',
    value: '195',
    change: '+5',
    changeType: 'increase',
    icon: UserCheck,
    color: 'bg-green-500'
  },
  {
    title: 'Pending Fees',
    value: '₹45,680',
    change: '-₹2,300',
    changeType: 'decrease',
    icon: CreditCard,
    color: 'bg-orange-500'
  },
  {
    title: 'Upcoming Exams',
    value: '3',
    change: '2 this week',
    changeType: 'neutral',
    icon: Calendar,
    color: 'bg-purple-500'
  }
];

const recentActivities = [
  { action: 'New student enrolled', student: 'Rahul Sharma', time: '2 hours ago' },
  { action: 'Fee payment received', student: 'Priya Patel', time: '4 hours ago' },
  { action: 'Attendance marked', student: 'Class 10-A', time: '6 hours ago' },
  { action: 'Exam scheduled', student: 'Mathematics - Class 12', time: '1 day ago' }
];

const upcomingExams = [
  { subject: 'Mathematics', class: 'Class 12', date: '2025-08-30', time: '10:00 AM' },
  { subject: 'Physics', class: 'Class 11', date: '2025-09-02', time: '2:00 PM' },
  { subject: 'Chemistry', class: 'Class 12', date: '2025-09-05', time: '10:00 AM' }
];

export function Dashboard() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-full">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Welcome back, Admin!</h1>
        <p className="text-gray-600 mt-1">Here's what's happening at your tuition center today.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                    <p className="text-2xl font-semibold text-gray-900">{card.value}</p>
                    <div className="flex items-center mt-2">
                      {card.changeType === 'increase' && <TrendingUp className="w-3 h-3 text-green-500 mr-1" />}
                      {card.changeType === 'decrease' && <TrendingDown className="w-3 h-3 text-red-500 mr-1" />}
                      <span className={`text-xs ${
                        card.changeType === 'increase' ? 'text-green-600' : 
                        card.changeType === 'decrease' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {card.change}
                      </span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.student}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">{activity.time}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Exams */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Exams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingExams.map((exam, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{exam.subject}</p>
                    <p className="text-xs text-gray-500">{exam.class}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-900">{exam.date}</p>
                    <p className="text-xs text-gray-500">{exam.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}