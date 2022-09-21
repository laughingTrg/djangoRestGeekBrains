from django.db import models

# Create your models here.
# Сделать для неё базовое API — по аналогии модели Author.
# В качестве полей выбрать username, firstname, lastname, email.
# Если выбрать все поля, при попытке сериализации может возникнуть ошибка сериализации связанного поля.
# Эту тему мы рассмотрим далее.

class Users(models.Model):
    username = models.CharField(max_length=64, unique=True)
    firstname = models.CharField(max_length=64)
    lastname = models.CharField(max_length=64)
    email = models.EmailField(max_length=64, unique=True)

