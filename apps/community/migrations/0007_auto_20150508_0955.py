# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('community', '0006_auto_20150508_0952'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='employment',
            options={'ordering': ['-start', '-end']},
        ),
    ]
