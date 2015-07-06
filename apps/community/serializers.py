from django.shortcuts import get_object_or_404
from django.utils.translation import ugettext as _

from rest_framework import serializers
from easy_thumbnails.files import get_thumbnailer

from apps.accounts.models import User
from .fields import ImageField
from .models import Person, Subject, Group, City, Student, Employment, Company, Branch, University, \
    UniversityDepartment, PersonalData, Attribute, Invitation, Achievement
from .validators import EmailValidator, IntegerValidator, UniqueValidator


class CityNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ('pk', 'name')


class UniversitySerializer(serializers.ModelSerializer):
    city = CityNameSerializer()

    class Meta:
        model = University
        exclude = ('is_verified',)


class PlainUniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        exclude = ('is_verified', 'city')


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company


class PersonSerializer(serializers.ModelSerializer):
    thumbnail = serializers.SerializerMethodField()
    picture = serializers.SerializerMethodField()

    class Meta:
        model = Person
        fields = ('id', 'full_name', 'first_name', 'married_name', 'last_name', 'sex', 'picture', 'thumbnail')

    def get_thumbnail(self, person):
        if person.picture and 'request' in self.context:
            return self.context['request'].build_absolute_uri(get_thumbnailer(person.picture)['thumbnail'].url)

    def get_picture(self, person):
        if person.picture and 'request' in self.context:
            return self.context['request'].build_absolute_uri(get_thumbnailer(person.picture)['photo'].url)


class GroupPersonSerializer(PersonSerializer):
    class Meta:
        model = Person
        fields = ('id', 'full_name', 'first_name', 'married_name', 'last_name', 'sex', 'picture', 'thumbnail', 'is_registered')


class GraduateSerializer(PersonSerializer):
    year = serializers.IntegerField(source="group.last_year")

    class Meta:
        model = Person
        fields = ('id', 'full_name', 'first_name', 'married_name', 'last_name', 'sex', 'picture', 'thumbnail', 'year')


class PersonSearchSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    married_name = serializers.CharField()
    thumbnail = serializers.SerializerMethodField()

    def get_thumbnail(self, person):
        if person.picture and 'request' in self.context:
            return self.context['request'].build_absolute_uri(get_thumbnailer(person.picture)['thumbnail'].url)


class PersonDescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ('id', 'description')


class PersonPhotoSerializer(serializers.ModelSerializer):
    picture = ImageField(max_size=2621440, allow_null=True)  # max-size: 2.5 MB

    class Meta:
        model = Person
        fields = ('id', 'picture')


class ImageCropSerializer(serializers.Serializer):
    x = serializers.IntegerField(min_value=0)
    y = serializers.IntegerField(min_value=0)
    width = serializers.IntegerField(min_value=0)
    height = serializers.IntegerField(min_value=0)

    def validate(self, data):
        picture = self.context['picture']
        if data['x'] + data['width'] > picture.width:
            raise serializers.ValidationError(_("Cropped width is bigger than image width."))
        if data['y'] + data['height'] > picture.height:
            raise serializers.ValidationError(_("Cropped height is bigger than image height."))
        return data


class PersonMarriedNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ('id', 'married_name')


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ('id', 'name', 'latitude', 'longitude')


class CityDetailSerializer(serializers.ModelSerializer):
    people = GraduateSerializer(many=True)
    companies = CompanySerializer(many=True)
    universities = PlainUniversitySerializer(many=True)
    people_count = serializers.SerializerMethodField('count_people')
    university_count = serializers.SerializerMethodField('count_universities')
    companies_count = serializers.SerializerMethodField('count_companies')
    years = serializers.SerializerMethodField()

    class Meta:
        model = City
        fields = ('id', 'name', 'latitude', 'longitude', 'people', 'people_count', 'university_count', 'companies_count',
                  'years', 'companies', 'universities')

    def get_years(self, city):
        years = Group.objects.filter(pupils__in=city.people).distinct('last_year')\
            .order_by('-last_year').values('last_year')
        return [obj.get('last_year') for obj in years]

    def count_people(self, city):
        return city.people.count()

    def count_universities(self, city):
        return city.universities.count()

    def count_companies(self, city):
        return city.companies.count()


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject


class InvitationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        validators=[
            UniqueValidator(
                field_name='value',
                queryset=PersonalData.objects.filter(attribute__data_type=Attribute.EMAIL_FIELD),
                message=_("This e-mail is already used.")
            ),
            UniqueValidator(
                queryset=User.objects.all(),
                message=_("This e-mail is already used.")
            )
        ]
    )

    class Meta:
        model = Invitation
        fields = ('email', 'message', 'person')

    def create(self, validated_data):
        return Invitation.objects.create(
            invited_by=self.context['request'].user.person,
            **validated_data
        )


class TeacherSerializer(serializers.ModelSerializer):
    teacher_learn_years = serializers.StringRelatedField(many=True)
    subjects = SubjectSerializer(many=True)
    is_male = serializers.SerializerMethodField('is_teacher_male')

    class Meta:
        model = Person
        fields = ('id', 'full_name', 'sex', 'picture', 'teacher_learn_years', 'subjects', 'is_male')

    def is_teacher_male(self, person):
        return person.sex == Person.MALE


