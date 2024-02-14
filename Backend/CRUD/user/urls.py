from django.urls import path
from .views import *

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('userList/',UserView.as_view(),name='userView'),
    path('userlogin/',LoginView.as_view(),name='login_view'),
    path('userlogout/',UserLogout.as_view(),name='userlogout'),
    
]
