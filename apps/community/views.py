from django.core.cache import get_cache
from django.core.mail import EmailMessage
from django.shortcuts import get_object_or_404
from django.utils.translation import ungettext, ugettext as _
from rest_framework import generics, views
from django.utils.translation import ugettext as _
from rest_framework import generics, views, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from apps.community.models import Person, City, Group, Student, Employment, PersonalData, Attribute, University, \
    UniversityDepartment, Branch
from apps.community.permissions import IsCommunityMember, IsOwnerOrReadOnly, IsFemale, IsAllowedToBeInvited
from apps.community.serializers import TeacherSerializer, GroupDetailsSerializer, CitySerializer, StudentSerializer, \
    EmploymentSerializer, PersonDescriptionSerializer, PersonProfileSerializer, PersonalDataSerializer, \
    AttributeSerializer, UniversitySerializer, UniversityDepartmentSerializer, BranchSerializer, PersonPhotoSerializer, \
    PersonSerializer, PersonMarriedNameSerializer, GroupSerializer, InvitationSerializer
from utils.mail import send_templated_email


class CityDetailView(views.APIView):
    permission_classes = (IsAuthenticated,)

    def get_object(self, pk):
        cache = get_cache('default')
        city = cache.get('city_' + pk)
        if not city:
            # case when city is not cached
            # query city and people connected with that city
            # serialize it and then save in cache
            # return result
            pass
        return city

    def get(self, request, pk, format=None):
        city = self.get_object(pk)
        return Response(city)


class CityListView(generics.ListAPIView):
    queryset = City.objects.filter(is_verified=True)
    serializer_class = CitySerializer
    permission_classes = (IsAuthenticated,)


class BranchListView(generics.ListAPIView):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer
    permission_classes = (IsAuthenticated,)


class TeacherListView(generics.ListAPIView):
    queryset = Person.objects.exclude(teacher_learn_years=None)
    serializer_class = TeacherSerializer
    permission_classes = (IsAuthenticated,)


class GraduatedGroupListView(views.APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, *args, **kwargs):
        groups = Group.objects.filter(is_graduated=True).order_by('last_year')
        result = {}
        results = []
        for group in groups:
            if not group.last_year in result:
                result[group.last_year] = []
            serializer = GroupSerializer(group)
            result[group.last_year].append(serializer.data)

        for year, groups in result.iteritems():
            results.append({'year': year, 'groups': groups})
        return Response(results)


class StudentGroupListView(views.APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, *args, **kwargs):
        groups = Group.objects.filter(is_graduated=False).order_by('last_year')
        years = {}
        results = []
        for group in groups:
            if not group.last_year in years:
                years[group.last_year] = []
            serializer = GroupSerializer(group)
            years[group.last_year].append(serializer.data)

        for year, groups in years.iteritems():
            results.append({'year': year, 'groups': groups})
        return Response(results)


class GroupDetailView(generics.RetrieveAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupDetailsSerializer
    permission_classes = (IsAuthenticated,)


class PersonGroupView(generics.RetrieveAPIView):
    serializer_class = GroupDetailsSerializer
    permission_classes = (IsAuthenticated, IsCommunityMember)

    def get_object(self):
        return self.request.user.person.group


class UniversityListView(generics.ListAPIView):
    serializer_class = UniversitySerializer
    permission_classes = (IsAuthenticated,)
    queryset = University.objects.all()


class DepartmentListView(generics.ListAPIView):
    serializer_class = UniversityDepartmentSerializer
    permission_classes = (IsAuthenticated,)
    queryset = UniversityDepartment.objects.all()


class StudentListView(generics.ListCreateAPIView):
    serializer_class = StudentSerializer
    permission_classes = (IsAuthenticated, IsCommunityMember)

    def get_queryset(self):
        return Student.objects.filter(person=self.request.user.person)


class StudentView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = StudentSerializer
    permission_classes = (IsAuthenticated, IsCommunityMember)

    def get_queryset(self):
        return Student.objects.filter(person=self.request.user.person)


class EmploymentListView(generics.ListCreateAPIView):
    serializer_class = EmploymentSerializer
    permission_classes = (IsAuthenticated, IsCommunityMember)

    def get_queryset(self):
        return Employment.objects.filter(person=self.request.user.person)


class EmploymentView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = EmploymentSerializer
    permission_classes = (IsAuthenticated, IsCommunityMember)

    def get_queryset(self):
        return Employment.objects.filter(person=self.request.user.person)


class AuthenticatedPersonView(generics.RetrieveAPIView):
    serializer_class = PersonSerializer
    permission_classes = (IsAuthenticated, IsCommunityMember)

    def get_object(self):
        return self.request.user.person


class PersonDescriptionView(generics.RetrieveUpdateAPIView):
    serializer_class = PersonDescriptionSerializer
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly)

    def get_object(self):
        return self.request.user.person


