from datetime import timedelta
from django.db.models import Q
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer


# Create your views here.
class PostViewSet(ModelViewSet):
    queryset = (
        Post.objects.all()
        .select_related('author')
        .prefetch_related('tag_set', 'like_user_set')
    )
    serializer_class = PostSerializer
    # permission_classes = [AllowAny]  # FIXME: 인증 적용

    def get_queryset(self):
        # timesince = timezone.now() - timedelta(days=3)

        qs = super().get_queryset()
        qs = qs.filter(
            Q(author=self.request.user)
            | Q(author__in=self.request.user.following_set.all())
        )
        # qs = qs.filter(created_at__gte=timesince)
        
        return qs
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        return super().perform_create(serializer)
    

    @action(detail=True, methods=['POST'])
    def like(self, request, pk):
        post = self.get_object()
        post.like_user_set.add(request.user)
        return Response(status.HTTP_201_CREATED)

    @like.mapping.delete
    def uplike(self, request, pk):
        post = self.get_object()
        post.like_user_set.remove(request.user)
        return Response(status.HTTP_204_NO_CONTENT)
    

class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        qs = qs.filter(post__pk=self.kwargs['post_pk'])
        return qs
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
    
    def perform_create(self, serializer):
        post = get_object_or_404(Post, pk=self.kwargs['post_pk'])
        serializer.save(author=self.request.user, post=post)
        return super().perform_create(serializer)