from django.contrib.auth import authenticate
from django.db import transaction
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers
# from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from .models import FlashcardDeck, Flashcards

# used to use email and password without a username
# defult authtoekn uses username needed custom one
class CustomAuthTokenSerializer(serializers.Serializer):
    email = serializers.CharField(label=_("Email"))

    def __init__(self, *args, **kwargs):
        super(CustomAuthTokenSerializer, self).__init__(*args, **kwargs)

        self.fields['password'] = serializers.CharField(
            label=_("Password"),
            style={'input_type': 'password'},
            trim_whitespace=False
        )
    def validate(self, attrs):
        userEmail = attrs.get('email')
        password = attrs.get('password')

        if userEmail and password:
            user = authenticate(request=self.context.get('request'),
                                username=userEmail, password=password)

            # The authenticate call simply returns None for is_active=False
            # users. (Assuming the default ModelBackend authentication
            # backend.)
            if not user:
                msg = _('Unable to log in with provided credentials.')
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = _('Must include "email" and "password".')
            raise serializers.ValidationError(msg, code='authorization')

        attrs['user'] = user
        return attrs

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        user = get_user_model()
        model = user
        fields = ['email', 'password']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    @transaction.atomic
    def create(self, validated_data):
        user = get_user_model()
        user = user.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user

    def validate(self, data):
        if len(data["password"]) < 6:
            raise serializers.ValidationError("Password must be 6+ characters")
        return data


class FlashcardsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flashcards
        fields = ['instruction', 'question', 'answer']

class FlashcardDeckSerializer(serializers.ModelSerializer):
    flashcard = FlashcardsSerializer(many=True)

    class Meta:
        model = FlashcardDeck
        fields = ['pk','title', 'flashcard']

    # called when request is a POST
    @transaction.atomic
    def create(self, validated_data):
        # Create the deck instance
        currentUser = None
        request = self.context.get("request")
        queryDecks = FlashcardDeck.objects.filter(user = request.user)

        if len(queryDecks) > 15:
            raise serializers.ValidationError("Maximum of 15 decks")

        if len(validated_data["flashcard"]) > 46:
            raise serializers.ValidationError("Maximum of 46 cards")

        if request and hasattr(request, "user"):
            currentUser = request.user

        flashcardDeckInstance = FlashcardDeck.objects.create(
            user = currentUser,
            title = validated_data["title"]
        )

        # Create or update each card instance
        for flashcard in validated_data["flashcard"]:
            card = Flashcards(
                instruction = flashcard["instruction"],
                question = flashcard["question"],
                answer = flashcard["answer"],
                flashcarddeck = flashcardDeckInstance
            )
            card.save()
        return flashcardDeckInstance

    # called when request is a PUT
    @transaction.atomic
    def update(self, instance, validated_data):
        # use .flashcard.all() to get all nested elements of an instance
        flashcardsData = validated_data["flashcard"]
        if len(flashcardsData) > 46:
            raise serializers.ValidationError("Maximum of 46 card")

        flashcardsInstanceData = instance.flashcard.all()
        flashcards = list(flashcardsInstanceData)
        instance.title = validated_data["title"]
        instance.save()

        # use to delete cards not in request
        if (len(flashcardsData) < len(flashcards)):
            for i in range(len(flashcardsData), len(flashcards), 1):
                flashcards[i].delete()

        for cardData in flashcardsData:
            try:
                flashcard = flashcards.pop(0)
                flashcard.instructions = cardData["instruction"]
                flashcard.question = cardData["question"]
                flashcard.answer = cardData["answer"]
                flashcard.save()
            # use to create a new card when there are more in new
            # request than in the original instance on th DB
            except (AttributeError, IndexError):
                card = Flashcards(
                    instruction = cardData["instruction"],
                    question = cardData["question"],
                    answer = cardData["answer"],
                    flashcarddeck = instance
                )
                card.save()

        return instance


