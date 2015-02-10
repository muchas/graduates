# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_auto_20141223_1655'),
    ]

    operations = [
        migrations.AddField(
            model_name='claim',
            name='is_considered',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
    ]
