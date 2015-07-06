from django.db import models

from model_utils.models import TimeStampedModel

from apps.community.models import Person


class Post(TimeStampedModel):
    content = models.TextField()
    author = models.ForeignKey(Person)

    class Meta:
        ordering=['-created',]


class Comment(TimeStampedModel):
    content = models.TextField()
    author = models.ForeignKey(Person)
    post = models.ForeignKey(Post, related_name='comments')
