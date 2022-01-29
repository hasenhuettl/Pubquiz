from django.db import models

from django.template.backends import django

"""from django.contrib.auth.models import AbstractUser
from django.conf import settings


class QuizMaster(AbstractUser):
    birthday = models.DateField(null=True)
    bio = models.CharField(max_length=1024, null=True)
    profile_image = models.ImageField(upload_to='profile_images/', null=True, default='profile_images/user.png')
"""


class Quiz(models.Model):
    # quiz_master = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    quiz_name = models.CharField(max_length=1024)
    created_by_user = models.CharField(max_length=1024, null=True)


class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, null=True)
    question_string = models.CharField(max_length=1024, null=True)
    master_answer = models.CharField(max_length=1024, null=True)


class UserAnswer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, null=True)
    created_by_user = models.CharField(max_length=1024, null=True)
    is_true = models.BooleanField(default=False)
    # user = models.ForeignKey(django.contrib.auth.models.User)
    user_answer = models.CharField(max_length=1024)
