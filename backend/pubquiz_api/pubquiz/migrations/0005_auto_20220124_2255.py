# Generated by Django 3.2.9 on 2022-01-24 21:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pubquiz', '0004_useranswer'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='created_by_user',
            field=models.CharField(max_length=1024, null=True),
        ),
        migrations.AddField(
            model_name='useranswer',
            name='created_by_user',
            field=models.CharField(max_length=1024, null=True),
        ),
        migrations.AddField(
            model_name='useranswer',
            name='is_true',
            field=models.BooleanField(default=False),
        ),
    ]