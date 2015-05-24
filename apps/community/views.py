from django.shortcuts import get_object_or_404, redirect
from django.utils.translation import ungettext, ugettext as _
from haystack.query import EmptySearchQuerySet, SearchQuerySet
from rest_framework import generics, views, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from apps.community.models import Person, City, Group, Student, Employment, PersonalData, Attribute, University, \
    UniversityDepartment, Branch
from apps.community.permissions import IsCommunityMember, IsOwnerOrReadOnly, IsFemale, IsAllowedToBeInvited, \
    HasProfilePhoto
from apps.community.serializers import TeacherSerializer, GroupDetailsSerializer, CitySerializer, StudentSerializer, \
    EmploymentSerializer, PersonDescriptionSerializer, PersonProfileSerializer, PersonalDataSerializer, \
    AttributeSerializer, UniversitySerializer, UniversityDepartmentSerializer, BranchSerializer, PersonPhotoSerializer, \
    PersonSerializer, PersonMarriedNameSerializer, GroupSerializer, InvitationSerializer, CityDetailSerializer, \
    PersonSearchSerializer, ImageCropSerializer
from utils.mail import send_templated_email
from utils.rest import RetrieveCachedAPIView
from PIL import Image
from cStringIO import StringIO
from django.core.files.base import ContentFile
import signals


class CityDetailView(RetrieveCachedAPIView):
    queryset = City.objects.filter(is_verified=True)
    serializer_class = CityDetailSerializer
    permission_classes = (IsAuthenticated,)


class NotEmptyCityListView(generics.ListAPIView):
    queryset = City.objects.filter(is_verified=True, is_empty=False)
    serializer_class = CitySerializer
    permission_classes = (IsAuthenticated,)


class CityListView(generics.ListAPIView):
    queryset = City.objects.filter(is_verified=True)
    serializer_class = CitySerializer
    permission_classes = (IsAuthenticated,)


class BranchListView(generics.ListAPIView):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer
    permission_classes = (IsAuthenticated,)


class TeacherListView(generics.ListAPIView):
    queryset = Person.objects.exclude(teacher_learn_years=None).prefetch_related('teacher_learn_years', 'subjects')
    serializer_class = TeacherSerializer
    permission_classes = (IsAuthenticated,)


class GroupListView(views.APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, *args, **kwargs):
        groups = Group.objects.filter(is_graduated=self.is_graduated).select_related('tutor').order_by('symbol')
        result = {}
        results = []
        for group in groups:
            if not group.last_year in result:
                result[group.last_year] = []
            serializer = GroupSerializer(group)
            result[group.last_year].append(serializer.data)
        for year, groups in result.iteritems():
            results.append({'year': year, 'groups': groups})

        return Response(reversed(results))


class GraduatedGroupListView(GroupListView):
    is_graduated = True


class StudentGroupListView(GroupListView):
    is_graduated = False


class GroupDetailView(RetrieveCachedAPIView):
    queryset = Group.objects.all().prefetch_related('pupils__user')
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
        picture = request.user.person.picture

        serializer = ImageCropSerializer(data=request.data, context={'picture': picture})
        serializer.is_valid(raise_exception=True)

        data = serializer.data

        f = StringIO()
        try:
            original = Image.open(picture.path)

            cropped = original.crop((data['x'], data['y'], data['x'] + data['width'], data['y'] + data['height']))

            cropped.save(f, format='jpeg')
            s = f.getvalue()
            picture.save(picture.name, ContentFile(s))
            #model_instance.save()
        finally:
            f.close()

        return Response({ 'success': True }, status=status.HTTP_200_OK)


class PersonProfileView(generics.RetrieveAPIView):
    serializer_class = PersonProfileSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Person.objects.all().prefetch_related("achievements__edition__contest")


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


class PersonSearchView(generics.ListAPIView):
    serializer_class = PersonSearchSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        queryset = EmptySearchQuerySet()
        query = self.request.GET.get('q', None)
        if query:
            queryset = SearchQuerySet().autocomplete(content_auto=query)[:6]
        return queryset