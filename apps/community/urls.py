from django.conf.urls import patterns, url

from rest_framework import routers

from apps.community.views import (
    GroupDetailView, PersonDescriptionView,PersonProfileView, PersonalDataUpdateView,
    AttributeListView, AuthenticatedPersonView, PersonMarriedNameView,  BranchViewSet,
    PersonSimilarityView, PersonInvitationView, PersonSearchView, PersonConnectedPagesView,
    PersonPhotoCropView, CityViewSet, EmploymentViewSet, StudentViewSet, UniversityViewSet,
    DepartmentViewSet, TeacherViewSet, PersonPhotoView, GroupListView,
)


router = routers.SimpleRouter()
router.register(r'cities', CityViewSet)
router.register(r'employments', EmploymentViewSet, base_name='employment')
router.register(r'branches', BranchViewSet)
router.register(r'students', StudentViewSet, base_name='student')
router.register(r'universities', UniversityViewSet)
router.register(r'departments', DepartmentViewSet, base_name='department')
router.register(r'teachers', TeacherViewSet, base_name='teacher')

urlpatterns = patterns('',
                       url(r'groups/$', GroupListView.as_view(), name='group-list'),
                       url(r'groups/(?P<pk>\d+)/$', GroupDetailView.as_view(), name='group'),
                       url(r'description/$', PersonDescriptionView.as_view(), name='person-description'),
                       url(r'photo/crop/$', PersonPhotoCropView.as_view(), name='person-photo-crop'),
                       url(r'photo/$', PersonPhotoView.as_view(), name='person-photo'),
                       url(r'people/(?P<pk>\d+)/$', PersonProfileView.as_view(), name='person_card'),
                       url(r'people/(?P<pk>\d+)/pages/$', PersonConnectedPagesView.as_view(), name='connected-pages'),
                       url(r'people/(?P<pk>\d+)/invitations/$', PersonInvitationView.as_view(), name='invitation'),
                       url(r'people/(?P<pk>\d+)/similarities/$', PersonSimilarityView.as_view(), name='profile-similarity'),
                       url(r'attributes/$', AttributeListView.as_view(), name='personal-data-list'),
                       url(r'attributes/(?P<pk>\d+)/$', PersonalDataUpdateView.as_view(), name='personal-data'),
                       url(r'my-profile/$', AuthenticatedPersonView.as_view(), name='profile-header'),
                       url(r'married-name/$', PersonMarriedNameView.as_view(), name='profile-married-name'),
                       url(r'search/', PersonSearchView.as_view(), name='search'),
)

urlpatterns += router.urls
