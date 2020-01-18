from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import UserViewSet, FlashcardDeckViewSet

router = routers.DefaultRouter()
# call users with POST request to create new user with token
# "email":
# "password":
router.register('users', UserViewSet)
# POST request will create a new deck format JSON
# GET will return authenticated user's flashcardDecks
# DELETE will take in a pk in body to delete the pk of the deck
# "pk":
router.register('flashcardDecks', FlashcardDeckViewSet, basename="FlashcardDeck")

urlpatterns = [
    path('', include(router.urls)),
]
