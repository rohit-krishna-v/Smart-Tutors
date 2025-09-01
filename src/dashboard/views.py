from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.utils import timezone
from students.models import Student
from attendance.models import Attendance
from fees.models import Fee
from datetime import timedelta


@login_required
def dashboard(request):
    today = timezone.now().date()
    
    # Summary statistics
    total_students = Student.objects.filter(status='active').count()
    
    # Present today count
    present_today = Attendance.objects.filter(
        date=today,
        status='present'
    ).count()
    
    # Pending fees
    pending_fees = Fee.objects.filter(status='pending').count()
    
    # Upcoming exams (mock data for now)
    upcoming_exams = 3
    
    # Recent activities (mock data)
    recent_activities = [
        {'type': 'student', 'message': 'New student John Doe enrolled', 'time': '2 hours ago'},
        {'type': 'payment', 'message': 'Payment received from Jane Smith', 'time': '3 hours ago'},
        {'type': 'attendance', 'message': 'Attendance marked for Grade 10', 'time': '5 hours ago'},
    ]
    
    # Attendance chart data (last 7 days)
    chart_dates = []
    present_counts = []
    absent_counts = []
    
    for i in range(6, -1, -1):
        date = today - timedelta(days=i)
        chart_dates.append(date.strftime('%m/%d'))
        
        present_count = Attendance.objects.filter(date=date, status='present').count()
        absent_count = Attendance.objects.filter(date=date, status='absent').count()
        
        present_counts.append(present_count)
        absent_counts.append(absent_count)
    
    context = {
        'total_students': total_students,
        'present_today': present_today,
        'pending_fees': pending_fees,
        'upcoming_exams': upcoming_exams,
        'recent_activities': recent_activities,
        'chart_dates': chart_dates,
        'present_counts': present_counts,
        'absent_counts': absent_counts,
    }
    
    return render(request, 'dashboard/dashboard.html', context)


@login_required
def settings(request):
    return render(request, 'dashboard/settings.html')