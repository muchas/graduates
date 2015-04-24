# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('community', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('content', models.TextField()),
                ('datetime', models.DateTimeField(auto_now_add=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('post_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='posts.Post')),
            ],
            options={
            },
            bases=('posts.post',),
        ),
        migrations.AddField(
            model_name='post',
            name='author',
            field=models.ForeignKey(to='community.Person'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='comment',
            name='related_post',
            field=models.ForeignKey(related_name='comments', to='posts.Post'),
            preserve_default=True,
        ),
    ]
