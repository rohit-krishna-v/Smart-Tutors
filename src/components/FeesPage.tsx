import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { CreditCard, IndianRupee, Calendar, Plus, Search } from 'lucide-react';

const feesData = [
  { id: 1, name: 'Rahul Sharma', class: 'Class 12', amount: 5000, paid: 5000, due: 0, status: 'Paid', dueDate: '2025-08-30', lastPayment: '2025-08-01' },
  { id: 2, name: 'Priya Patel', class: 'Class 11', amount: 4500, paid: 2250, due: 2250, status: 'Partial', dueDate: '2025-08-30', lastPayment: '2025-07-15' },
  { id: 3, name: 'Amit Kumar', class: 'Class 10', amount: 4000, paid: 0, due: 4000, status: 'Pending', dueDate: '2025-08-30', lastPayment: '-' },
  { id: 4, name: 'Sneha Singh', class: 'Class 12', amount: 5000, paid: 0, due: 5000, status: 'Overdue', dueDate: '2025-08-15', lastPayment: '-' },
  { id: 5, name: 'Vikram Joshi', class: 'Class 11', amount: 4500, paid: 4500, due: 0, status: 'Paid', dueDate: '2025-08-30', lastPayment: '2025-08-05' }
];

export function FeesPage() {
  const [fees, setFees] = useState(feesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [paymentAmount, setPaymentAmount] = useState('');

  const filteredFees = fees.filter(fee =>
    fee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fee.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAmount = fees.reduce((sum, fee) => sum + fee.amount, 0);
  const totalPaid = fees.reduce((sum, fee) => sum + fee.paid, 0);
  const totalDue = fees.reduce((sum, fee) => sum + fee.due, 0);
  const overdueCount = fees.filter(fee => fee.status === 'Overdue').length;

  const handlePayment = () => {
    const amount = parseFloat(paymentAmount);
    if (selectedStudent && amount > 0) {
      setFees(prev => prev.map(fee => {
        if (fee.id === selectedStudent.id) {
          const newPaid = fee.paid + amount;
          const newDue = fee.amount - newPaid;
          return {
            ...fee,
            paid: newPaid,
            due: newDue,
            status: newDue === 0 ? 'Paid' : 'Partial',
            lastPayment: new Date().toISOString().split('T')[0]
          };
        }
        return fee;
      }));
      setIsPaymentDialogOpen(false);
      setPaymentAmount('');
      setSelectedStudent(null);
    }
  };

  const openPaymentDialog = (student: any) => {
    setSelectedStudent(student);
    setIsPaymentDialogOpen(true);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Fee Management</h1>
          <p className="text-gray-600 mt-1">Track payments and manage student fees</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-2xl font-semibold">₹{totalAmount.toLocaleString()}</p>
              </div>
              <IndianRupee className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Collected</p>
                <p className="text-2xl font-semibold text-green-600">₹{totalPaid.toLocaleString()}</p>
              </div>
              <CreditCard className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Pending</p>
                <p className="text-2xl font-semibold text-orange-600">₹{totalDue.toLocaleString()}</p>
              </div>
              <Calendar className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overdue</p>
                <p className="text-2xl font-semibold text-red-600">{overdueCount}</p>
              </div>
              <Calendar className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Fee Records</CardTitle>
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Total Fee</TableHead>
                <TableHead>Paid</TableHead>
                <TableHead>Due</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Last Payment</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFees.map((fee) => (
                <TableRow key={fee.id}>
                  <TableCell className="font-medium">{fee.name}</TableCell>
                  <TableCell>{fee.class}</TableCell>
                  <TableCell>₹{fee.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-green-600">₹{fee.paid.toLocaleString()}</TableCell>
                  <TableCell className="text-orange-600">₹{fee.due.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={
                      fee.status === 'Paid' ? 'default' :
                      fee.status === 'Partial' ? 'secondary' :
                      fee.status === 'Overdue' ? 'destructive' : 'outline'
                    }>
                      {fee.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{fee.dueDate}</TableCell>
                  <TableCell>{fee.lastPayment}</TableCell>
                  <TableCell>
                    {fee.due > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openPaymentDialog(fee)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Pay
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payment Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Record Payment</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Student</Label>
                <Input value={selectedStudent.name} disabled />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Total Fee</Label>
                  <Input value={`₹${selectedStudent.amount}`} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Due Amount</Label>
                  <Input value={`₹${selectedStudent.due}`} disabled />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment">Payment Amount</Label>
                <Input
                  id="payment"
                  type="number"
                  placeholder="Enter amount"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  max={selectedStudent.due}
                />
              </div>
              <div className="space-y-2">
                <Label>Payment Method</Label>
                <Select defaultValue="cash">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="online">Online Transfer</SelectItem>
                    <SelectItem value="cheque">Cheque</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handlePayment} className="w-full">Record Payment</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}