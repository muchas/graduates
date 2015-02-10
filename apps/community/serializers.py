from rest_framework import serializers
from apps.community.models import Person, Subject, Group, City


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ('pk', 'first_name', 'last_name', 'sex', 'picture')


class PersonProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ('pk', 'name', 'latitude', 'longitude')


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject


class TeacherSerializer(serializers.ModelSerializer):
    teacher_learn_years = serializers.StringRelatedField(many=True)
    subjects = SubjectSerializer(many=True)

    class Meta:
        model = Person
        fields = ('pk', 'first_name', 'last_name', 'sex', 'picture', 'teacher_learn_years', 'subjects')


class GroupSerializer(serializers.ModelSerializer):
    tutor = TeacherSerializer()
    pupils = PersonSerializer(many=True)

    class Meta:
        model = Group
        fields = ('pk', 'first_year', 'last_year', 'symbol', 'tutor', 'pupils')
