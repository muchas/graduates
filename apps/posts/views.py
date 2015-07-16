from django.shortcuts import get_object_or_404

from rest_framework import generics, viewsets
from rest_framework.permissions import IsAuthenticated

from apps.community.permissions import IsCommunityMember
from .models import Post, Comment
from .permissions import IsAuthorOrReadOnly
from .serializers import PostSerializer, CommentSerializer


class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    permission_classes = (IsAuthenticated, IsCommunityMember, IsAuthorOrReadOnly)


class CommentListView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticated, IsCommunityMember)

    def get_queryset(self):
        post = get_object_or_404(Post, pk=self.kwargs['pk'])
        return Comment.objects.filter(post=post)


class CommentView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticated, IsAuthorOrReadOnly)
    queryset = Comment.objects.all()