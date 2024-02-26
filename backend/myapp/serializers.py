from rest_framework import serializers
from .models import *

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', 'date', 'quantity', 'amount')

class PersonSerializer(serializers.ModelSerializer):
    orders = OrderSerializer(many=True, required=False)  # Allow writing to orders field

    def create(self, validated_data):
        orders_data = validated_data.pop('orders', [])  # Extract order data
        person = Person.objects.create(**validated_data)  # Create person
        for order_data in orders_data:
            order = Order.objects.create(person=person, **order_data)  # Create orders
        return person

    class Meta:
        model = Person
        fields = ('id', 'name', 'age', 'email', 'degree', 'orders')
