from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

from base.serializers import (
    UserSerializer,
    InstructorSerializer,
    PlayerSerializer,
    UserSignUpSerializer,
    UserLoginSerializer,
)

from base.models import User, Instructor, Player

class UserSignUpView(APIView):
    serializer_class = UserSignUpSerializer
    # Allow everyone (authenticated or not) to access this view
    permission_classes = (AllowAny,)

    # POST request handler
    def post(self, request):
        # Serialize and validate data
        serializer = self.serializer_class(data=request.data)
        is_valid = serializer.is_valid(raise_exception=True)

        if is_valid:
            # Save serializer state
            serializer.save()
            # Set the code to successful creation procedure
            status_code = status.HTTP_201_CREATED

            # Object accepted by the Response() call
            response = {
                'success': True,
                'statusCode': status_code,
                'message': 'Successful sign up!'
            }

            # Instantiate response object and send it back with code 201
            return Response(response, status=status_code)


class UserLoginView(APIView):
    serializer_class = UserLoginSerializer
    # Allow everyone (authenticated or not) to access this view
    permission_classes = (AllowAny,)

    # POST request handler
    def post(self, request):
        # Serialize and validate data
        serializer = self.serializer_class(data=request.data)
        is_valid = serializer.is_valid(raise_exception=True)

        if is_valid:
            # Set the code to success on return
            status_code = status.HTTP_200_OK

            # Object accepted by the Response() call
            response = {
                'success': True,
                'statusCode': status_code,
                'message': 'Successful login!',
                'access': serializer.data['access'],
                'refresh': serializer.data['refresh'],
                'authenticatedUser': {
                    'email': serializer.data['email'],
                    'role': serializer.data['role']
                }
            }

            # Instantiate response object and send it back with code 200
            return Response(response, status=status_code)


class AuthUserProfileView(APIView):
    # serializer_class =
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        response = dict()
        status_code = HTTP_200_OK

        try:
            if request.user.role == 2:
                # Perform authentication to verify the user
                #

                instructor = Instructor.objects.get(user=request.user)
                status_code = status.HTTP_200_OK

                response = {
                    'success': True,
                    'statusCode': status_code,
                    'message': 'Instructor profile fetched successfully!',
                    'profile': {
                        # 'username': # Retrieve username from user
                        # 'email': # Retrieve email from user
                        # 'games_managing': instructor.games_managing
                        # 'my_players': instructor.my_players,
                        # 'my_plots': instructor.my_plots,
                        # 'my_default_game': instructor.my_default_game
                    }
                }
            elif request.user.role == 3:
                # Perform authentication to verify the user
                #

                player = Player.objects.get(user=request.user)
                status_code = status.HTTP_200_OK

                response = {
                    'success': True,
                    'statusCode': status_code,
                    'message': 'Player profile fetched successfully!',
                    'profile': {
                        # 'username': # Retrieve username from user
                        # 'email': # Retrieve email from user
                        # 'allowed_games': player.allowed_games,
                        # 'instructors': player.instructors,
                        # 'current_game': player.current_game,
                        # 'inventory': player.inventory,
                        # 'backorder': player.backorder,
                        # 'downstream_player': player.downstream_player,
                        # 'upstream_player': player.upstream_player
                    }
                }

        except Exception as err:
            status_code = status.HTTP_400_BAD_REQUEST

            response = {
                'success': False,
                'statusCode': status_code,
                'message': 'User does not exist!',
                'error': str(err)
            }

        return Response(response, status=status_code)
