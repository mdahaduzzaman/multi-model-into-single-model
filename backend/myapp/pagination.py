from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response

class CustomPagination(LimitOffsetPagination):
    default_limit = 10  # Set the default limit per page
    max_limit = 100  # Set the maximum limit per page

    def get_paginated_response(self, data):
        return Response({
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'count': self.count,
            'results': data
        })