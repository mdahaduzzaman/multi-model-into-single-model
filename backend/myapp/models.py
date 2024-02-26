from django.db import models

# Create your models here.
class Person(models.Model):
    name = models.CharField(max_length=255)
    age = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    degree = models.CharField(max_length=255)

class Order(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE, related_name="orders")
    date = models.DateTimeField()
    quantity = models.IntegerField()
    amount = models.DecimalField(max_digits=5, decimal_places=2)