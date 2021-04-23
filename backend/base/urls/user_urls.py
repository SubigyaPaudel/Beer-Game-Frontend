from django.urls import path
from base.views import user_views as views

urlpatterns = [
    path('login/', views.UserLoginView.as_view(), name='login'),
    path('signup/', views.UserSignUpView.as_view(), name='sign-up'),
    path('join-game/',views.JoinGameView.as_view(),name='join_game'),
    path('games/', views.AuthGameListView.as_view(), name='games_list'),
    path('pattern/', views.AuthDemandPatternView.as_view(), name='demand_pattern'),
    path('profile/', views.AuthUserProfileView.as_view(), name="users-profile"), 
    # path('profile/update/', views.updateUserProfile, name="users-profile-update"), 
    # path('', views.getUsers, name="users"), 
]