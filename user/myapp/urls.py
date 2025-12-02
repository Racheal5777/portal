from django.urls import path
from . import views
urlpatterns = [
    path('', views.user_form, name='user_form'),
    path('admin/', views.admin, name='admin'),
    path('admin/login/', views.admin_login, name='admin_login'),
]