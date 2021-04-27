from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from django.utils.decorators import method_decorator
from rest_framework.decorators import api_view, action

from drf_yasg import openapi

from base.serializers import (
    UserSerializer,
    InstructorSerializer,
    PlayerSerializer,
    UserSignUpSerializer,
    UserLoginSerializer,
    GameSerializer,
    DemandPatternSerializer,
)

from base.models import User, Instructor, Player, DemandPattern, Game

class UserSignUpView(APIView):
    """
    This api allow users to create account 3.
    """
    serializer_class = UserSignUpSerializer
    # Allow everyone (authenticated or not) to access this view
    permission_classes = (AllowAny,)
    
    # POST request handler
    # @swagger_auto_schema(method='post', operation_description="This api allow users to create account", request_body=serializer_class)
    #, query_serializer=serializer_class) 
    # @api_view(['POST', 'GET'])
    # @method_decorator(api_view(['GET', 'POST']))
    @swagger_auto_schema(operation_description="This api allow users to create account",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'username': openapi.Schema(type=openapi.TYPE_STRING),
                'email': openapi.Schema(type=openapi.TYPE_STRING),
                'password': openapi.Schema(type=openapi.TYPE_STRING),
                'role': openapi.Schema(type=openapi.TYPE_INTEGER, default=2)
            },
            required=['email', 'password']
        ),
        repsonse={200: UserSignUpSerializer})
    def post(self, request):
        # Serialize and validate data
        print(request.data)
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

        #Just added this portion
        else:
            return Reponse(serializer.errors, status= status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    serializer_class = UserLoginSerializer
    # Allow everyone (authenticated or not) to access this view
    permission_classes = (AllowAny,)

    # POST request handler
    @swagger_auto_schema(operation_description="This api allow users to log in to the account",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'email': openapi.Schema(type=openapi.TYPE_STRING),
                'password': openapi.Schema(type=openapi.TYPE_STRING),
            },
            required=['email', 'password']
        )) 
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

    @swagger_auto_schema(operation_description="This api allow users to view their profile after login", 
        responses={200: UserSerializer(many=True)})
    def get(self, request):
        response = dict()
        status_code = status.HTTP_200_OK

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
                        'username': request.user.username,
                        'email': request.user.email,
                        'games_managing': instructor.games_managing,
                        'my_players': instructor.my_players,
                        'my_plots': instructor.my_plots,
                        'my_default_game': instructor.my_default_game
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
                        'username': request.user.username,
                        'email': request.user.email,
                        'allowed_games': player.allowed_games,
                        'instructors': player.instructors,
                        'current_game': player.current_game,
                        'inventory': player.inventory,
                        'backorder': player.backorder,
                        'downstream_player': player.downstream_player,
                        'upstream_player': player.upstream_player
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

class AuthGameListView(APIView):
    # queryset = Game.objects.all()
    serializer_class = GameSerializer
    permission_classes = (IsAuthenticated,)

    # GET request handler
    @swagger_auto_schema(operation_description="This api allow users to view the games",
        response={200: serializer_class}) 
    def get(self, request,format=None):
        # Temporary data needed

        user = request.user
        status_code = status.HTTP_200_OK
        message = ''
        gameList = None

        if user.role == 1:
            # Retrieve all games on the platform
            serializer = 1

            message = 'Successfully fetched the games!'
            status_code = status.HTTP_200_OK

            # Set games to custom serializer
        if user.role == 2:
            # Retrieve all games that the instructor is owner of
            serializer = 2
            instructor = Instructor.objects.get(user=user)
            games = Game.objects.filter(instructor=instructor)
            if games:
                gameList = []
                for game in games:
                    temp = {
                        'session_length' : game.session_length,
                        'distributor_present' : game.distributor_present,
                        'wholesaler_present' : game.wholesaler_present,
                        'holding_cost' : game.holding_cost,
                        'backlog_cost' : game.backlog_cost,
                        'active' : game.active,
                        'info_sharing' : game.info_sharing,
                        'info_delay' : game.info_delay,
                        'rounds_completed' : game.rounds_completed,
                        'is_default_game' : game.is_default_game, 
                        'starting_inventory' : game.starting_inventory,
                        'player_weeks' : game.player_weeks
                    }
                    gameList.append(temp)
            else:
                gameList = "There is currently no game"
            
            message = 'Successfully fetched instructor\'s games!'
            status_code = status.HTTP_200_OK

            # Set games to custom serializer
        else:
            # Retrieve all games that the player is part of
            serializer = 3

            message = 'Successfully fetched player\'s games!'
            status_code = status.HTTP_200_OK

            # Set games to custom serializer

        response = {
            'success': True,
            'statusCode': status_code,
            'message': message,
            'games': gameList
        }

        return Response(response, status=status_code)

    ##Creating a Game
    @swagger_auto_schema(operation_description="This api allow users to create account",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'instructor': openapi.Schema(type=openapi.TYPE_STRING),
                'demandpattern': openapi.Schema(type=openapi.TYPE_STRING),

                'session_length': openapi.Schema(type=openapi.TYPE_INTEGER, default=0),
                'distributor_present': openapi.Schema(type=openapi.TYPE_BOOLEAN, default=False),
                'wholesaler_present': openapi.Schema(type=openapi.TYPE_BOOLEAN, default=False),
                'holding_cost': openapi.Schema(type=openapi.TYPE_NUMBER, default=0),
                'backlog_cost': openapi.Schema(type=openapi.TYPE_NUMBER, default=0),
                'active': openapi.Schema(type=openapi.TYPE_BOOLEAN, default=False),
                'info_sharing': openapi.Schema(type=openapi.TYPE_BOOLEAN, default=False),
                'info_delay': openapi.Schema(type=openapi.TYPE_INTEGER, default=2),
                'rounds_completed': openapi.Schema(type=openapi.TYPE_INTEGER, default=0),
                'is_default_game': openapi.Schema(type=openapi.TYPE_BOOLEAN, default=False),
                'starting_inventory': openapi.Schema(type=openapi.TYPE_INTEGER, default=12),
                'player_weeks': openapi.Schema(type=openapi.TYPE_INTEGER)
            },
            required=['demandpatter', 'player_weeks']
        ))
    def post(self,request):
        user = request.user
        status_code = status.HTTP_200_OK
        message = ''    
        if user.role == 2:
            instructor = Instructor.objects.get(user=user)
            request.data["instructor"] = instructor.uid
            demandpatterns = DemandPattern.objects.filter(instructor=instructor)
            
            # flag = True
            # if not demandpatterns:
            #     flag = False
            #     status_code = status.HTTP_400_BAD_REQUEST,
            #     message = 'Need to create demand pattern before the game'
            # else:
            #     for demandpattern in demandpatterns:
            #         if 
            # the demand pattern id has to be provided in this data
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
                    'message': 'Game Created Successfully!',
                }
                # Instantiate response object and send it back with code 201
                return Response(response, status=status_code)
        else:
            status_code = status.HTTP_401_UNAUTHORIZED
            response = {
                    'success': False,
                    'statusCode': status_code,
                    'message': 'Only Instrutctors can create games',
                }
            return Response(response,status=status_code)

