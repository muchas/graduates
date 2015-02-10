# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('community', '0004_auto_20141225_2117'),
    ]

    operations = [
        migrations.AlterField(
            model_name='teacherlearnyears',
            name='to_year',
            field=models.IntegerField(default=None, max_length=4, null=True, blank=True, choices=[(1989, 1989), (1990, 1990), (1991, 1991), (1992, 1992), (1993, 1993), (1994, 1994), (1995, 1995), (1996, 1996), (1997, 1997), (1998, 1998), (1999, 1999), (2000, 2000), (2001, 2001), (2002, 2002), (2003, 2003), (2004, 2004), (2005, 2005), (2006, 2006), (2007, 2007), (2008, 2008), (2009, 2009), (2010, 2010), (2011, 2011), (2012, 2012), (2013, 2013), (2014, 2014)]),
            preserve_default=True,
        ),
    ]
