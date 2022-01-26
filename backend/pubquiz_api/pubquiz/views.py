from django.contrib.auth.decorators import user_passes_test
from rest_framework import viewsets
from rest_framework.permissions import DjangoModelPermissions
from rest_framework.response import Response
from rest_framework import permissions

from datetime import datetime

from . import serializers
from . import models

from django.contrib.auth.models import User


# Quiz:
class QuizViewSet(viewsets.ViewSet):
    # GET: http://127.0.0.1:8000/quiz/
    def list(self, request, format=None):

        queryset = models.Quiz.objects.all()

        # GET http://127.0.0.1:8000/quiz/?order_by=id
        if request.GET.get("quiz_name") is not None:
            queryset = models.Quiz.objects.filter(name=request.GET.get("quiz_name"))
        if request.GET.get("order_by") is not None:
            queryset = queryset.order_by(request.GET.get("order_by"))

        serializer = serializers.QuizSerializer(queryset, many=True)
        return Response(serializer.data, status=200)

    # POST http://127.0.0.1:8000/quiz/
    def create(self, request, format=None):
        # if request.user.is_superuser:
        quiz = models.Quiz.objects.create(
            # quiz_master=request.data["quiz_master"],
            quiz_name=request.data["quiz_name"]
        )
        return Response(
            {
                "id": quiz.pk,
                # "quiz_master": quiz.quiz_master,
                "quiz_name": quiz.quiz_name
            },
            status=201
        )

    # GET: http://127.0.0.1:8000/quiz/id
    def retrieve(self, request, pk=None, format=None):
        try:
            quiz = models.Quiz.objects.get(pk=pk)
            serializer = serializers.QuizSerializer(quiz)
            return Response(serializer.data, status=200)

        except models.Quiz.DoesNotExist:
            return Response({"error": "Quiz does not exist"}, status=404)

    # PUT http://127.0.0.1:8000/quiz/id
    def update(self, request, pk=None, format=None):
        try:
            quiz = models.Quiz.objects.get(pk=pk)
            # quiz.quiz_master = request.data["quiz_master"]
            quiz.quiz_name = request.data["quiz_name"]
            quiz.save()
            return Response(
                {
                    "id": quiz.pk,
                    # "quiz_master": quiz.quiz_master,
                    "quiz_name": quiz.quiz_name
                },
                status=200
            )
        except models.Quiz.DoesNotExist:
            return Response(status=404)

    def partial_update(self, request, pk=None, format=None):
        # We do not allow partial updates here
        # So we return a 405 instead.
        return Response(status=405)

    # DELETE http://127.0.0.1:8000/quiz/id
    def destroy(self, request, pk=None, format=None):
        models.Quiz.objects.filter(pk=pk).delete()
        return Response(status=204)


class QuestionViewSet(viewsets.ViewSet):

    def list(self, request, format=None):
        queryset = models.Question.objects.all()

        # GET http://127.0.0.1:8000/question/?order_by=id
        if request.GET.get("order_by") is not None:
            queryset = queryset.order_by(request.GET.get("order_by"))

        serializer = serializers.QuestionSerializer(queryset, many=True)
        return Response(serializer.data, status=200)

    # POST http://127.0.0.1:8000/question/
    def create(self, request, format=None):
        # if request.user.is_superuser:
        question = models.Question.objects.create(
            # created_by_user=request.data["created_by_user"],
            quiz=models.Quiz.objects.get(id=request.data["quiz"]),
            created_by_user=request.data["created_by_user"],
            question_string=request.data["question_string"],
            master_answer=request.data["master_answer"]
        )
        question.save()
        serializer = serializers.QuestionSerializer(question)
        return Response(serializer.data, status=200)

        # GET: http://127.0.0.1:8000/question/id
    def retrieve(self, request, pk=None, format=None):
        try:
            question = models.Question.objects.get(pk=pk)
            serializer = serializers.QuestionSerializer(question)
            return Response(serializer.data, status=200)

        except models.Quiz.DoesNotExist:
            return Response({"error": "Question does not exist"}, status=404)

    # PUT http://127.0.0.1:8000/question/id
    def update(self, request, pk=None, format=None):
        try:
            question = models.Question.objects.get(pk=pk)
            question.question_string = request.data["question_string"]
            question.master_answer = request.data["master_answer"]
            question.save()
            serializer = serializers.QuestionSerializer(question)
            return Response(serializer.data, status=200)

        except models.Quiz.DoesNotExist:
            return Response(status=404)

    def partial_update(self, request, pk=None, format=None):
        # We do not allow partial updates here
        # So we return a 405 instead.
        return Response(status=405)

    # DELETE http://127.0.0.1:8000/question/id
    def destroy(self, request, pk=None, format=None):
        models.Question.objects.filter(pk=pk).delete()
        return Response(status=204)



class UserAnswerViewSet(viewsets.ViewSet):
    # GET http://127.0.0.1:8000/userAnswer/
    def list(self, request, format=None):
        queryset = models.UserAnswer.objects.all()
        serializer = serializers.UserAnswerSerializer(queryset, many=True)
        return Response(serializer.data, status=200)

    # GET http://127.0.0.1:8000/userAnswer/
    def create(self, request, format=None):
        # if request.user.is_superuser:
        user_answer = models.UserAnswer.objects.create(
            # created_by_user=request.data["created_by_user"],
            question=models.Question.objects.get(id=request.data["question"]),
            #question_string=request.data["question_string"],
            user_answer=request.data["user_answer"]
        )
        user_answer.save()
        serializer = serializers.UserAnswerSerializer(user_answer)
        return Response(serializer.data, status=200)

    #GET http://127.0.0.1:8000/userAnswer/id
    def retrieve(self, request, pk=None, format=None):
        try:
            user_answer = models.UserAnswer.objects.get(pk=pk)
            serializer = serializers.UserAnswerSerializer(user_answer)
            return Response(serializer.data, status=200)

        except models.Quiz.DoesNotExist:
            return Response({"error": "Question does not exist"}, status=404)

    # PUT http://127.0.0.1:8000/userAnswer/id
    def update(self, request, pk=None, format=None):
        try:
            user_answer = models.UserAnswer.objects.get(pk=pk)
            user_answer.user_answer = request.data["user_answer"]
            #question.master_answer = request.data["master_answer"]
            user_answer.save()
            serializer = serializers.UserAnswerSerializer(user_answer)
            return Response(serializer.data, status=200)

        except models.Quiz.DoesNotExist:
            return Response(status=404)

    def partial_update(self, request, pk=None, format=None):
        # We do not allow partial updates here
        # So we return a 405 instead.
        return Response(status=405)

    # DELETE http://127.0.0.1:8000/userAnswer/id
    def destroy(self, request, pk=None, format=None):
        models.UserAnswer.objects.filter(pk=pk).delete()
        return Response(status=204)

"""
class QuizMasterViewSet(viewsets.ViewSet):

    # GET: http://127.0.0.1:8000/users/
    def list(self, request, format=None):
        queryset = models.Quiz.objects.all()
        serializer = serializers.UserSerializer(queryset, many=True)
        return Response(serializer.data, status=200)

"""