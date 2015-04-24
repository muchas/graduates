from django.db import models
from apps.community.models import Person


class Post(models.Model):
    content = models.TextField()
    datetime = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(Person)


class Comment(Post):
    related_post = models.ForeignKey(Post, related_name='comments')
