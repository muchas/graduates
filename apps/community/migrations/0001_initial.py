# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.utils.timezone
import uuidfield.fields
import model_utils.fields


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Attribute',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
                ('data_type', models.IntegerField(default=1, choices=[(0, b'email'), (1, b'char'), (2, b'integer')])),
                ('display_order', models.SmallIntegerField()),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Branch',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=90)),
                ('latitude', models.FloatField(null=True, blank=True)),
                ('longitude', models.FloatField(null=True, blank=True)),
                ('is_verified', models.BooleanField(default=False)),
                ('is_empty', models.BooleanField(default=True)),
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
                ('end', models.DateField(null=True, blank=True)),
                ('branch', models.ForeignKey(to='community.Branch')),
                ('city', models.ForeignKey(related_name='employments', to='community.City')),
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
                ('first_year', models.IntegerField(default=2015, max_length=4, choices=[(1989, 1989), (1990, 1990), (1991, 1991), (1992, 1992), (1993, 1993), (1994, 1994), (1995, 1995), (1996, 1996), (1997, 1997), (1998, 1998), (1999, 1999), (2000, 2000), (2001, 2001), (2002, 2002), (2003, 2003), (2004, 2004), (2005, 2005), (2006, 2006), (2007, 2007), (2008, 2008), (2009, 2009), (2010, 2010), (2011, 2011), (2012, 2012), (2013, 2013), (2014, 2014), (2015, 2015)])),
                ('last_year', models.IntegerField(default=2015, max_length=4, choices=[(1989, 1989), (1990, 1990), (1991, 1991), (1992, 1992), (1993, 1993), (1994, 1994), (1995, 1995), (1996, 1996), (1997, 1997), (1998, 1998), (1999, 1999), (2000, 2000), (2001, 2001), (2002, 2002), (2003, 2003), (2004, 2004), (2005, 2005), (2006, 2006), (2007, 2007), (2008, 2008), (2009, 2009), (2010, 2010), (2011, 2011), (2012, 2012), (2013, 2013), (2014, 2014), (2015, 2015)])),
                ('symbol', models.CharField(max_length=4)),
                ('is_graduated', models.BooleanField(default=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Invitation',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('email', models.EmailField(max_length=75)),
                ('message', models.TextField(null=True, blank=True)),
                ('datetime', models.DateTimeField(auto_now_add=True)),
                ('uuid', uuidfield.fields.UUIDField(unique=True, max_length=32, editable=False, blank=True)),
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
                ('picture', models.ImageField(null=True, upload_to=b'pictures/', blank=True)),
                ('sex', models.SmallIntegerField(default=0, choices=[(0, b'not known'), (1, b'male'), (2, b'female'), (9, b'not applicable')])),
                ('description', models.TextField(null=True, blank=True)),
                ('allow_invitation', models.BooleanField(default=True)),
                ('branches', models.ManyToManyField(to='community.Branch', through='community.Employment')),
                ('companies', models.ManyToManyField(to='community.Company', through='community.Employment')),
                ('group', models.ForeignKey(related_name='pupils', blank=True, to='community.Group', null=True)),
            ],
            options={
                'verbose_name_plural': 'people',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='PersonalData',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, verbose_name='created', editable=False)),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, verbose_name='modified', editable=False)),
                ('is_public', models.BooleanField(default=True)),
                ('value', models.CharField(default=b'', max_length=255, null=True, blank=True)),
                ('attribute', models.ForeignKey(to='community.Attribute')),
                ('person', models.ForeignKey(to='community.Person')),
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
            name='TeacherLearnYears',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('from_year', models.IntegerField(default=2015, max_length=4, choices=[(1989, 1989), (1990, 1990), (1991, 1991), (1992, 1992), (1993, 1993), (1994, 1994), (1995, 1995), (1996, 1996), (1997, 1997), (1998, 1998), (1999, 1999), (2000, 2000), (2001, 2001), (2002, 2002), (2003, 2003), (2004, 2004), (2005, 2005), (2006, 2006), (2007, 2007), (2008, 2008), (2009, 2009), (2010, 2010), (2011, 2011), (2012, 2012), (2013, 2013), (2014, 2014), (2015, 2015)])),
                ('to_year', models.IntegerField(default=None, max_length=4, null=True, blank=True, choices=[(1989, 1989), (1990, 1990), (1991, 1991), (1992, 1992), (1993, 1993), (1994, 1994), (1995, 1995), (1996, 1996), (1997, 1997), (1998, 1998), (1999, 1999), (2000, 2000), (2001, 2001), (2002, 2002), (2003, 2003), (2004, 2004), (2005, 2005), (2006, 2006), (2007, 2007), (2008, 2008), (2009, 2009), (2010, 2010), (2011, 2011), (2012, 2012), (2013, 2013), (2014, 2014), (2015, 2015)])),
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
                ('acronym', models.CharField(max_length=10, null=True, blank=True)),
                ('is_verified', models.BooleanField(default=False)),
                ('city', models.ForeignKey(related_name='universities', to='community.City')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='UniversityDepartment',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255, blank=True)),
                ('acronym', models.CharField(max_length=10, null=True, blank=True)),
                ('is_verified', models.BooleanField(default=False)),
                ('university', models.ForeignKey(to='community.University')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='student',
            name='department',
            field=models.ForeignKey(blank=True, to='community.UniversityDepartment', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='student',
            name='person',
            field=models.ForeignKey(to='community.Person'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='student',
            name='university',
            field=models.ForeignKey(to='community.University'),
            preserve_default=True,
        ),
        migrations.AlterUniqueTogether(
            name='personaldata',
            unique_together=set([('person', 'attribute')]),
        ),
        migrations.AddField(
            model_name='person',
            name='subjects',
            field=models.ManyToManyField(to='community.Subject', blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='person',
            name='universities',
            field=models.ManyToManyField(to='community.University', through='community.Student'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='invitation',
            name='invited_by',
            field=models.ForeignKey(related_name='sent_invitations', to='community.Person'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='invitation',
            name='person',
            field=models.ForeignKey(related_name='invitations', to='community.Person'),
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
            name='person',
            field=models.ForeignKey(related_name='employments', to='community.Person'),
            preserve_default=True,
        ),
    ]
