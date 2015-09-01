# -*- coding: utf-8 -*-
from django.db import models

from model_utils.models import TimeStampedModel

from apps.accounts.models import User
from apps.community.models import Person


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


class JubileeBooking(TimeStampedModel):
    email = models.EmailField(
        verbose_name='Adres e-mail',
        blank=True,
        help_text=u'To pole jest nieobowiązkowe, ale zachęcamy do uzupełnienia, aby pozostać w kontakcie ze szkołą.'
    )

    gifts_included = models.BooleanField(default=False)
    person = models.OneToOneField(Person)
