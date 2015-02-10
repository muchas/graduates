# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_claim_is_considered'),
    ]

    operations = [
        migrations.AddField(
            model_name='invitation',
            name='message',
            field=models.TextField(null=True, blank=True),
            preserve_default=True,
        ),
    ]
