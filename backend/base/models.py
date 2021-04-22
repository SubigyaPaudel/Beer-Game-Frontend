from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)
from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.utils import timezone
from django.core.validators import MaxValueValidator, MinValueValidator

from .managers import CustomUserManager
import uuid

class User(AbstractBaseUser, PermissionsMixin):
    # Roles on the application
    ADMIN = 1
    INSTRUCTOR = 2
    PLAYER = 3

    ROLE_CHOICES = (
        (ADMIN, 'Admin'),
        (INSTRUCTOR, 'Instructor'),
        (PLAYER, 'Player')
    )

    # Core fields
    uid = models.UUIDField(unique=True, editable=False,
                           default=uuid.uuid4, verbose_name='public_id')
    username = models.CharField(max_length=64, unique=True, blank=True)
    email = models.EmailField(unique=True)

    # Set role by default to Player
    role = models.PositiveSmallIntegerField(
        choices=ROLE_CHOICES, blank=True, null=True, default=3)

    # Extra fields
    is_active = models.BooleanField(default=True)
    created_date = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = 'user'
        verbose_name = 'users'


class Player(models.Model):
    uid = models.UUIDField(default=uuid.uuid4,
                           editable=False, verbose_name='public_id')
    # Relationships
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='player')

    allowed_games = models.CharField(max_length=1024, blank=True)
    instructors = models.CharField(max_length=1024, blank=True)

    current_game = models.CharField(max_length=64, blank=True)
    inventory = models.IntegerField(default=0)
    backorder = models.IntegerField(default=0)
    downstream_player = models.CharField(max_length=64, blank=True)
    upstream_player = models.CharField(max_length=64, blank=True)

    class Meta:
        verbose_name = 'player'
        verbose_name_plural = 'players'


class Instructor(models.Model):
    uid = models.UUIDField(default=uuid.uuid4,
                           editable=False, verbose_name='public_id')
    # Relationships
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='instructor')
    players = models.ManyToManyField(
        Player, related_name='instructors_players')

    games_managing = models.CharField(max_length=1024, blank=True)
    my_players = models.CharField(max_length=4096, blank=True)
    my_plots = models.CharField(max_length=4096, blank=True)

    my_default_game = models.CharField(max_length=2048, blank=True)

    class Meta:
        verbose_name = 'instructor'
        verbose_name_plural = 'instructors'
