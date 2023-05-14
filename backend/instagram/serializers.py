import re

from django.contrib.auth import get_user_model
from rest_framework import serializers

from accounts.services import get_full_path_of_avatar_url

from .models import Post, Comment


class AuthorSerializer(serializers.ModelSerializer):
	avatar_url = serializers.SerializerMethodField('avatar_url_field')
	class Meta:
		model = get_user_model()
		fields = ['username', 'name', 'avatar_url']

	def avatar_url_field(self, obj):
		request = self.context['request'] if self.context['request'] else None
		return get_full_path_of_avatar_url(request,  obj.avatar_url)


class PostSerializer(serializers.ModelSerializer):
	author = AuthorSerializer(read_only=True)
	is_like = serializers.SerializerMethodField('is_like_field')
	class Meta:
		model = Post
		fields = [
			'id', 
			'author', 
			'caption', 
			'location', 
			'photo', 
			'tag_set', 
			'created_at', 
			'is_like'
		]

	def is_like_field(self ,obj):
		if 'request' in self.context:
			user = self.context['request'].user
			return obj.like_user_set.filter(pk=user.pk).exists()
		return False
	

class CommentSerializer(serializers.ModelSerializer):
	author = AuthorSerializer(read_only=True)

	class Meta:
		model = Comment
		fields = ['id', 'author', 'message', 'created_at']