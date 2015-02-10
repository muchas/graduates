from django.conf.urls import patterns, url
from apps.community.views import TeacherListView, PersonGroupView, CityListView, CityDetailView, GroupDetailView

urlpatterns = patterns('',
                       url(r'teachers/', TeacherListView.as_view()),
                       url(r'my-group/', PersonGroupView.as_view()),
                       url(r'group/(?P<pk>\d+)/', GroupDetailView.as_view()),
                       url(r'cities/', CityListView.as_view()),
                       url(r'city/(?P<pk>\d+)/', CityDetailView.as_view()),
)
