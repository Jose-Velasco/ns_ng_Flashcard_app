from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import UserViewSet, FlashcardDeckViewSet

router = routers.DefaultRouter()
# temp api CHANGED IN PRODUCTION: 6W1I6JR3.3ZNBdUXljdTzndcz8CMAGHjnFUkxHMnB
# where ******** refers to the generated API key, Authorization header
# Authorization: Api-Key ********
# call users with POST request to create new user with token
# "email":
# "password":
router.register('users', UserViewSet)
# POST request will create a new deck format JSON,
# GET will return authenticated user's flashcardDecks,
# DELETE will take in a pk in body to delete the pk of the deck
# use pk in the URL,
# PUT will update the deck using pk to identifiy the deck being edited will
# add or delete or create cards not in the request,
router.register(r'flashcardDecks', FlashcardDeckViewSet, basename="FlashcardDeck")

urlpatterns = [
    path('', include(router.urls)),
]
