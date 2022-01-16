from rest_framework import serializers

from . import models
from django.contrib.auth.models import User


class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Quiz
        fields = '__all__'

"""
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.QuizMaster
        fields = ('id', 'username', 'first_name', 'last_name', 'date_joined', 'birthday', 'bio', 'profile_image')


class QuestionSerializer(serializers.ModelSerializer):
    quiz = QuizSerializer()
    created_by_user = UserSerializer()

    class Meta:
        model = models.Question
        fields = '__all__'


class UserAnswerSerializer(serializers.ModelSerializer):
    question = QuestionSerializer()
    created_by_user = UserSerializer()

    class Meta:
        model = models.UserAnswer
        fields = '__all__'
        """