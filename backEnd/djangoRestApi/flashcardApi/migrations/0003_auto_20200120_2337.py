# Generated by Django 3.0.2 on 2020-01-21 07:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('flashcardApi', '0002_auto_20200114_2055'),
    ]

    operations = [
        migrations.RenameField(
            model_name='flashcards',
            old_name='instructions',
            new_name='instruction',
        ),
    ]
