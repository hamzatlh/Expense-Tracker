from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.conf import settings
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer
from rest_framework.authtoken.models import Token
from google.auth.transport import requests
from google.oauth2 import id_token


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

class GoogleLoginAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            token = request.data.get('credential')
            if not token:
                return Response({
                    'error': 'No token provided'
                }, status=status.HTTP_400_BAD_REQUEST)

            idinfo = id_token.verify_oauth2_token(
                token,
                requests.Request(),
                "922319468084-atom6vllbsqhbl7ofrk6i0tg72bs9gfv.apps.googleusercontent.com" 
            )

            email = idinfo['email']
            first_name = idinfo.get('given_name', '')
            last_name = idinfo.get('family_name', '')

            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                user = User.objects.create_user(
                    username=email,
                    email=email,
                    first_name=first_name,
                    last_name=last_name
                )
                
            token, _ = Token.objects.get_or_create(user=user)

            return Response({
                'token': token.key,
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'name': f"{user.first_name} {user.last_name}".strip()
                }
            })

        except ValueError as e:
            print("Token verification error:", str(e)) 
            return Response({
                'error': 'Invalid token'
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("Unexpected error:", str(e)) 
            return Response({
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)
