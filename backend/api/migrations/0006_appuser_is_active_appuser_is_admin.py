# Generated by Django 5.0.1 on 2024-01-26 10:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_remove_appuser_is_active_remove_appuser_is_staff'),
    ]

    operations = [
        migrations.AddField(
            model_name='appuser',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='appuser',
            name='is_admin',
            field=models.BooleanField(default=False),
        ),
    ]
