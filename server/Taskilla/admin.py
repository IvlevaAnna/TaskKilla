from django.contrib import admin
from Taskilla.models import Cards


@admin.register(Cards)
class Cards(admin.ModelAdmin):
    list_display = ('title', 'description', 'status', 'priority', 'image', 'deadline', 'user')
