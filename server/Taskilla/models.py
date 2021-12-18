from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractUser
import uuid


class MaxImageSizeException(Exception):
    pass


class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)


class Cards(models.Model):
    MAX_IMAGE_SIZE = 614400

    title = models.CharField(_('Название'), max_length=100)
    description = models.CharField(_('Описание'), max_length=255, blank=True)
    status = models.CharField(_('Статус'), max_length=100, default='to do')
    priority = models.CharField(_('Приоритет'), max_length=100, default='low', blank=True)
    location = models.CharField(_('Адрес'), max_length=100, blank=True)
    image = models.ImageField(_('Картинка'), blank=True)
    deadline = models.DateField(_('Дата выполнения задачи'), blank=True, null=True)

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='Cards', null=True)

    def save(self, *args, **kwargs):
        image = self.image
        if bool(self.image):
            if image.size > self.MAX_IMAGE_SIZE:
                raise MaxImageSizeException('Размер изображения больше 600Кб')

        super().save(*args, **kwargs)

    class Meta:
        db_table = 'cards'
        ordering = ['title']
        verbose_name = _('Карточка')
        verbose_name_plural = _('Карточки')

    def __str__(self):
        return self.title
