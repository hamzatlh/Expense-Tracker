from django.db import models
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated

class Transaction(models.Model):
    permission_classes = [IsAuthenticated]
    text = models.CharField(max_length=200)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='transactions')

    def __str__(self):
        return f"{self.text} - {self.amount}"