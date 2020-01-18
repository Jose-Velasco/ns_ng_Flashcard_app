from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class FlashcardUserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, email, password = None):
        if not email:
            raise ValueError("Users must have an email address")
        user = self.model(
            email = self.normalize_email(email)
        )
        user.set_password(password)
        user.save(using = self._db)
        return user

    def create_superuser(self, email, password = None):
        user = self.create_user(
            email,
            password = password
        )
        user.is_admin = True
        user.save(using = self._db)
        return user


class FlashcardUser(AbstractBaseUser):
    email = models.EmailField( verbose_name="email address", unique=True)
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    date_joined = models.DateTimeField(auto_now_add=True, blank=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = FlashcardUserManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):

        return True

    @property
    def is_staff(self):
        return self.is_admin

class FlashcardDeck(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=45, blank=True, null=True)

    def __str__(self):
        return self.title

class Flashcards(models.Model):
    flashcarddeck = models.ForeignKey(FlashcardDeck, related_name='flashcard', on_delete=models.CASCADE)
    instructions = models.TextField(blank=True, null=True)
    question = models.TextField(blank=True, null=True)
    answer = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.question
