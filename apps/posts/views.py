from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from apps.community.permissions import IsCommunityMember
from apps.posts.models import Post, Comment
from apps.posts.permissions import IsAuthorOrReadOnly
from apps.posts.serializers import PostSerializer, CommentSerializer


class PostView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    permission_classes = (IsAuthenticated, IsAuthorOrReadOnly)


class PostListView(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    permission_classes = (IsAuthenticated, IsCommunityMember)


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