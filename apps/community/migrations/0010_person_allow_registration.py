# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('community', '0009_auto_20150522_1016'),
    ]

    operations = [
        migrations.AddField(
            model_name='person',
            name='allow_registration',
            field=models.BooleanField(default=True),
            preserve_default=True,
        ),
    ]
