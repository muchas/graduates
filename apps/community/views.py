from django.core.cache import get_cache
from django.shortcuts import get_object_or_404
from rest_framework import generics, views
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from apps.community.models import Person, City, Group, Student, Employment, PersonalData, Attribute, University, \
    UniversityDepartment, Branch
from apps.community.permissions import IsCommunityMember, IsOwnerOrReadOnly
from apps.community.serializers import TeacherSerializer, GroupSerializer, CitySerializer, StudentSerializer, \
    EmploymentSerializer, PersonDescriptionSerializer, PersonProfileSerializer, PersonalDataSerializer, \
    AttributeSerializer, UniversitySerializer, UniversityDepartmentSerializer, BranchSerializer, PersonPhotoSerializer, \
    PersonSerializer


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


class GroupListView(generics.ListAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = (IsAuthenticated,)


class GroupDetailView(generics.RetrieveAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = (IsAuthenticated,)


class PersonGroupView(generics.RetrieveAPIView):
    serializer_class = GroupSerializer
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
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user.person


class PersonDescriptionView(generics.RetrieveUpdateAPIView):
    serializer_class = PersonDescriptionSerializer
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly)

    def get_object(self):
        return self.request.user.person


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

