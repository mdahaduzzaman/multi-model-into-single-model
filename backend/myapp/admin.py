from django.contrib import admin
from .models import *


class OrderInline(admin.StackedInline):
    model = Order

@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'age']
    inlines = [
        OrderInline
    ]

admin.site.register(Order)
