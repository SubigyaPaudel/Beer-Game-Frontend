import json

from rest_framework import status
from rest_framework import APITestCase

from .models import User, Instructor, Player, Game, DemandPattern


class UserAPITestCase(APITestCase):
    # Set up before each test
    def setUp(self):
        pass

    def test_GET_user(self):
        pass


class InstructorAPITestCase(APITestCase):
    # Set up before each test
    def setUp(self):
        pass

    def test_GET_instructor(self):
        pass


class PlayerAPITestCase(APITestCase):
    # Set up before each test
    def setUp(self):
        pass

    def test_GET_player(self):
        pass


class GameAPITestCase(APITestCase):
    # Set up before each test
    def setUp(self):
        pass

    def test_GET_game(self):
        pass

    def test_GET_ALL_game(self):
        pass

    def test_POST_game_success(self):
        pass

    def test_POST_game_failure(self):
        pass

    def test_PATCH_game_success(self):
        pass

    def test_PATCH_game_failure(self):
        pass

    def test_DELETE_game_success(self):
        pass

    def test_DELETE_game_failure(self):
        pass


class DemandPatternAPITestCase(APITestCase):
    # Set up before each test
    def setUp(self):
        pass

    def test_GET_demand_pattern(self):
        pass

    def test_GET_ALL_demand_patterns(self):
        pass

    def test_POST_demand_pattern_success(self):
        pass

    def test_POST_demand_pattern_failure(self):
        pass

    def test_PATCH_demand_pattern_success(self):
        pass

    def test_PATCH_demand_pattern_failure(self):
        pass

    def test_DELETE_demand_pattern_success(self):
        pass

    def test_DELETE_demand_pattern_failure(self):
        pass
