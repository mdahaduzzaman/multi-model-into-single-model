from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()

router.register("person", PersonViewSet)

urlpatterns = router.urls