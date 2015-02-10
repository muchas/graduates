# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_registrationprofile'),
    ]

    operations = [
        migrations.RenameField(
            model_name='claim',
            old_name='phone_number',
            new_name='contact_phone',
        ),
    ]
