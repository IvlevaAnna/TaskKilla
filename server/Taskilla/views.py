from rest_framework.mixins import CreateModelMixin, ListModelMixin, RetrieveModelMixin, DestroyModelMixin, UpdateModelMixin
from rest_framework.viewsets import GenericViewSet
from .serializers import MainViewSerializer
from .models import Cards

from drf_yasg import openapi
from drf_yasg.generators import OpenAPISchemaGenerator
from drf_yasg.views import get_schema_view

from typing import Any


class APISchemeGenerator(OpenAPISchemaGenerator):
    def get_schema(self, request=None, public=False):
        schema = super().get_schema(request, public)
        schema.host = '0.0.0.0:80'
        schema.schemes = [f'http', f'https']
        return schema


def get_swagger() -> Any:
    swagger = get_schema_view(
        openapi.Info(
            title="TASKILA API",
            default_version='v1',
            contact=openapi.Contact(email="purnov.nikita@yandex.ru"),
        ),
        public=True,
        generator_class=APISchemeGenerator
    )
    return swagger


class MainView(CreateModelMixin, ListModelMixin, GenericViewSet, RetrieveModelMixin, DestroyModelMixin, UpdateModelMixin):
    serializer_class = MainViewSerializer
    queryset = Cards.objects.all()
