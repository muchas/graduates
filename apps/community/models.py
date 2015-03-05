from django.db import models
import datetime
from model_utils.models import TimeStampedModel


YEAR_CHOICES = []
for r in range(1989, (datetime.datetime.now().year+1)):
    YEAR_CHOICES.append((r, r))


class City(models.Model):
    name = models.CharField(max_length=90)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    is_verified = models.BooleanField(default=False)

    def __unicode__(self):
        return u"%s" % self.name


class University(models.Model):
    name = models.CharField(max_length=255)
    acronym = models.CharField(max_length=10, null=True, blank=True)
    is_verified = models.BooleanField(default=False)
    city = models.ForeignKey(City, related_name='universities')

    def __unicode__(self):
        return u"%s" % self.name


class UniversityDepartment(models.Model):
    name = models.CharField(max_length=255, blank=True)
    acronym = models.CharField(max_length=10, null=True, blank=True)
    is_verified = models.BooleanField(default=False)
    university = models.ForeignKey(University)

    def __unicode__(self):
        return u"%s" % self.name


class Subject(models.Model):
    name = models.CharField(max_length=50)
    name_brand = models.CharField(max_length=50)
    short_name = models.CharField(max_length=50)
    acronym = models.CharField(max_length=10)

    def __unicode__(self):
        return u"%s" % self.name


class Group(models.Model):
    tutor = models.ForeignKey('Person', related_name='groups')
    first_year = models.IntegerField(max_length=4, choices=YEAR_CHOICES, default=datetime.datetime.now().year)
    last_year = models.IntegerField(max_length=4, choices=YEAR_CHOICES, default=datetime.datetime.now().year)
    symbol = models.CharField(max_length=4)
    is_graduated = models.BooleanField(default=True)

    def __unicode__(self):
        return u"%s" % self.symbol


class PersonManager(models.Manager):
    def connected_with_city(self, city):
        return self.filter(universities__city=city)


class Person(models.Model):
    # ISO/IEC 5218 standard
    NOT_KNOWN = 0
    MALE = 1
    FEMALE = 2
    NOT_APPLICABLE = 9
    SEX_CHOICES = (
        (NOT_KNOWN, 'not known'),
        (MALE, 'male'),
        (FEMALE, 'female'),
        (NOT_APPLICABLE, 'not applicable')
    )

    first_name = models.CharField(max_length=255, blank=False)
    last_name = models.CharField(max_length=255, blank=False)
    married_name = models.CharField(max_length=255, blank=True, null=True)
    picture = models.ImageField(upload_to='pictures/', blank=True, null=True)
    sex = models.SmallIntegerField(choices=SEX_CHOICES, default=NOT_KNOWN)
    description = models.TextField(null=True, blank=True)

    group = models.ForeignKey(Group, related_name='pupils', blank=True, null=True)
    universities = models.ManyToManyField(University, through='Student')
    branches = models.ManyToManyField('Branch', through='Employment')
    companies = models.ManyToManyField('Company', through='Employment')
    subjects = models.ManyToManyField(Subject, blank=True)

    objects = PersonManager()

    class Meta:
        verbose_name_plural = 'people'

    def __unicode__(self):
        return self.full_name

    @property
    def full_name(self):
        if self.married_name:
            return "%s %s (%s)" % (
                self.first_name,
                self.married_name,
                self.last_name
            )
        return "%s %s" % (
            self.first_name,
            self.last_name
        )

    @property
    def public_personal_data(self):
        return self.personaldata_set.filter(is_public=True)

    def find_similarities_with(self, person):
        tutor = self.retrieve_common_tutor_with(person)
        universities = self.find_common_universities_with(person)
        branches = self.find_common_branches_with(person)
        companies = self.find_common_companies_with(person)
        cities = self.find_common_city_connections_with(person)
        return {
            'tutor': tutor.full_name if tutor else None,
            'universities': [university.name for university in universities],
            'cities': [city.name for city in cities],
            'branches': [branch.name for branch in branches],
            'companies': [company.name for company in companies],
            'years_in_school': self.retrieve_years_in_school_intersection_with(person)
        }

    def retrieve_common_tutor_with(self, person):
        if self.group and person.group and self.group.id == person.group.id:
            return self.group.tutor

    def find_common_universities_with(self, person):
        difference = University.objects.exclude(person__in=[person.pk]).distinct()
        return University.objects.filter(person__in=[self.pk]).exclude(pk__in=difference).distinct()

    def find_common_city_connections_with(self, person):
        university_cities = City.objects.filter(universities__in=self.find_common_universities_with(person)).distinct()

        employment_cities_diff = City.objects.exclude(employments__person__in=[person.pk]).distinct()
        employment_cities = City.objects.filter(employments__person__in=[self.pk]).exclude(pk__in=employment_cities_diff).distinct()

        return employment_cities | university_cities

    def find_common_branches_with(self, person):
        difference = Branch.objects.exclude(person__in=[person.pk]).distinct()
        return Branch.objects.filter(person__in=[self.pk]).exclude(pk__in=difference).distinct()

    def find_common_companies_with(self, person):
        difference = Company.objects.exclude(person__in=[person.pk]).distinct()
        return Company.objects.filter(person__in=[self.pk]).exclude(pk__in=difference).distinct()

    def retrieve_years_in_school_intersection_with(self, person):
        if self.group and person.group:
            first = self.group.first_year if self.group.first_year > person.group.first_year else person.group.first_year
            if self.group.last_year and person.group.last_year:
                last = self.group.last_year if self.group.last_year < person.group.last_year else person.group.last_year
            else:
                last = self.group.last_year if self.group.last_year else person.group.last_year
            if last == first:
                return first
            elif last:
                return str(first) + '-' + str(last)
            else:
                return str(first) + '-obecnie'

