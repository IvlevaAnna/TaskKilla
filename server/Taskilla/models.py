from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractUser
import uuid


class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)


class Cards(models.Model):
    title = models.CharField(_('Название'), max_length=100)
    description = models.CharField(_('Описание'), max_length=255, blank=True)
    status = models.CharField(_('Статус'), max_length=100, default='to do')
    priority = models.CharField(_('Приоритет'), max_length=100, default='low')
    image = models.ImageField(_('Картинка'))
    deadline = models.DateField(_('Дата выполнения задачи'))

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='Cards', null=True)

    class Meta:
        db_table = 'cards'
        ordering = ['title']
        verbose_name = _('Карточка')
        verbose_name_plural = _('Карточки')

    def __str__(self):
        return self.title
