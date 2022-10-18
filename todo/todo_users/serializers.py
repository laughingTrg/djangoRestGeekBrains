from rest_framework.serializers import ModelSerializer

from .models import Users


class UsersModelSerializer(ModelSerializer):
    class Meta:
        model = Users
        fields = 'username', 'firstname', 'lastname', 'email'

class UsersNewVersionModelSerializer(ModelSerializer):
    class Meta:
        model = Users
        fields = 'username', 'firstname', 'lastname', 'email', 'is_superuser', 'is_staff',

