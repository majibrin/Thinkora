from django.contrib.auth.models import AbstractUser
from django.db import models

# Define the custom user model that inherits from AbstractUser
class User(AbstractUser):
    # Override the email field to make it unique and required for login
    email = models.EmailField(unique=True)

    # Tell Django to use the 'email' field instead of 'username' for login
    USERNAME_FIELD = 'email'

    # Keep 'username' as a required field during superuser creation, etc.
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email
