import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar, Users, UserCheck, UserX, Save } from 'lucide-react';

const attendanceData = [
  { id: 1, name: 'Rahul Sharma', class: 'Class 12', subject: 'Mathematics', status: 'present' },
  { id: 2, name: 'Priya Patel', class: 'Class 11', subject: 'Physics', status: 'present' },
  { id: 3, name: 'Amit Kumar', class: 'Class 10', subject: 'Chemistry', status: 'absent' },
  { id: 4, name: 'Sneha Singh', class: 'Class 12', subject: 'Biology', status: 'present' },
  { id: 5, name: 'Vikram Joshi', class: 'Class 11', subject: 'Mathematics', status: 'late' },
  { id: 6, name: 'Ravi Gupta', class: 'Class 10', subject: 'Physics', status: 'present' },
  { id: 7, name: 'Anita Reddy', class: 'Class 12', subject: 'Chemistry', status: 'present' },
  { id: 8, name: 'Kiran Shah', class: 'Class 11', subject: 'Biology', status: 'absent' }
];

export function AttendancePage() {
  const [attendance, setAttendance] = useState(attendanceData);
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const filteredAttendance = selectedClass === 'all' 
    ? attendance 
    : attendance.filter(student => student.class === selectedClass);

  const presentCount = filteredAttendance.filter(s => s.status === 'present').length;
  const absentCount = filteredAttendance.filter(s => s.status === 'absent').length;
  const lateCount = filteredAttendance.filter(s => s.status === 'late').length;

  const updateAttendance = (id: number, status: 'present' | 'absent' | 'late') => {
    setAttendance(prev => prev.map(student => 
      student.id === id ? { ...student, status } : student
    ));
  };

  const saveAttendance = () => {
    // Mock save functionality
    alert('Attendance saved successfully!');
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Attendance</h1>
          <p className="text-gray-600 mt-1">Mark and track student attendance</p>
        </div>
        <Button onClick={saveAttendance} className="bg-green-600 hover:bg-green-700">
          <Save className="w-4 h-4 mr-2" />
          Save Attendance
        </Button>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-4 bg-white p-4 rounded-lg border">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-600" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm"
          />
        </div>
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Classes</SelectItem>
            <SelectItem value="Class 10">Class 10</SelectItem>
            <SelectItem value="Class 11">Class 11</SelectItem>
            <SelectItem value="Class 12">Class 12</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl font-semibold">{filteredAttendance.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Present</p>
                <p className="text-2xl font-semibold text-green-600">{presentCount}</p>
              </div>
              <UserCheck className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Absent</p>
                <p className="text-2xl font-semibold text-red-600">{absentCount}</p>
              </div>
              <UserX className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Late</p>
                <p className="text-2xl font-semibold text-orange-600">{lateCount}</p>
              </div>
              <Calendar className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Mark Attendance - {selectedDate}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAttendance.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>{student.subject}</TableCell>
                  <TableCell>
                    <Badge variant={
                      student.status === 'present' ? 'default' :
                      student.status === 'late' ? 'secondary' : 'destructive'
                    }>
                      {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant={student.status === 'present' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => updateAttendance(student.id, 'present')}
                        className="text-green-600 hover:text-green-700"
                      >
                        Present
                      </Button>
                      <Button
                        variant={student.status === 'late' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => updateAttendance(student.id, 'late')}
                        className="text-orange-600 hover:text-orange-700"
                      >
                        Late
                      </Button>
                      <Button
                        variant={student.status === 'absent' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => updateAttendance(student.id, 'absent')}
                        className="text-red-600 hover:text-red-700"
                      >
                        Absent
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}