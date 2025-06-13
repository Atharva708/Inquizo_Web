# api/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FormViewSet, QuestionViewSet, OptionViewSet, ResponseViewSet, AnswerViewSet

router = DefaultRouter()
router.register('forms', FormViewSet)
router.register('questions', QuestionViewSet)
router.register('options', OptionViewSet)
router.register('responses', ResponseViewSet)
router.register('answers', AnswerViewSet)

urlpatterns = [
    path('', include(router.urls)),  # Just '' if you're already using 'api/' in the root urls.py
]
