from django.db import models

from django.contrib.auth.models import User
from django.template.backends import django


class Quiz(models.Model):
    quizmaster = models.ForeignKey(django.contrib.auth.models.User, null=True)
    quizname = models.CharField(max_length=1024)


class Question(models.Model):
    quiz = models.ForeignKey(Quiz)
    question_string = models.CharField(max_length=1024, null=True)
    master_answer = models.CharField(max_length=1024, null=True)


class UserAnswer(models.Model):
    question = models.ForeignKey(Question)
    user = models.ForeignKey(django.contrib.auth.models.User, null=True)
    user_answer = models.CharField(max_length=1024)

