from django.shortcuts import get_object_or_404
from rest_framework import serializers
from apps.community.serializers import PersonSerializer
from apps.posts.models import Post, Comment


class PostSerializer(serializers.ModelSerializer):
    author = PersonSerializer(read_only=True)

    class Meta:
        model = Post

    def create(self, validated_data):
        return Post.objects.create(
            author=self.context['request'].user.person,
            **validated_data
        )


class CommentSerializer(serializers.ModelSerializer):
    author = PersonSerializer(read_only=True)
    class Meta:
        model = Comment
        read_only_fields = ('post',)

    def create(self, validated_data):
        post = get_object_or_404(Post, pk=self.context['view'].kwargs['pk'])
        validated_data['post'] = post
        return Comment.objects.create(
            author=self.context['request'].user.person,
            **validated_data
        )
