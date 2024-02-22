from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager,PermissionsMixin,AbstractUser
from django.utils import timezone
from datetime import date


# Create your models here.
class CustomUserManager(BaseUserManager):
    def create_user(self,email,password=None,**extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email=self.normalize_email(email)
        user=self.model(email=email,**extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    

    def create_superuser(self,email,password=None,**extra_fields):
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_superuser',True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError("superuser must have is_staff=True")
        if extra_fields.get('is_superuser') is not True:
            raise ValueError("superuser must have is_superuser=True")
        return self.create_user(email,password,**extra_fields)

class CustomUser(AbstractUser):
    username=None
    email=models.EmailField(('email_address'),unique=True)
    phone=models.CharField(help_text="Contact phone number",unique=True,null=True)
    image=models.ImageField(upload_to='images',blank=True,null=True)

        
    def __str__(self):
        return self.first_name

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    objects = CustomUserManager()
        