# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('community', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='person',
            name='group',
            field=models.ForeignKey(related_name='pupils', blank=True, to='community.Group', null=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='person',
            name='picture',
            field=models.ImageField(null=True, upload_to=b'media/pictures/', blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='person',
            name='subjects',
            field=models.ManyToManyField(to='community.Subject', blank=True),
            preserve_default=True,
        ),
    ]
