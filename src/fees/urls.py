from django.urls import path
from . import views

app_name = 'fees'

urlpatterns = [
    path('', views.fee_list, name='list'),
    path('add/', views.fee_add, name='add'),
    path('<int:pk>/pay/', views.record_payment, name='pay'),
    path('payments/', views.payment_list, name='payments'),
    path('types/', views.fee_type_list, name='types'),
    path('types/add/', views.fee_type_add, name='type_add'),
]