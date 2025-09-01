from django.urls import path
from . import views

app_name = 'reports'

urlpatterns = [
    path('', views.reports_dashboard, name='dashboard'),
    path('students/', views.student_reports, name='students'),
    path('attendance/', views.attendance_reports, name='attendance'),
    path('financial/', views.financial_reports, name='financial'),
]