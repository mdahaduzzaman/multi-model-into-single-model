from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination

from .models import Person
from .serializers import *
from .pagination import *

class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
    pagination_class = CustomPagination
