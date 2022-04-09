from mixer.backend.django import mixer
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from django.contrib.auth import get_user_model
from .views import MainView
from .models import Cards
import datetime

User = get_user_model()


class TestMainView(TestCase):
    def setUp(self) -> None:
        self.name = 'admin'
        self.password = 'admin123'
        self.email = 'admin@admin.ru'

        self.data = {
            'title': 'Test',
            'description': 'Test',
            'status': 'Test',
            'priority': 'Test',
            'location': 'Test',
            'image': '',
            'deadline': datetime.datetime.now().date(),
            # 'user': 'admin'
        }
        self.data_put = {
            'title': 'Test_2',
            'description': 'Test_2',
            'status': 'Test_2',
            'priority': 'Test_2',
            'location': 'Test_2',
            'image': '',
            'deadline': datetime.datetime.now().date(),
            # 'user': 'admin'
        }

        self.url = '/api/main_page/'
        self.admin = User.objects.create_superuser(self.name, self.email, self.password)

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        view = MainView.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post(self.url, self.data, format='json')
        view = MainView.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post(self.url, self.data, format='json')
        force_authenticate(request, self.admin)
        view = MainView.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_detail(self):
        client = APIClient()
        card = Cards.objects.create(**self.data)
        response = client.get(f'{self.url}{card.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_put_guest(self):
        client = APIClient()
        card = Cards.objects.create(**self.data)
        response = client.put(f'{self.url}{card.id}/', self.data_put)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_put_admin(self):
        client = APIClient()
        card = Cards.objects.create(**self.data)
        # client.login(username=self.name, password=self.password)
        response = client.put(f'{self.url}{card.id}/', self.data_put)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        card_ = Cards.objects.get(id=card.id)
        self.assertEqual(card_.title, self.data_put.get('title'))
        self.assertEqual(card_.description, self.data_put.get('description'))
        self.assertEqual(card_.status, self.data_put.get('status'))
        # client.logout()

    def tearDown(self) -> None:
        pass


class TestMain(APITestCase):
    def setUp(self) -> None:
        self.name = 'admin'
        self.password = 'admin123'
        self.email = 'admin@admin.ru'
        self.bad_photo = ''

        self.data = {
            'title': 'Test',
            'description': 'Test',
            'status': 'Test',
            'priority': 'Test',
            'location': 'Test',
            'image': '',
            'deadline': datetime.datetime.now().date(),
            # 'user': 'admin'
        }
        self.data_put = {
            'title': 'Test_3',
            'description': 'Test_3',
            'status': 'Test_3',
            'priority': 'Test_3',
            'location': 'Test_3',
            'image': '',
            'deadline': datetime.datetime.now().date(),
            # 'user': 'admin'
        }
        self.data_put_new = {
            'title': 'Test_12',
            'description': 'Test_12',
            'status': 'Test_12',
            'priority': 'Test_12',
            'location': 'Test_12',
            'image': '',
            'deadline': datetime.datetime.now().date(),
            # 'user': 'admin'
        }
        self.bad_data = {
            'title': 'Test' * 100,
            'description': 'Test' * 100,
            'status': 'Test' * 100,
            'priority': 'Test' * 100,
            'location': 'Test' * 100,
            'image': '',
            'deadline': datetime.datetime.now().date(),
            # 'user': 'admin'
        }
        self.data_without_title = {
            'description': 'Test',
            'status': 'Test',
            'priority': 'Test',
            'location': 'Test',
            'image': '',
            'deadline': datetime.datetime.now().date(),
            # 'user': 'admin'
        }

        self.url = '/api/main_page/'
        self.admin = User.objects.create_superuser(self.name, self.email, self.password)

    def test_get_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_put_admin(self):
        card = Cards.objects.create(**self.data)
        # self.client.login(username=self.name, password=self.password)
        response = self.client.put(f'{self.url}{card.id}/', self.data_put)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        card_ = Cards.objects.get(id=card.id)
        self.assertEqual(card_.title, self.data_put.get('title'))
        self.assertEqual(card_.description, self.data_put.get('description'))
        self.assertEqual(card_.status, self.data_put.get('status'))
        self.assertEqual(card_.priority, self.data_put.get('priority'))
        self.assertEqual(card_.location, self.data_put.get('location'))
        self.assertEqual(card_.deadline, self.data_put.get('deadline'))
        # self.client.logout()

    def test_put_mixer(self):
        card = mixer.blend(Cards)
        # self.client.login(username=self.name, password=self.password)
        response = self.client.put(f'{self.url}{card.id}/', self.data_put_new)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        card_ = Cards.objects.get(id=card.id)
        self.assertEqual(card_.title, self.data_put_new.get('title'))
        # self.client.logout()

    def test_delete_card(self):
        card = Cards.objects.create(**self.data)
        response = self.client.delete(f'{self.url}{card.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_length_line(self):
        card = Cards.objects.create(**self.data)
        length_title: bool = len(card.title) < 101
        length_description: bool = len(card.description) < 256
        length_status: bool = len(card.title) < 101
        length_priority: bool = len(card.title) < 101
        length_location: bool = len(card.title) < 101
        self.assertEqual('True', str(length_title))
        self.assertEqual('True', str(length_description))
        self.assertEqual('True', str(length_priority))
        self.assertEqual('True', str(length_status))
        self.assertEqual('True', str(length_location))

    def test_bad_create(self):
        response = self.client.post(f'{self.url}', self.bad_data) #
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_bad_photo(self):
        response = self.client.post(f'{self.url}', self.bad_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_good_photo(self):
        response = self.client.post(f'{self.url}', self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_without_title(self):
        response = self.client.post(f'{self.url}', self.data_without_title)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_with_title(self):
        response = self.client.post(f'{self.url}', self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


