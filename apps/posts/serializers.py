from django.utils.timezone import now
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

    def update(self, instance, validated_data):
        instance.datetime = now()
        return super(PostSerializer, self).update(instance, validated_data)


class CommentSerializer(serializers.ModelSerializer):
    author = PersonSerializer(read_only=True)
    class Meta:
        model = Comment
        read_only_fields = ('related_post',)

    def create(self, validated_data):
        related_post=self.context['view'].get_related_post()
        validated_data['related_post'] = related_post
        return Comment.objects.create(
            author=self.context['request'].user.person,
            **validated_data
        )

    def update(self, instance, validated_data):
        instance.datetime = now()
        return super(CommentSerializer, self).update(instance, validated_data)