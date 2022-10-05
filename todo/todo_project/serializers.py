from rest_framework import serializers

from .models import Project, TODO

class ProjectModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Project
        fields = ['id', 'name', 'link', 'users']

class TODOModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = TODO
        fields = '__all__'
