from django.shortcuts import get_object_or_404
from django.utils.translation import ungettext, ugettext as _

from haystack.query import EmptySearchQuerySet, SearchQuerySet
from rest_framework import generics, views, status, viewsets, filters, mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from braces.views import PrefetchRelatedMixin, SelectRelatedMixin

from helpers.rest import RetrieveCachedAPIView
from .models import (
    Person, City, Group, Student, Employment, PersonalData, Attribute, University,
    UniversityDepartment, Branch
)
from .serializers import (
    TeacherSerializer, GroupDetailsSerializer, CitySerializer, StudentSerializer, EmploymentSerializer,
    PersonDescriptionSerializer, PersonProfileSerializer, PersonalDataSerializer, AttributeSerializer,
    UniversitySerializer, UniversityDepartmentSerializer, BranchSerializer, PersonPhotoSerializer,
    PersonSerializer, PersonMarriedNameSerializer, GroupSerializer, InvitationSerializer, CityDetailSerializer,
    PersonSearchSerializer, ImageCropSerializer
)
from .permissions import IsCommunityMember, IsOwnerOrReadOnly, IsFemale, IsAllowedToBeInvited, HasProfilePhoto
import signals


class CityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = City.objects.filter(is_verified=True)
    permission_classes = (IsAuthenticated,)

    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('is_empty',)

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return CityDetailSerializer
        return CitySerializer


class BranchViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer
    permission_classes = (IsAuthenticated,)


class TeacherViewSet(PrefetchRelatedMixin, viewsets.ReadOnlyModelViewSet):
    queryset = Person.objects.exclude(teacher_learn_years=None)
    prefetch_related = ['teacher_learn_years', 'subjects']
    serializer_class = TeacherSerializer
    permission_classes = (IsAuthenticated,)


class GroupListView(SelectRelatedMixin, generics.ListAPIView):
    serializer_class = GroupSerializer
    queryset = Group.objects.all()
    select_related = ['tutor']
    permission_classes = (IsAuthenticated,)

    filter_backends = (filters.DjangoFilterBackend, filters.OrderingFilter)
    filter_fields = ('is_graduated',)
    ordering_fields = ('symbol',)


class GroupDetailView(PrefetchRelatedMixin, RetrieveCachedAPIView):
    queryset = Group.objects.all()
    prefetch_related = ['pupils__user']
    serializer_class = GroupDetailsSerializer
    permission_classes = (IsAuthenticated,)


class UniversityViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = UniversitySerializer
    permission_classes = (IsAuthenticated,)
    queryset = University.objects.all()


class DepartmentViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = UniversityDepartmentSerializer
    permission_classes = (IsAuthenticated,)
    queryset = UniversityDepartment.objects.all()


class StudentViewSet(viewsets.ModelViewSet):
    serializer_class = StudentSerializer
    permission_classes = (IsAuthenticated, IsCommunityMember)

    def get_queryset(self):
        return Student.objects.filter(person=self.request.user.person)


class EmploymentViewSet(viewsets.ModelViewSet):
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


class PersonConnectedPagesView(views.APIView):
    permission_classes = (IsAuthenticated,)

    def get_connected_pages(self, person):
        result = []
        if person.is_student:
            result = list(person.group.pupils.exclude(pk=person.pk).random(quantity=2))
            result.append(person.group.tutor)
        elif person.is_teacher:
            result = list(Person.objects.exclude(teacher_learn_years=None).exclude(pk=person.pk).random(quantity=3))

        serializer = PersonSerializer(result, many=True, context={'request': self.request})
        return serializer.data

    def get(self, *args, **kwargs):
        person = get_object_or_404(Person, pk=kwargs.pop('pk'))
        return Response(self.get_connected_pages(person))


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
    permission_classes = (IsAuthenticated, IsCommunityMember, IsOwnerOrReadOnly)

    def get_object(self):
        return self.request.user.person


class PersonPhotoCropView(views.APIView):
    permission_classes = (IsAuthenticated, IsCommunityMember, HasProfilePhoto)

    def put(self, request, *args, **kwargs):
        person = request.user.person

        serializer = ImageCropSerializer(data=request.data, context={'picture': person.picture})
        serializer.is_valid(raise_exception=True)

        data = serializer.data
        person.crop_picture(data['x'], data['y'], data['width'], data['height'])

        return Response({'success': True}, status=status.HTTP_200_OK)


class PersonProfileView(PrefetchRelatedMixin, generics.RetrieveAPIView):
    serializer_class = PersonProfileSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Person.objects.all()
    prefetch_related = ['achievements__edition__contest', 'achievements__result']


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


class PersonSearchView(generics.ListAPIView):
    serializer_class = PersonSearchSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        queryset = EmptySearchQuerySet()
        query = self.request.GET.get('q', None)
        if query:
            queryset = SearchQuerySet().autocomplete(content_auto=query)[:6]
        return queryset
