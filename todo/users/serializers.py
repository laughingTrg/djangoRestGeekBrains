from rest_framework.serializers import ModelSerializer

from .models import Users


class UsersModelSerializer(ModelSerializer):

    class Meta:
        model = Users
        fields = '__all__'