# С помощью GraphQL создать схему, которая позволит одновременно получать
# ToDo, проекты и пользователей, связанных с проектом.

import graphene
from graphene_django import DjangoObjectType
from todo_project.models import Project, TODO
from todo_users.models import Users

class TODOType(DjangoObjectType):
    class Meta:
        model = TODO
        fields = '__all__'

class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'

class UsersType(DjangoObjectType):
    class Meta:
        model = Users
        fields = '__all__'

class Query(graphene.ObjectType):
    all_todos = graphene.List(TODOType)

    def resolve_all_todos(root, info):
        return TODO.objects.all()

schema = graphene.Schema(query=Query)