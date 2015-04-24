from django.http import Http404
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
    related_post = None
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticated, IsCommunityMember)

    def get_related_post(self):
        try:
            post = Post.objects.get(pk=self.kwargs['pk'])
        except Post.DoesNotExist:
            raise Http404("Post does not exist")
        return post

    def get_queryset(self):
        self.related_post = self.get_related_post()
        return Comment.objects.filter(related_post=self.kwargs['pk'])


class CommentView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticated, IsAuthorOrReadOnly)
    queryset = Comment.objects.all()