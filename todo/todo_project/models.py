from django.db import models

from .users.models import Users
# Create your models here.

# Проект
class Project (models.Model):
    name = models.CharField(max_length=128)
    link = models.URLField
    users = models.ManyToManyRel(Users)

#Заметка
class TODO(models.Model):
    text = models.TextField(max_length=1500)
    project = models.ManyToOneRel(Project)
    create_date = models.DateField(auto_now_add=True)
    update_date = models.DateField()
    users = models.ForeignKey(Users, models.PROTECT)
    is_active = models.BooleanField(default=False)



