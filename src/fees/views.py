from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.core.paginator import Paginator
from django.db.models import Q, Sum
from .models import Fee, Payment, FeeType
from .forms import FeeForm, PaymentForm, FeeTypeForm


@login_required
def fee_list(request):
    search_query = request.GET.get('search', '')
    status_filter = request.GET.get('status', '')
    
    fees = Fee.objects.select_related('student', 'fee_type').all()
    
    if search_query:
        fees = fees.filter(
            Q(student__first_name__icontains=search_query) |
            Q(student__last_name__icontains=search_query) |
            Q(student__student_id__icontains=search_query)
        )
    
    if status_filter:
        fees = fees.filter(status=status_filter)
    
    paginator = Paginator(fees, 15)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    # Summary statistics
    total_pending = Fee.objects.filter(status='pending').aggregate(
        total=Sum('amount'))['total'] or 0
    total_paid = Fee.objects.filter(status='paid').aggregate(
        total=Sum('amount'))['total'] or 0
    total_overdue = Fee.objects.filter(status='overdue').aggregate(
        total=Sum('amount'))['total'] or 0
    
    context = {
        'page_obj': page_obj,
        'search_query': search_query,
        'status_filter': status_filter,
        'status_choices': Fee.STATUS_CHOICES,
        'total_pending': total_pending,
        'total_paid': total_paid,
        'total_overdue': total_overdue,
    }
    
    return render(request, 'fees/list.html', context)


@login_required
def fee_add(request):
    if request.method == 'POST':
        form = FeeForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Fee added successfully!')
            return redirect('fees:list')
    else:
        form = FeeForm()
    
    return render(request, 'fees/form.html', {'form': form, 'title': 'Add Fee'})


@login_required
def record_payment(request, pk):
    fee = get_object_or_404(Fee, pk=pk)
    
    if request.method == 'POST':
        form = PaymentForm(request.POST)
        if form.is_valid():
            payment = form.save(commit=False)
            payment.fee = fee
            payment.save()
            
            # Update fee status if fully paid
            total_payments = fee.payments.aggregate(
                total=Sum('amount'))['total'] or 0
            if total_payments >= fee.amount:
                fee.status = 'paid'
                fee.save()
            
            messages.success(request, 'Payment recorded successfully!')
            return redirect('fees:list')
    else:
        form = PaymentForm()
    
    context = {
        'form': form,
        'fee': fee,
        'title': f'Record Payment for {fee.student.full_name}'
    }
    
    return render(request, 'fees/payment_form.html', context)


@login_required
def payment_list(request):
    payments = Payment.objects.select_related('fee__student', 'fee__fee_type').all()
    
    paginator = Paginator(payments, 20)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    return render(request, 'fees/payments.html', {'page_obj': page_obj})


@login_required
def fee_type_list(request):
    fee_types = FeeType.objects.filter(is_active=True)
    return render(request, 'fees/types.html', {'fee_types': fee_types})


@login_required
def fee_type_add(request):
    if request.method == 'POST':
        form = FeeTypeForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Fee type added successfully!')
            return redirect('fees:types')
    else:
        form = FeeTypeForm()
    
    return render(request, 'fees/type_form.html', {'form': form, 'title': 'Add Fee Type'})