class PersonMarriedNameView(generics.RetrieveUpdateAPIView):
    serializer_class = PersonMarriedNameSerializer
    permission_classes = (IsAuthenticated, IsCommunityMember, IsFemale)

    def get_object(self):
        return self.request.user.person


class PersonSimilarityView(views.APIView):
    permission_classes = (IsAuthenticated, IsCommunityMember)

    def find_similarities_with(self, person):
        visitor = self.request.user.person

        tutor = visitor.retrieve_common_tutor_with(person)
        universities = visitor.find_common_universities_with(person)
        branches = visitor.find_common_branches_with(person)
        companies = visitor.find_common_companies_with(person)
        cities = visitor.find_common_city_connections_with(person)

        university_count = len(universities)
        university_message = ungettext(
            '%(count)d university',
            '%(count)d universities',
            university_count
        ) % {
            'count': university_count
        }

        city_count = len(cities)
        city_message = ungettext(
            '%(count)d city with which you are connected',
            '%(count)d cities with which you are connected',
            city_count
        ) % {
            'count': city_count
        }

        branch_count = len(branches)
        branch_message = ", ".join([branch.name for branch in branches])

        company_count = len(companies)
        company_message = ungettext(
            "%(count)d company",
            "%(count)d companies",
            company_count
        ) % {
            'count': company_count
        }

        has_similarities = bool(tutor or city_count or branch_count or company_count or university_count)

        return {
            'full_name': person.full_name,
            'has_similarities': has_similarities,
            'educator': True if tutor else False,
            'universities': university_message if university_count != 0 else None,
            'cities': city_message if city_count != 0 else None,
            'branches': branch_message if branch_count != 0 else None,
            'companies': company_message if company_count != 0 else None
        }

    def get(self, *args, **kwargs):
        person = get_object_or_404(Person, pk=kwargs.pop('pk'))
        return Response(self.find_similarities_with(person))


class PersonPhotoView(generics.RetrieveUpdateAPIView):
    serializer_class = PersonPhotoSerializer
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly)

    def get_object(self):
        return self.request.user.person


class PersonProfileView(generics.RetrieveAPIView):
    serializer_class = PersonProfileSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Person.objects.all()


class PersonalDataUpdateView(generics.UpdateAPIView):
    """
    Updates attribute's value for authenticated user by manipulating
    PersonalData model which is unique for given attribute id and user.
    """
    serializer_class = PersonalDataSerializer
    permission_classes = (IsAuthenticated, IsCommunityMember)

    def get_object(self):
        attribute = get_object_or_404(Attribute, pk=self.kwargs.get('pk'))
        obj, is_created = PersonalData.objects.get_or_create(
            attribute=attribute,
            person=self.request.user.person
        )
        return obj


class AttributeListView(views.APIView):
    """
    Provides a list of available personal data attributes that user can edit.
    Edited entries additionally contain 'value' and 'is_public' status.
    """
    permission_classes = (IsAuthenticated, IsCommunityMember)

    def get(self, request, format=None):
        attributes = AttributeSerializer(Attribute.objects.all(), many=True)
        personal_data = PersonalDataSerializer(PersonalData.objects.filter(person=request.user.person), many=True)

        attributes_dict = {}
        for attribute in attributes.data:
            attributes_dict[attribute.get('id')] = attribute

        for obj in personal_data.data:
            attributes_dict[obj.get('attribute')].update({
                "value": obj.get('value'),
                "is_public": obj.get('is_public')
            })

        return Response([attributes_dict[key] for key in attributes_dict])


class PersonInvitationView(generics.CreateAPIView):
    serializer_class = InvitationSerializer
    permission_classes = (IsAuthenticated, IsCommunityMember, IsAllowedToBeInvited)

    def get_object(self):
        return get_object_or_404(Person, pk=self.kwargs.get('pk'))

    def send_invitation_email(self, serializer, person):
        data = serializer.data
        subject = _("Invitation to V LO graduates community.")
        context = {
            'person': person,
            'invited_by': self.request.user.person,
            'message': data.get('message')
        }

        send_templated_email(subject, 'community/invite.html', context, [data['email']], self.request.user.email)


    def create(self, request, *args, **kwargs):
        person = self.get_object()

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        self.send_invitation_email(serializer, person)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
