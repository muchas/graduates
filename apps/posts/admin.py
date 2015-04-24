from django.contrib import admin
from apps.posts.models import Post, Comment

admin.site.register(Post)
admin.site.register(Comment)