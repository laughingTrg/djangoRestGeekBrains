from django.shortcuts import render

# Create your views here.
from rest_framework import mixins, viewsets
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import ModelViewSet
from .models import Users
from .serializers import UsersModelSerializer

class UsersModelViewSet(ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersModelSerializer


class UsersCustomViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]

