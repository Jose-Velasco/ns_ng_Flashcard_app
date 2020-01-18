from django.contrib import admin
from django import forms
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from .models import FlashcardDeck, Flashcards, FlashcardUser

class FlashcardUserChangeForm(forms.ModelForm):
    password = ReadOnlyPasswordHashField()

    class Meta:
        model = FlashcardUser
        fields = ('email', 'password', 'is_active', 'is_admin')

    def clean_password(self):
        return self.initial["password"]

class FlashcardUserAdmin(BaseUserAdmin):
    form = FlashcardUserChangeForm

    list_display = ('email', 'decks', 'is_admin')
    list_filter = ('is_admin',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_admin', 'is_active')}),
        (('Important dates'), {'fields': ('last_login',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )
    search_fields = ('email', 'first_name', 'last_name', 'is_staff',)
    ordering = ('email',)
    filter_horizontal = ()

    def decks(self, obj):
        queryDecks = FlashcardDeck.objects.filter(user = obj)
        if queryDecks:
            return len(queryDecks)
        return "Not Available"

class FlashcardInline(admin.StackedInline):
    model = Flashcards
    extra = 0

class FlashcardDeckAdmin(admin.ModelAdmin):
    list_display = ('title','user', 'cards_in_deck')

    def cards_in_deck(self, obj):
        return len(obj.flashcard.all())
    inlines = [
        FlashcardInline,
    ]

class FlashcardsAdmin(admin.ModelAdmin):
    list_display = ('question', 'flashcarddeck', 'card_owner')

    def card_owner(self, obj):
        return obj.flashcarddeck.user



admin.site.register(FlashcardUser, FlashcardUserAdmin)
admin.site.unregister(Group)
admin.site.register(FlashcardDeck, FlashcardDeckAdmin)
admin.site.register(Flashcards, FlashcardsAdmin)
