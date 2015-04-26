from django.conf.urls import patterns, url
from apps.posts.views import PostListView, PostView, CommentListView, CommentView

urlpatterns = patterns('',
                       url(r'posts/', PostListView.as_view(), name='post-list'),
                       url(r'post/(?P<pk>\d+)/$', PostView.as_view(), name='post'),
                       url(r'post/(?P<pk>\d+)/comment/', CommentListView.as_view(), name='comment-list'),
                       url(r'comment/(?P<pk>\d+)', CommentView.as_view(), name='comment')
                       )