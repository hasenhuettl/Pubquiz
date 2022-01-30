from django.db import models

# from django.template.backends import django


class Quiz(models.Model):
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
    user_answer = models.CharField(max_length=1024)
