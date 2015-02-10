# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('community', '0002_auto_20141223_1616'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='person',
            options={'verbose_name_plural': 'people'},
        ),
        migrations.RenameField(
            model_name='city',
            old_name='x',
            new_name='latitude',
        ),
        migrations.RenameField(
            model_name='city',
            old_name='y',
            new_name='longitude',
        ),
    ]
