# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('community', '0002_auto_20150419_1342'),
    ]

    operations = [
        migrations.AlterField(
            model_name='achievement',
            name='place',
            field=models.IntegerField(null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='achievement',
            name='points',
            field=models.IntegerField(null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='achievement',
            name='result',
            field=models.ForeignKey(blank=True, to='community.ContestResult', null=True),
            preserve_default=True,
        ),
    ]
