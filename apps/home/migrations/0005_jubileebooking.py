# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.utils.timezone
import model_utils.fields


class Migration(migrations.Migration):

    dependencies = [
        ('community', '0010_person_allow_registration'),
        ('home', '0004_auto_20150505_2033'),
    ]

    operations = [
        migrations.CreateModel(
            name='JubileeBooking',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, verbose_name='created', editable=False)),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, verbose_name='modified', editable=False)),
                ('email', models.EmailField(help_text='To pole jest nieobowi\u0105zkowe, ale zach\u0119camy do uzupe\u0142nienia, aby pozosta\u0107 w kontakcie ze szko\u0142\u0105.', max_length=75, verbose_name=b'Adres e-mail', blank=True)),
                ('gifts_included', models.BooleanField(default=False)),
                ('person', models.OneToOneField(to='community.Person')),
            ],
            options={
                'abstract': False,
            },
            bases=(models.Model,),
        ),
    ]
