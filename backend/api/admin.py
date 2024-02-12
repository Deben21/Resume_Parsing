from django.contrib import admin
from .models import AppUser, AppUserManager, Resume
# Register your models here.
admin.site.register(AppUser)
admin.site.register(Resume)