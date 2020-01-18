from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from rest_framework import viewsets
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, FlashcardDeckSerializer, CustomAuthTokenSerializer
from .models import FlashcardDeck

class UserViewSet(viewsets.ModelViewSet):
    user = get_user_model()
    queryset = user.objects.all()
    serializer_class = UserSerializer

class FlashcardDeckViewSet(viewsets.ModelViewSet):
    serializer_class = FlashcardDeckSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        return FlashcardDeck.objects.filter(user=self.request.user)

    def delete(self, request):
        flashcardDeck = FlashcardDeck.objects.filter(
            Q(user = self.request.user) & Q(pk = self.request.data["pk"]))
        if not flashcardDeck:
            return Response({'message': 'Error occurred while trying to delete flashcard deck'},
                status = status.HTTP_204_NO_CONTENT)
        flashcardDeck.delete()
        return Response({'message': 'Flashcard deck has been deleted'},
            status = status.HTTP_204_NO_CONTENT)

    def put(self, request):
        try:
            flashcardDeck = FlashcardDeck.objects.get(
                Q(user = self.request.user) & Q(pk = self.request.data["pk"]))
        except FlashcardDeck.DoesNotExist:
            return Response({'message': 'FlashcardDeck pk does not exist'},
                status = status.HTTP_400_BAD_REQUEST)
        if not flashcardDeck:
            return Response({'message': 'Error occurred while trying to saving flashcard deck'},
                status = status.HTTP_400_BAD_REQUEST)
        serializer = FlashcardDeckSerializer(flashcardDeck, data = self.request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.data, status = status.HTTP_400_BAD_REQUEST)


class CustomObtainAuthToken(ObtainAuthToken):
    serializer_class = CustomAuthTokenSerializer
