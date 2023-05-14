from rest_framework import serializers
from django.contrib.auth import get_user_model

from accounts.services import get_full_path_of_avatar_url


User = get_user_model()


class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = User.objects.create(username=validated_data['username'])
        user.set_password(validated_data['password'])
        user.save()
        return user

    class Meta:
        model = User
        fields = ['pk', 'username', 'password']


class SuggestionUserserializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField('avatar_url_field')

    class Meta:
        model = User
        fields = ['username', 'name', 'avatar_url']

    def avatar_url_field(self, obj):
        request = self.context['request'] if self.context['request'] else None
        return get_full_path_of_avatar_url(request,  obj.avatar_url)