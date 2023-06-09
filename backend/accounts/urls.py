from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from accounts import views


urlpatterns = [
    path("signup/", views.SignupView.as_view(), name='signup'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    path('suggestions/', views.SuggestionListView.as_view(), name='suggetion_user_list'),
    path('follow/', views.user_follow, name='user_follow'),
    path('unfollow/', views.user_unfollow, name='user_unfollow'),
]