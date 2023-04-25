from datetime import timedelta
from django.db.models import Q
from rest_framework.permissions import AllowAny
from django.utils import timezone
from rest_framework.viewsets import ModelViewSet
from .models import Post
from .serializers import PostSerializer


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
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        return super().perform_create(serializer)