class JoinGameView(APIView):
    ## Modifying game
    serializer_class = GameSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        # gameobj = self.get_object(pk)
        user = request.user
        status_code = status.HTTP_200_OK
        message = '' 

        if user.role == 3:
            serializer = self.serializer_class(data=request.data)            
            is_valid = serializer.is_valid(raise_exception=True)

            if is_valid:
                # Save serializer state
                Players = serializer.data.get('player')
                uid = serializer.data.get('uid')
                status_code = status.HTTP_201_CREATED
                Player.append(f'{user.uid} ')
                # Object accepted by the Response() call
                response = {
                    'success': True,
                    'statusCode': status_code,
                    'message': f'{user.username} added to the game {uid}',
                }

                # Instantiate response object and send it back with code 201
                return Response(response, status=status_code)
        else:
            status_code = status.HTTP_401_UNAUTHORIZED
            response = {
                    'success': False,
                    'statusCode': status_code,
                    'message': 'Only players can play games',
                }
            return Response(response,status=status_code)

class AuthDemandPatternView(APIView):
    # queryset = DemandPattern.objects.all()
    serializer_class = DemandPatternSerializer
    permission_classes = (IsAuthenticated,)

    # GET request handler
    @swagger_auto_schema(operation_description="This api allow intructors to create demand pattern",
        response={200: serializer_class}) 
    def get(self, request, format=None):
        user = request.user
        status_code = status.HTTP_200_OK
        message=''
        ##only intructor can check demand patterns
        if user.role == 2:
            instructor = Instructor.objects.get(user=user)
            patterns = DemandPattern.objects.filter(instructor=instructor)
            if patterns:
                profile = []
                for pattern in patterns:
                    temp = {
                        'uid': pattern.uid,
                        'instructor_id': instructor.uid,
                        'name': pattern.name,
                        'weeks': pattern.weeks,
                        'demand': pattern.demand,
                        'related_games': pattern.related_games
                    }
                    profile.append(temp)
            else:
                profile = "There is currently no demand pattern"
            
            response = {
                'success': True,
                'statusCode': status_code,
                'message': 'demand patterns fetched succesfully!',
                'profile': profile
            }
            return Response(response,status=status_code)
        else:
            status_code = status.HTTP_401_UNAUTHORIZED
            response = {
                    'success': False,
                    'statusCode': status_code,
                    'message': 'Only Instrutctors can check demmand patterns',
                }
            return Response(response,status=status_code)


    # POST request handler
    @swagger_auto_schema(operation_description="This api allow users to view their demand patterns",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'name': openapi.Schema(type=openapi.TYPE_STRING),
                'weeks': openapi.Schema(type=openapi.TYPE_INTEGER),
                'demand': openapi.Schema(type=openapi.TYPE_STRING),
                'related_games': openapi.Schema(type=openapi.TYPE_STRING)
            },
            required=['weeks']
        )) 
    # @api_view(['POST'])
    def post(self, request):
        user = request.user
        status_code = status.HTTP_200_OK
        message=''
        ##only intructor can check demand patterns

        if user.role == 2:
            instructor = Instructor.objects.get(user=user)
            request.data["instructor"] = instructor.uid
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
                    'message': 'Demmand Pattern Created Successfully!',
                }

                # Instantiate response object and send it back with code 201
                return Response(response, status=status_code)
        else:
            status_code = status.HTTP_401_UNAUTHORIZED
            response = {
                    'success': False,
                    'statusCode': status_code,
                    'message': 'Only Instructors can create demmand patterns',
                }
            return Response(response,status=status_code)
