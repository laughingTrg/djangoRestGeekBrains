import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase
from mixer.backend.django import mixer
from todo_users.models import Users
from django.contrib.auth.models import User as django_user
from todo_project.models import Project, TODO
from todo_users.views import UsersModelViewSet
from todo_project.views import ProjectModelViewSet, TODOModelViewSet


class TestUserViewSet(TestCase):

    def setUp(self) -> None:
        self.user_url = '/api/users/'
        self.some_user = {'username': 'clicker', 'firstname': 'Elvan', 'lastname': 'Jameson', 'email': 'click@mail.com'}
        self.format = json
        self.admin = Users.objects.create_superuser('admin2', 'admin@mail.org', 'admin123457')

    def test_user_list(self):
        factory = APIRequestFactory()
        request = factory.get(self.user_url)
        view = UsersModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_user_detail(self):
        user = mixer.blend(Users)
        client = APIClient()
        response = client.get(f'{self.user_url}{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_update_guest(self):
        user = mixer.blend(Users)
        client = APIClient()
        response = client.put(f'{self.user_url}{user.id}/', {'firstname': 'Mary', 'lastname': 'Christmass'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_user_create_guest(self):
        client = APIClient()
        response = client.post(f'{self.user_url}', self.some_user)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_user_create_admin(self):
        client = APIClient()
        client.force_authenticate(self.admin)
        response = client.post(f'{self.user_url}', self.some_user)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_user_update_admin(self):
        user = mixer.blend(Users)
        client = APIClient()
        client.force_authenticate(self.admin)
        response = client.put(f'{self.user_url}{user.id}/',
                              {'username': 'december', 'firstname': 'Mary', 'lastname': 'Christmass',
                               'email': 'mary@christmas.io'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestProjectViewSet(APITestCase):

    def setUp(self) -> None:
        self.project_url = '/api/projects/'
        self.admin = Users.objects.create_superuser('admin2', 'admin@mail.org', 'admin123457')

    def test_get_project_list(self):
        response = self.client.get(self.project_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_project_admin(self):
        user = mixer.blend(Users)
        project = mixer.blend(Project)
        self.client.force_login(self.admin)
        response = self.client.put(f'{self.project_url}{project.id}/', {'name': 'Edit project', 'users': {user.id}})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project.refresh_from_db()
        self.assertEqual(project.name, 'Edit project')