from rest_framework import serializers

from . import models
# from django.contrib.auth.models import User


class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Quiz
        fields = '__all__'


class QuestionSerializer(serializers.ModelSerializer):
    quiz = QuizSerializer()

    class Meta:
        model = models.Question
        fields = '__all__'


class UserAnswerSerializer(serializers.ModelSerializer):
    question = QuestionSerializer()

    class Meta:
        model = models.UserAnswer
        fields = '__all__'
