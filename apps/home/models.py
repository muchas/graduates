from django.db import models
from model_utils.models import TimeStampedModel
from apps.accounts.models import User


class Feedback(TimeStampedModel):
    content = models.TextField()
    is_read = models.BooleanField(default=False)
    user = models.ForeignKey(User)

    def __unicode__(self):
        return "%s" % self.user.email


class Guest(TimeStampedModel):
    email = models.EmailField(unique=True)

    def __unicode__(self):
        return "%s" % self.email