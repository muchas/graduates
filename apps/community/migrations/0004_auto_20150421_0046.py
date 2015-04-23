# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('community', '0003_auto_20150419_1400'),
    ]

    operations = [
        migrations.AlterField(
            model_name='achievement',
            name='person',
            field=models.ForeignKey(related_name='achievements', to='community.Person'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='contest',
            name='scope',
            field=models.ForeignKey(related_name='contests', to='community.ContestScope'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='contestedition',
            name='contest',
            field=models.ForeignKey(related_name='editions', to='community.Contest'),
            preserve_default=True,
        ),
    ]
