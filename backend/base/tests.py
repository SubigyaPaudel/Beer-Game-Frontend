import json

from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase

from .models import User, Instructor, Player, Game, DemandPattern
from .serializers import GameSerializer, InstructorSerializer, PlayerSerializer, UserLoginSerializer, UserSerializer, UserSignUpSerializer

class UserSignUpTestCase(APITestCase):

    def setUp(self):
        user = User.objects.create_user(email="test1@localhost.com", password= "testpassword", username="test", role = 3)

    def test_registration_exist_username(self):
        data = {"username" : "test", "email": "test1@localhost.com", "password" : "testpassword", "role": 3}
        reponse = self.client.post("/api/users/signup/", data)
        self.assertEqual(reponse.status_code, status.HTTP_400_BAD_REQUEST)

    def test_registration_new(self):
        data = {"username" : "testcase", "email": "test@localhost.com", "password" : "testpassword", "role": 3}
        response = self.client.post("/api/users/signup/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class UserLogInTestCase(APITestCase):

    def setUp(self):
        user = User.objects.create_user(email="test1@localhost.com", password= "testpassword1")

    def test_login(self):
        data = {"email": "test1@localhost.com", "password" : "testpassword1"}
        response = self.client.post("/api/users/login/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class AuthGameListTestCase(APITestCase):
    # Set up before each test

    def setUp(self):
        self.user = User.objects.create_user(email="test2@localhost.com", password= "testpassword2")
        self.instructor = Instructor.objects.create(user=self.user)
    
    #testing for unauthenticated user
    def test_unauth_gamelist(self):
        request = self.client.get('/api/users/games/')
        self.assertEqual(request.status_code, status.HTTP_401_UNAUTHORIZED)

    #testing for authenticated user
    def test_auth_gamelist(self):
        self.client.force_authenticate(user=self.user)
        request = self.client.get('/api/users/games/')
        self.assertEqual(request.status_code, status.HTTP_200_OK)


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
