from django.core.cache import get_cache
from rest_framework import generics, views
from rest_framework.response import Response
from apps.community.models import Person, City, Group
from apps.community.serializers import TeacherSerializer, GroupSerializer, CitySerializer


class CityDetailView(views.APIView):
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


class TeacherListView(generics.ListAPIView):
    queryset = Person.objects.exclude(teacher_learn_years=None)
    serializer_class = TeacherSerializer


class GroupListView(generics.ListAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class GroupDetailView(generics.RetrieveAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class PersonGroupView(generics.RetrieveAPIView):
    serializer_class = GroupSerializer

    def get_object(self):
        person = self.request.user.person
        return person.group