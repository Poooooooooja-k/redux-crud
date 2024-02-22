from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions,status
from rest_framework.exceptions import AuthenticationFailed
from .models import *
import jwt, datetime
from .serializer import *
from rest_framework.exceptions import ValidationError


class RegisterView(APIView):
    def post(self,request):
        data=request.data
        email=data.get('email')
        phone=data.get('phone')
    
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
        print(email)
        print(password)
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
        payload = {
            'id':user.id,
            #sets expiration time for payload
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            #issued at (iat)
            'iat':datetime.datetime.utcnow()
        }
        #generates a jwt token using payload,encodes it with a secret key
        #constructs an http resopnse object
        
        token=jwt.encode(payload,'secret',algorithm="HS256")
        response=Response()
        role = 'ADMIN' if user.is_staff else 'USER'

        #adds the jwt token to the response data and returns the response to the client
        response.data={
            'jwt':token,
            'staff':role
            
        }
        return response

class UserView(APIView):
    def get(self,request):
        
        auth_header = request.headers.get('Authorization')
        print(auth_header)
        if not auth_header or 'Bearer ' not in auth_header:
            raise AuthenticationFailed("Not authorized")

        token = auth_header.split('Bearer ')[1]
        print(token)
        try:
            payload = jwt.decode(token,'secret', algorithms=["HS256"])
            print(payload)
            user = CustomUser.objects.filter(id=payload['id']).first()
            serializer = UserCreateSerializer(user)
            return Response(serializer.data)
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Not authorized")
        except jwt.InvalidTokenError:
            raise AuthenticationFailed("Invalid token")
      
class UserLogout(APIView):
    def post(self,request):
        response=Response()
        response.delete_cookie('jwt')
        response.data={
            'message':'success'
        }
        return response



