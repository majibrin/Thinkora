from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserRegistrationSerializer

# --- Serializers (Must be defined first) ---
from rest_framework import serializers
from .models import User

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    # Override the create method to correctly hash the password
    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user

# --- Views ---

class UserRegistrationView(generics.CreateAPIView):
    # This view allows POST requests to create a new user
    serializer_class = UserRegistrationSerializer
    # Allow anyone (unauthenticated) to hit this endpoint
    permission_classes = (permissions.AllowAny,)
    

class ProtectedTestView(APIView):
    # This view is protected by the JWT. Only authenticated users can see it.
    
    # Require a valid JWT token in the Authorization header
    permission_classes = (permissions.IsAuthenticated,) 

    def get(self, request):
        # The request.user object is automatically set by the JWT middleware
        return Response({
            'message': 'Congratulations, you accessed a protected route!',
            'user_email': request.user.email,
            'is_authenticated': request.user.is_authenticated
        })