class GroupDetailsSerializer(serializers.ModelSerializer):
    tutor = TeacherSerializer()
    pupils = GroupPersonSerializer(many=True)

    class Meta:
        model = Group
        fields = ('id', 'first_year', 'last_year', 'symbol', 'tutor', 'pupils')


class GroupSerializer(serializers.ModelSerializer):
    tutor = PersonSerializer()

    class Meta:
        model = Group
        fields = ('id', 'first_year', 'last_year', 'symbol', 'tutor')


class UniversityDepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = UniversityDepartment
        fields = ('id', 'name', 'acronym')


#TODO Refactor - the most hacky nad messy part (update_related)
class StudentSerializer(serializers.ModelSerializer):
    department = UniversityDepartmentSerializer(allow_null=True)
    university = UniversitySerializer()

    class Meta:
        model = Student
        exclude = ('person',)

    def update_related(self, validated_data):
        university_id = self.initial_data['university'].get('id')
        if university_id:
            university = get_object_or_404(University, pk=university_id)
        else:
            city, is_city_created = City.objects.get_or_create(name=validated_data.get('university').get('city').get('name'))
            university, is_university_created = University.objects.get_or_create(
                name=validated_data.get('university').get('name'),
                city=city
            )

        department = None
        department_name = validated_data.get('department').get('name')
        if department_name:
            department, is_department_created = UniversityDepartment.objects.get_or_create(
                university=university,
                name=department_name,
                acronym=validated_data.get('department').get('acronym')
            )
        return {
            'university': university,
            'department': department
        }

    def create(self, validated_data):
        validated_data.update(self.update_related(validated_data))
        return Student.objects.create(
            person=self.context['request'].user.person,
            **validated_data
        )

    def update(self, instance, validated_data):
        validated_data.update(self.update_related(validated_data))
        return super(StudentSerializer, self).update(instance, validated_data)


class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch


class EmploymentSerializer(serializers.ModelSerializer):
    city = CityNameSerializer()
    company = CompanySerializer()
    branch = BranchSerializer()

    class Meta:
        model = Employment
        exclude = ('person',)

    def update_related(self, validated_data):
        city, is_city_created = City.objects.get_or_create(name=validated_data.get('city').get('name'))
        company, is_company_created = Company.objects.get_or_create(name=validated_data.get('company').get('name'))
        branch, is_branch_created = Branch.objects.get_or_create(name=validated_data.get('branch').get('name'))
        return {
            'city': city,
            'company': company,
            'branch': branch
        }

    def create(self, validated_data):
        validated_data.update(self.update_related(validated_data))
        return Employment.objects.create(
            person=self.context['request'].user.person,
            **validated_data
        )

    def update(self, instance, validated_data):
        validated_data.update(self.update_related(validated_data))
        return super(EmploymentSerializer, self).update(instance, validated_data)


class ProfileGroupSerializer(serializers.ModelSerializer):
    tutor = TeacherSerializer()

    class Meta:
        model = Group


class PersonalDataSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="attribute.name", read_only=True)

    _validators_mapping = {
        Attribute.EMAIL_FIELD: EmailValidator,
        Attribute.INTEGER_FIELD: IntegerValidator
    }

    class Meta:
        model = PersonalData
        exclude = ('person',)
        read_only_fields = ('attribute',)

    def get_validators(self):
        validators = []
        data_type = self.instance.attribute.data_type
        if data_type in self._validators_mapping:
            validators.append(self._validators_mapping[data_type](field='value'))
        return validators


class AttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attribute


class AchievementSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="edition.contest.name")
    result = serializers.CharField(source="result.name")
    year = serializers.IntegerField(source="edition.year")
    edition = serializers.CharField(source="edition.edition")

    class Meta:
        model = Achievement
        fields = ('name', 'points', 'place', 'result', 'year', 'edition')


class PersonProfileSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField()
    group = ProfileGroupSerializer()
    universities = StudentSerializer(source='student_set', many=True)
    employments = EmploymentSerializer(many=True)
    teacher_learn_years = serializers.StringRelatedField(many=True)
    subjects = SubjectSerializer(many=True)
    achievements = AchievementSerializer(many=True)
    personal_data = PersonalDataSerializer(source='public_personal_data', many=True)
    thumbnail = serializers.SerializerMethodField()
    is_owner = serializers.SerializerMethodField('check_ownership')
    is_male = serializers.SerializerMethodField('is_person_male')
    can_be_invited = serializers.SerializerMethodField('check_inviting_ability')
    show_now_section = serializers.SerializerMethodField('is_section_now_not_empty')

    class Meta:
        model = Person

    def get_thumbnail(self, person):
        if person.picture and 'request' in self.context:
            return self.context['request'].build_absolute_uri(get_thumbnailer(person.picture)['photo'].url)

    def check_inviting_ability(self, person):
        return person.allow_invitation and not hasattr(person, 'user')

    def is_person_male(self, person):
        return person.sex == Person.MALE

    def is_section_now_not_empty(self, person):
        return person.description or person.employments.all().exists()

    def check_ownership(self, person):
        return 'request' in self.context and person == self.context['request'].user.person