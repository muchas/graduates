# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('community', '0005_auto_20150503_0903'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='employment',
            options={'ordering': ['start', 'end']},
        ),
    ]
