# from django.urls import include, path
# from rest_framework.routers import DefaultRouter
# from .views import UserViewSet, GoogleLoginAPIView

# router = DefaultRouter()
# router.register(r'users', UserViewSet)

# urlpatterns = [
#     path('', include(router.urls)),
#     path('auth/google/convert-token/', GoogleLoginAPIView.as_view(), name='google_login'),
#     path('users/me/', UserViewSet.as_view({'get': 'retrieve'}), name='user_me'),
# ]


from django.urls import path
from .views import GoogleLoginAPIView

urlpatterns = [
    path('auth/google/', GoogleLoginAPIView.as_view(), name='google_login'),
]