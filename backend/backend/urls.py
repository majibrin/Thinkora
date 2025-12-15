from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,  # Handles login and returns access/refresh tokens
    TokenRefreshView,    # Handles token renewal
)

urlpatterns = [
    # Admin Interface
    path('admin/', admin.site.urls),

    # JWT Authentication Endpoints
    # POST to /api/token/ returns access and refresh tokens
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # POST to /api/token/refresh/ returns a new access token
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # User Registration and Profile APIs (We will create this next)
    path('api/accounts/', include('accounts.urls')),
]
