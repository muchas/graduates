from django.conf.urls import patterns, url

from rest_framework import routers

from .views import CommentListView, CommentView, PostViewSet

router = routers.SimpleRouter()
router.register(r'posts', PostViewSet)


urlpatterns = patterns('',
                       url(r'post/(?P<pk>\d+)/comment/', CommentListView.as_view(), name='comment_list'),
                       url(r'comment/(?P<pk>\d+)', CommentView.as_view(), name='comment')
                       )
urlpatterns += router.urls