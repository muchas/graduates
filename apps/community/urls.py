from django.conf.urls import patterns, url
from apps.community.views import TeacherListView, PersonGroupView, CityListView, CityDetailView, GroupDetailView, \
    StudentListView, EmploymentListView, StudentView, EmploymentView, PersonDescriptionView, \
    PersonProfileView, PersonalDataUpdateView, AttributeListView, UniversityListView, DepartmentListView, BranchListView, \
    PersonPhotoView, AuthenticatedPersonView, PersonMarriedNameView, GraduatedGroupListView, StudentGroupListView, \
    PersonSimilarityView, PersonInvitationView, PersonSearchView, NotEmptyCityListView, PersonConnectedPagesView, \
    PersonPhotoCropView

urlpatterns = patterns('',
                       url(r'teachers/', TeacherListView.as_view(), name='teacher_list'),
                       url(r'my-group/', PersonGroupView.as_view()),
                       url(r'student-groups/', StudentGroupListView.as_view(), name='student_group_list'),
                       url(r'graduates/', GraduatedGroupListView.as_view(), name='graduated_group_list'),
                       url(r'group/(?P<pk>\d+)/', GroupDetailView.as_view(), name='group'),
                       url(r'cities/not-empty/', NotEmptyCityListView.as_view(), name='connected_city_list'),
                       url(r'cities/', CityListView.as_view(), name='city_list'),
                       url(r'city/(?P<pk>\d+)/', CityDetailView.as_view(), name='city'),
                       url(r'students/', StudentListView.as_view(), name='student_list'),
                       url(r'student/(?P<pk>\d+)/', StudentView.as_view(), name='student'),
                       url(r'employments/', EmploymentListView.as_view(), name='employment_list'),
                       url(r'employment/(?P<pk>\d+)/', EmploymentView.as_view(), name='employment'),
                       url(r'description/', PersonDescriptionView.as_view(), name='person_description'),
                       url(r'photo/crop/$', PersonPhotoCropView.as_view(), name='person_photo_crop'),
                       url(r'photo/$', PersonPhotoView.as_view(), name='person_photo'),
                       url(r'person/(?P<pk>\d+)/', PersonProfileView.as_view(), name='person_card'),
                       url(r'attributes/', AttributeListView.as_view(), name='personal_data_list'),
                       url(r'attribute/(?P<pk>\d+)/', PersonalDataUpdateView.as_view(), name='personal_data'),
                       url(r'universities/', UniversityListView.as_view(), name='university_list'),
                       url(r'departments/', DepartmentListView.as_view(), name='department_list'),
                       url(r'branches/', BranchListView.as_view(), name='branch_list'),
                       url(r'my-profile/', AuthenticatedPersonView.as_view(), name='profile_header'),
                       url(r'married-name/', PersonMarriedNameView.as_view(), name='profile_married_name'),
                       url(r'similarity/(?P<pk>\d+)/', PersonSimilarityView.as_view(), name='profile_similarity'),
                       url(r'invite/(?P<pk>\d+)/', PersonInvitationView.as_view(), name='profile_invitation'),
                       url(r'search/', PersonSearchView.as_view(), name='search'),
                       url(r'connected-pages/(?P<pk>\d+)/', PersonConnectedPagesView.as_view(), name='connected_pages')
)