class Branch(models.Model):
    name = models.CharField(max_length=255)

    def __unicode__(self):
        return self.name


class Company(models.Model):
    name = models.CharField(max_length=255)

    def __unicode__(self):
        return self.name


class Employment(models.Model):
    person = models.ForeignKey(Person, related_name='employments')
    branch = models.ForeignKey(Branch)
    company = models.ForeignKey(Company)
    city = models.ForeignKey(City, related_name='employments')

    name = models.CharField(max_length=255)
    start = models.DateField()
    end = models.DateField(null=True, blank=True)


class Student(models.Model):
    university = models.ForeignKey(University)
    person = models.ForeignKey(Person)
    department = models.ForeignKey(UniversityDepartment, null=True, blank=True)
    start = models.DateField()
    end = models.DateField()
    school = models.CharField(max_length=255)


class TeacherLearnYears(models.Model):
    person = models.ForeignKey(Person, related_name='teacher_learn_years')
    from_year = models.IntegerField(max_length=4, choices=YEAR_CHOICES, default=datetime.datetime.now().year)
    to_year = models.IntegerField(
        max_length=4,
        choices=YEAR_CHOICES,
        default=None,
        null=True,
        blank=True)

    def __unicode__(self):
        if self.from_year == self.to_year:
            return "%s" % self.from_year
        elif not self.to_year:
            return "%s - obecnie" % self.from_year
        else:
            return "%s-%s" % (self.from_year, self.to_year)


class Attribute(models.Model):
    EMAIL_FIELD, CHAR_FIELD, INTEGER_FIELD = range(3)
    TYPE_CHOICES = (
        (EMAIL_FIELD, 'email'),
        (CHAR_FIELD, 'char'),
        (INTEGER_FIELD, 'integer'),
    )
    name = models.CharField(max_length=255)
    data_type = models.IntegerField(choices=TYPE_CHOICES, default=CHAR_FIELD)
    display_order = models.SmallIntegerField()

    def __unicode__(self):
        return self.name


class PersonalData(TimeStampedModel):
    is_public = models.BooleanField(default=True)
    value = models.CharField(max_length=255, null=True, blank=True, default="")
    attribute = models.ForeignKey(Attribute)
    person = models.ForeignKey(Person)

    class Meta:
        unique_together=(('person', 'attribute'),)