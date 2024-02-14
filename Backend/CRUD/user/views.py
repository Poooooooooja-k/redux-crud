from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions,status
from rest_framework.exceptions import AuthenticationFailed
from .models import *
from .serializer import UserCreateSerializer
from rest_framework.exceptions import ValidationError

class RegisterView(APIView):
    def post(self,request):
        data=request.data
        email=data.get('email')
        phone=data.get('phone')
        print(email)
        print(phone)
        if CustomUser.objects.filter(email=email).exists():
            print("email already exists!!")
            return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        if CustomUser.objects.filter(phone=phone).exists():
            print("phone number already exists")
            return Response({'error': 'Phone number already exists'}, status=status.HTTP_400_BAD_REQUEST)

        serializer=UserCreateSerializer(data=data)
        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            return Response({'error':str(e)},status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)

class LoginView(APIView):
    def post(self,request):
        email=request.data['email']
        password=request.data['password']

        if not(email and password):
            return Response({
                'error':'Email and password is required'
            })
        user=CustomUser.objects.filter(email=email).first()
        if user is None:
            raise AuthenticationFailed({
                'error':'User is not found'
            })
        if not user.check_password(password):
            raise AuthenticationFailed({'error':'Incorrect password'})


class UserView(APIView):
    pass