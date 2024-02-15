from django.urls import path
from .views import *

urlpatterns=[
    path('adminlogin/',AdminLogin.as_view()),
    path('adminuserlist/',AdminUserList.as_view()),
    path('adminuserupdate/<int:pk>/',AdminUserUpdate.as_view()),
    path('adminuserdelete/<int:pk>/',AdminUserDelete.as_view()),
    path('adminusersearch/',AdminSearchUser.as_view()),
]