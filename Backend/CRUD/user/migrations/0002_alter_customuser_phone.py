# Generated by Django 5.0.2 on 2024-02-22 09:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='phone',
            field=models.CharField(help_text='Contact phone number', null=True, unique=True),
        ),
    ]
