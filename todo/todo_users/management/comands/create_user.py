from django.contrib.auth.models import User
from django.core.management import BaseCommand

from todo_users.models import Users
from todo_project.models import Project

class Command(BaseCommand):
    
    
    def handle(self, *args, **options):
        su = User.objects.filter(username='admin').first()
        if not su:
            User.objects.create_superuser(username='admin', password='1', email='admin@adminmail.ru')
            data_user = {
                'username': 'jeremy',
                'firstname': 'John',
                'lastname': 'Last',
                'email': 'john@jeremy.ru'
            }
            user = Users.objects.create(**data_user)
            prj = Project.objects.create(name='first_project', link='http://firstprj.ru')
            prj.users.add(user.id)