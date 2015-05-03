# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('community', '0004_auto_20150421_0046'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='person',
            options={'ordering': ['last_name'], 'verbose_name_plural': 'people'},
        ),
    ]
