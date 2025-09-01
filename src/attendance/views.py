from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.utils import timezone
from django.db.models import Q
from students.models import Student
from .models import Attendance
from .forms import AttendanceForm, AttendanceFilterForm
from django.core.paginator import Paginator


@login_required
def attendance_list(request):
    form = AttendanceFilterForm(request.GET)
    attendance_records = Attendance.objects.select_related('student').all()
    
    if form.is_valid():
        date = form.cleaned_data.get('date')
        grade = form.cleaned_data.get('grade')
        status = form.cleaned_data.get('status')
        
        if date:
            attendance_records = attendance_records.filter(date=date)
        if grade:
            attendance_records = attendance_records.filter(student__grade=grade)
        if status:
            attendance_records = attendance_records.filter(status=status)
    
    paginator = Paginator(attendance_records, 20)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'form': form,
        'page_obj': page_obj,
    }
    
    return render(request, 'attendance/list.html', context)


@login_required
def mark_attendance(request):
    selected_date = request.GET.get('date', timezone.now().date())
    selected_grade = request.GET.get('grade', '')
    
    students = Student.objects.filter(status='active')
    if selected_grade:
        students = students.filter(grade=selected_grade)
    
    if request.method == 'POST':
        for student in students:
            status = request.POST.get(f'status_{student.id}')
            notes = request.POST.get(f'notes_{student.id}', '')
            
            if status:
                attendance, created = Attendance.objects.get_or_create(
                    student=student,
                    date=selected_date,
                    defaults={'status': status, 'notes': notes}
                )
                if not created:
                    attendance.status = status
                    attendance.notes = notes
                    attendance.save()
        
        messages.success(request, 'Attendance marked successfully!')
        return redirect('attendance:mark')
    
    # Get existing attendance for the selected date
    existing_attendance = {}
    attendance_records = Attendance.objects.filter(date=selected_date)
    for record in attendance_records:
        existing_attendance[record.student.id] = record
    
    context = {
        'students': students,
        'selected_date': selected_date,
        'selected_grade': selected_grade,
        'existing_attendance': existing_attendance,
        'grade_choices': Student.GRADE_CHOICES,
        'status_choices': Attendance.STATUS_CHOICES,
    }
    
    return render(request, 'attendance/mark.html', context)


@login_required
def attendance_report(request):
    # Generate attendance summary report
    today = timezone.now().date()
    
    total_students = Student.objects.filter(status='active').count()
    present_today = Attendance.objects.filter(date=today, status='present').count()
    absent_today = Attendance.objects.filter(date=today, status='absent').count()
    late_today = Attendance.objects.filter(date=today, status='late').count()
    
    context = {
        'today': today,
        'total_students': total_students,
        'present_today': present_today,
        'absent_today': absent_today,
        'late_today': late_today,
    }
    
    return render(request, 'attendance/report.html', context)