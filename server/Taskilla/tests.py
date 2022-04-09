from mixer.backend.django import mixer
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from django.contrib.auth import get_user_model
from .views import MainView
from .models import Cards
import datetime
from unittest.mock import patch
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test.client import Client

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


class IntegrationsTest(TestCase):
    def setUp(self) -> None:
        self.image = (
            b"\x47\x49\x46\x38\x39\x61\x01\x00\x01\x00\x00\x00\x00\x21\xf9\x04"
            b"\x01\x0a\x00\x01\x00\x2c\x00\x00\x00\x00\x01\x00\x01\x00\x00\x02"
            b"\x02\x4c\x01\x00\x3b"
        )
        self.url = '/api/main_page/'
        self.google_url = '/'
        self.error_url = '/fkdlv/'

        self.data = {
            'title': 'Mock',
            'description': 'Mock',
            'status': 'Mock',
            'priority': 'Mock',
            'location': 'Mock',
            # 'image': self.image,
            'deadline': datetime.datetime.now().date(),
            # 'user': 'admin'
        }
        self.data_patch = {
            'status': 'to_Do',
        }

    @patch("django.core.files.storage.FileSystemStorage._save")
    def test_all_actions_with_card(self, mock_save):
        mock_save.return_value = "test.gif"
        test_gif = SimpleUploadedFile(
            name="test.gif", content=self.image
        )
        # card = Cards.objects.create(**self.data)
        factory = APIRequestFactory()
        request = factory.post(self.url, self.data, format='json')
        view = MainView.as_view({'post': 'create'})
        response_post = view(request)

        request = factory.get(self.url)
        view = MainView.as_view({'get': 'list'})
        response_get = view(request)

        # request = factory.delete(f"{self.url}{card.id}/")
        # view = MainView.as_view({'delete': 'destroy'})
        # response_delete = view(request)
        #
        # request = factory.put(f"{self.url}{card.id}/")
        # view = MainView.as_view({'put': 'update'})
        # response_put = view(request)

        # self.assertEqual(response_put.status_code, status.HTTP_200_OK)
        # self.assertEqual(response_delete.status_code, status.HTTP_200_OK)
        self.assertEqual(response_post.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response_get.status_code, status.HTTP_200_OK)

        print(test_gif)

    def test_authorization_google_acc(self):
        client = Client()
        factory = APIRequestFactory()
        response = client.post('/google', {'username': 'test@gmail.com', 'password': 'Q!werty15'})
        request = factory.get(self.url)
        view = MainView.as_view({'get': 'list'})
        response_get_cards = view(request)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response_get_cards.status_code, status.HTTP_200_OK)

    def test_coincidence_location(self):
        card = Cards.objects.create(**self.data)
        card_ = Cards.objects.get(id=card.id)
        self.assertEqual(card_.location, self.data.get('location'))

    def test_change_account(self):
        client = Client()
        factory = APIRequestFactory()
        client.post('/google', {'username': 'test@gmail.com', 'password': 'Q!werty15'})
        request = factory.get(self.url)
        view = MainView.as_view({'get': 'list'})
        response_get_cards = view(request)
        data_first_acc = response_get_cards
        client.logout()

        client.post('/google', {'username': 'nikita@gmail.com', 'password': 'kmdkk123%4'})
        request = factory.get(self.url)
        view = MainView.as_view({'get': 'list'})
        response_get_cards = view(request)
        data_second_acc = response_get_cards
        self.assertEqual(f"{data_first_acc}", f"{data_second_acc}")

    def test_error_page(self):
        factory = APIRequestFactory()
        request = factory.get(self.error_url)
        url = request.get_full_path()
        self.assertEqual(url, self.error_url)

    def test_change_status(self):
        client = APIClient()
        card = Cards.objects.create(**self.data)
        status_before = card.status
        different_statuses = status_before != card.status
        response = client.patch(f'{self.url}{card.id}/', self.data_patch)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(different_statuses)

