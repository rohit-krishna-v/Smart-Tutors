from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.core.paginator import Paginator
from django.db.models import Q
from .models import Student
from .forms import StudentForm


@login_required
def student_list(request):
    search_query = request.GET.get('search', '')
    grade_filter = request.GET.get('grade', '')
    status_filter = request.GET.get('status', '')
    
    students = Student.objects.all()
    
    if search_query:
        students = students.filter(
            Q(first_name__icontains=search_query) |
            Q(last_name__icontains=search_query) |
            Q(student_id__icontains=search_query) |
            Q(email__icontains=search_query)
        )
    
    if grade_filter:
        students = students.filter(grade=grade_filter)
    
    if status_filter:
        students = students.filter(status=status_filter)
    
    paginator = Paginator(students, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'page_obj': page_obj,
        'search_query': search_query,
        'grade_filter': grade_filter,
        'status_filter': status_filter,
        'grade_choices': Student.GRADE_CHOICES,
        'status_choices': Student.STATUS_CHOICES,
    }
    
    return render(request, 'students/list.html', context)


@login_required
def student_detail(request, pk):
    student = get_object_or_404(Student, pk=pk)
    return render(request, 'students/detail.html', {'student': student})


@login_required
def student_add(request):
    if request.method == 'POST':
        form = StudentForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Student added successfully!')
            return redirect('students:list')
    else:
        form = StudentForm()
    
    return render(request, 'students/form.html', {'form': form, 'title': 'Add Student'})


@login_required
def student_edit(request, pk):
    student = get_object_or_404(Student, pk=pk)
    
    if request.method == 'POST':
        form = StudentForm(request.POST, instance=student)
        if form.is_valid():
            form.save()
            messages.success(request, 'Student updated successfully!')
            return redirect('students:detail', pk=pk)
    else:
        form = StudentForm(instance=student)
    
    return render(request, 'students/form.html', {
        'form': form, 
        'title': 'Edit Student',
        'student': student
    })


@login_required
def student_delete(request, pk):
    student = get_object_or_404(Student, pk=pk)
    
    if request.method == 'POST':
        student.delete()
        messages.success(request, 'Student deleted successfully!')
        return redirect('students:list')
    
    return render(request, 'students/delete.html', {'student': student})