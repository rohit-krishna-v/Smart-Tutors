"""
URL configuration for tuition_management project.
"""
from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('dashboard.urls')),
    path('students/', include('students.urls')),
    path('attendance/', include('attendance.urls')),
    path('fees/', include('fees.urls')),
    path('reports/', include('reports.urls')),
    path('login/', auth_views.LoginView.as_view(template_name='registration/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
]