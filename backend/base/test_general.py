import json

from django.test import TestCase

from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase

from .models import User, Instructor, Player, Game, DemandPattern
from .serializers import GameSerializer, InstructorSerializer, PlayerSerializer, UserLoginSerializer, UserSerializer, UserSignUpSerializer

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

## DATABASE TESTS

class test_chained_deletion(TestCase):
        
    #making sure that the chained deletion of the user object leads to the
    #deletion of the instructor object that the original user object was connected
    #to

    def test_chained_deletion_instructor(self):
        user = User.objects.create_user(email="test2@localhost.com", password= "testpassword", username="test2", role = 3)
        newInstructor = Instructor(user = user)
        newInstructor.save()
        newuid = str(newInstructor.uid)
        queryset = Instructor.objects.filter(uid = newuid)
        #checking the that instrcutor was created

        self.assertEqual(len(queryset),1)
        user.delete()

        #deleting the user object
        queryset = Instructor.objects.filter(uid = newuid)

        #checking that the instrcutor was deleted
        self.assertEqual(len(queryset), 0)

        
    def test_chained_deletion_player(self):
        #same logic as above
        user = User.objects.create_user(email="test3@localhost.com", password= "testpassword", username="test3", role = 3)
        newPlayer = Player(user = user)
        newPlayer.save()
        newuid = str(newPlayer.uid)
        queryset = Player.objects.filter(uid = newuid)
        self.assertEqual(len(queryset), 1)
        user.delete()
        queryset = Player.objects.filter(uid = newuid)
        self.assertEqual(len(queryset), 0)

    


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
