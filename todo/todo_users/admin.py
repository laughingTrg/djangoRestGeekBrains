from django.contrib import admin

# Register your models here.

from todo_users import models as todo_models

# admin.site.register(todo_models.Users)

@admin.register(todo_models.Users)
class TodoUsers(admin.ModelAdmin):
    pass