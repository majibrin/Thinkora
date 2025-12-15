from django.urls import path
from .views import UserRegistrationView, ProtectedTestView

urlpatterns = [
    # Handles new user registration (We will define this view next)
    path('register/', UserRegistrationView.as_view(), name='register'),
    
    # Test route: Only accessible if a valid JWT is provided
    path('test/', ProtectedTestView.as_view(), name='protected_test'),
]
