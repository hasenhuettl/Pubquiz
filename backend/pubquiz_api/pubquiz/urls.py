from django.contrib import admin
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('quiz', views.QuizViewSet, basename="quiz")
router.register('question', views.QuestionViewSet, basename ="question")
"""router.register('userAnswer', views.UserAnswerViewSet, basename ="user_answer")
router.register('users', views.QuizMasterViewSet, basename ="quiz_master")
"""
