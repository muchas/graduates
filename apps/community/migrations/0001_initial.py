# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=90)),
                ('x', models.FloatField()),
                ('y', models.FloatField()),
                ('is_verified', models.BooleanField(default=False)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Employment',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
                ('start', models.DateField()),
                ('end', models.DateField()),
                ('city', models.ForeignKey(to='community.City')),
                ('company', models.ForeignKey(to='community.Company')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Group',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('first_year', models.IntegerField(default=2014, max_length=4, choices=[(1989, 1989), (1990, 1990), (1991, 1991), (1992, 1992), (1993, 1993), (1994, 1994), (1995, 1995), (1996, 1996), (1997, 1997), (1998, 1998), (1999, 1999), (2000, 2000), (2001, 2001), (2002, 2002), (2003, 2003), (2004, 2004), (2005, 2005), (2006, 2006), (2007, 2007), (2008, 2008), (2009, 2009), (2010, 2010), (2011, 2011), (2012, 2012), (2013, 2013), (2014, 2014)])),
                ('last_year', models.IntegerField(default=2014, max_length=4, choices=[(1989, 1989), (1990, 1990), (1991, 1991), (1992, 1992), (1993, 1993), (1994, 1994), (1995, 1995), (1996, 1996), (1997, 1997), (1998, 1998), (1999, 1999), (2000, 2000), (2001, 2001), (2002, 2002), (2003, 2003), (2004, 2004), (2005, 2005), (2006, 2006), (2007, 2007), (2008, 2008), (2009, 2009), (2010, 2010), (2011, 2011), (2012, 2012), (2013, 2013), (2014, 2014)])),
                ('symbol', models.CharField(max_length=4)),
                ('is_graduated', models.BooleanField(default=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Industry',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Person',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('first_name', models.CharField(max_length=255)),
                ('last_name', models.CharField(max_length=255)),
                ('married_name', models.CharField(max_length=255, null=True, blank=True)),
                ('picture', models.ImageField(upload_to=b'media/pictures/')),
                ('sex', models.SmallIntegerField(default=0, choices=[(0, b'not known'), (1, b'male'), (2, b'female'), (9, b'not applicable')])),
                ('group', models.ForeignKey(related_name='pupils', to='community.Group', null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('start', models.DateField()),
                ('end', models.DateField()),
                ('school', models.CharField(max_length=255)),
                ('department', models.CharField(max_length=255, null=True, blank=True)),
                ('person', models.ForeignKey(to='community.Person')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Subject',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50)),
                ('name_brand', models.CharField(max_length=50)),
                ('short_name', models.CharField(max_length=50)),
                ('acronym', models.CharField(max_length=10)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Teacher',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('from_year', models.IntegerField(default=2014, max_length=4, choices=[(1989, 1989), (1990, 1990), (1991, 1991), (1992, 1992), (1993, 1993), (1994, 1994), (1995, 1995), (1996, 1996), (1997, 1997), (1998, 1998), (1999, 1999), (2000, 2000), (2001, 2001), (2002, 2002), (2003, 2003), (2004, 2004), (2005, 2005), (2006, 2006), (2007, 2007), (2008, 2008), (2009, 2009), (2010, 2010), (2011, 2011), (2012, 2012), (2013, 2013), (2014, 2014)])),
                ('to_year', models.IntegerField(default=2014, max_length=4, choices=[(1989, 1989), (1990, 1990), (1991, 1991), (1992, 1992), (1993, 1993), (1994, 1994), (1995, 1995), (1996, 1996), (1997, 1997), (1998, 1998), (1999, 1999), (2000, 2000), (2001, 2001), (2002, 2002), (2003, 2003), (2004, 2004), (2005, 2005), (2006, 2006), (2007, 2007), (2008, 2008), (2009, 2009), (2010, 2010), (2011, 2011), (2012, 2012), (2013, 2013), (2014, 2014)])),
                ('person', models.ForeignKey(related_name='teacher_learn_years', to='community.Person')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='University',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
                ('is_verified', models.BooleanField(default=False)),
                ('city', models.ForeignKey(to='community.City')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='student',
            name='university',
            field=models.ForeignKey(to='community.University'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='person',
            name='subjects',
            field=models.ManyToManyField(to='community.Subject'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='person',
            name='universities',
            field=models.ManyToManyField(to='community.University', through='community.Student'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='group',
            name='tutor',
            field=models.ForeignKey(related_name='groups', to='community.Person'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='employment',
            name='industry',
            field=models.ForeignKey(to='community.Industry'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='employment',
            name='person',
            field=models.ForeignKey(to='community.Person'),
            preserve_default=True,
        ),
    ]
