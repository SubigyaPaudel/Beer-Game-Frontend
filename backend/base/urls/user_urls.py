from django.urls import path
from base.views import user_views as views

urlpatterns = [
    path('login/', views.UserLoginView.as_view(), name='login'),
    path('signup/', views.UserSignUpView.as_view(), name='sign-up'),
    # path('profile/', views.getUserProfile, name="users-profile"), 
    # path('profile/update/', views.updateUserProfile, name="users-profile-update"), 
    # path('', views.getUsers, name="users"), 
]