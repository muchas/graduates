from django.conf.urls import patterns, url
from apps.community.views import TeacherListView, PersonGroupView, CityListView, CityDetailView, GroupDetailView, \
    StudentListView, EmploymentListView, StudentView, EmploymentView, GroupListView, PersonDescriptionView, \
    PersonProfileView, PersonalDataUpdateView, AttributeListView

urlpatterns = patterns('',
                       url(r'teachers/', TeacherListView.as_view(), name='teacher-list'),
                       url(r'my-group/', PersonGroupView.as_view()),
                       url(r'groups/', GroupListView.as_view(), name='group-list'),
                       url(r'group/(?P<pk>\d+)/', GroupDetailView.as_view(), name='group'),
                       url(r'cities/', CityListView.as_view(), name='city-list'),
                       url(r'city/(?P<pk>\d+)/', CityDetailView.as_view()),
                       url(r'students/', StudentListView.as_view(), name='student-list'),
                       url(r'student/(?P<pk>\d+)/', StudentView.as_view(), name='student'),
                       url(r'employments/', EmploymentListView.as_view(), name='employment-list'),
                       url(r'employment/(?P<pk>\d+)/', EmploymentView.as_view(), name='employment'),
                       url(r'description/', PersonDescriptionView.as_view(), name='person-description'),
                       url(r'person/(?P<pk>\d+)/', PersonProfileView.as_view(), name='person-card'),
                       url(r'attributes/', AttributeListView.as_view(), name='personal-data-list'),
                       url(r'attribute/(?P<pk>\d+)/', PersonalDataUpdateView.as_view(), name='personal-data')
)
