from django.urls import path
from django.conf.urls import url
from .views import MainView
from rest_framework.routers import DefaultRouter

from .views import get_swagger

schema_view = get_swagger()

main_page_router = DefaultRouter()
main_page_router.register('main_page', MainView)


urlpatterns = [
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]

urlpatterns += main_page_router.urls
