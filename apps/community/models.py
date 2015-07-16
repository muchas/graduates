from cStringIO import StringIO
from PIL import Image
from random import randint
import uuidfield
import datetime

from django.utils.translation import ugettext as _
from django.core.files.base import ContentFile
from django.db import models

from helpers.mail import send_templated_email
from model_utils.models import TimeStampedModel


CURRENT_YEAR = datetime.datetime.now().year+1

YEAR_CHOICES = []
for r in range(1989, CURRENT_YEAR):
    YEAR_CHOICES.append((r, r))

GROUP_YEAR_CHOICES = list(YEAR_CHOICES)
for r in range(CURRENT_YEAR, CURRENT_YEAR + 10):
    GROUP_YEAR_CHOICES.append((r, r))


class City(models.Model):
    name = models.CharField(max_length=90)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    is_verified = models.BooleanField(default=False)
    is_empty = models.BooleanField(default=True)

    class Meta:
        verbose_name_plural = 'cities'

    def __unicode__(self):
        return u"%s" % self.name

    @property
    def people(self):
        return Person.objects.connected_with_city(self).select_related('group')

    @property
    def companies(self):
        return Company.objects.filter(employment__in=self.employments.all())


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
    first_year = models.IntegerField(max_length=4, choices=GROUP_YEAR_CHOICES, default=datetime.datetime.now().year)
    last_year = models.IntegerField(max_length=4, choices=GROUP_YEAR_CHOICES, default=datetime.datetime.now().year)
    symbol = models.CharField(max_length=4)
    is_graduated = models.BooleanField(default=True)

    def __unicode__(self):
        return u"%s" % self.symbol


class PersonQuerySet(models.QuerySet):
    def random(self, quantity=1):
        queryset_list = list(self.all())
        count = len(queryset_list)
        results = set()
        while len(results) < quantity:
            random_index = randint(0, count-1)
            results.add(queryset_list[random_index])
        return results


class PersonManager(models.Manager):
    def connected_with_city(self, city):
        people = self.filter(universities__city=city) | self.filter(employments__city=city)
        return people.distinct()


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
    allow_invitation = models.BooleanField(default=True)
    allow_registration = models.BooleanField(default=True)

    group = models.ForeignKey(Group, related_name='pupils', blank=True, null=True)
    universities = models.ManyToManyField(University, through='Student')
    branches = models.ManyToManyField('Branch', through='Employment')
    companies = models.ManyToManyField('Company', through='Employment')
    subjects = models.ManyToManyField(Subject, blank=True)

    objects = PersonManager.from_queryset(PersonQuerySet)()

    class Meta:
        verbose_name_plural = 'people'
        ordering = ['last_name']

    def __unicode__(self):
        return self.full_name

    @property
    def full_name(self):
        if self.married_name:
            return u"%s %s" % (
                self.first_name,
                self.married_name,
            )
        return u"%s %s" % (
            self.first_name,
            self.last_name
        )

    @property
    def public_personal_data(self):
        return self.personaldata_set.filter(is_public=True)

    @property
    def is_male(self):
        return self.sex == Person.MALE

    @property
    def is_teacher(self):
        return self.teacher_learn_years.all().exists()

    @property
    def is_student(self):
        return bool(self.group)

    @property
    def is_registered(self):
        return hasattr(self, 'user')

    def crop_picture(self, x, y, width, height):
        f = StringIO()
        try:
            original = Image.open(self.picture.path)
            cropped = original.crop((x, y, x + width, y + height))
            cropped.save(f, format='jpeg')
            s = f.getvalue()
            self.picture.save(self.picture.name, ContentFile(s))
        finally:
            f.close()

    def retrieve_common_tutor_with(self, person):
        if self.group and person.group and self.group.id == person.group.id:
            return self.group.tutor

    def find_common_universities_with(self, person):
        return University.objects.filter(person__in=[self.pk]).filter(person__in=[person.pk]).distinct()

    def find_common_city_connections_with(self, person):
        university_cities = City.objects.filter(
            universities__in=self.universities.all()
        ).filter(universities__in=person.universities.all()).distinct()
        employment_cities = City.objects.filter(employments__person__in=[self.pk]).filter(employments__person__in=[person.pk]).distinct()

        return employment_cities | university_cities

    def find_common_branches_with(self, person):
        return Branch.objects.filter(person__in=[self.pk]).filter(person__in=[person.pk]).distinct()

    def find_common_companies_with(self, person):
        return Company.objects.filter(person__in=[self.pk]).filter(person__in=[person.pk]).distinct()


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

    class Meta:
        ordering = ['-start', '-end']

    def __unicode__(self):
        return u"%s - %s" % (self.company, self.name)


class Student(models.Model):
    university = models.ForeignKey(University)
    person = models.ForeignKey(Person)
    department = models.ForeignKey(UniversityDepartment, null=True, blank=True)
    start = models.DateField()
    end = models.DateField(null=True, blank=True)
    school = models.CharField(max_length=255)

    class Meta:
        ordering = ['-start', '-end']


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
            return u"%s" % self.from_year
        elif not self.to_year:
            return u"%s - obecnie" % self.from_year
        else:
            return u"%s-%s" % (self.from_year, self.to_year)


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

    def __unicode__(self):
        return u"%s" % (self.value,)


class Invitation(models.Model):
    person = models.ForeignKey(Person, related_name='invitations')
    invited_by = models.ForeignKey(Person, related_name='sent_invitations')
    email = models.EmailField()
    message = models.TextField(null=True, blank=True)
    datetime = models.DateTimeField(auto_now_add=True)
    uuid = uuidfield.UUIDField(auto=True)

    def is_expired(self):
        return hasattr(self.person, 'user')

    def send(self):
        subject = _("Invitation to V LO graduates community.")
        context = {
            'person': self.person,
            'invited_by': self.invited_by,
            'message': self.message
        }

        send_templated_email(subject, 'community/invite.html', context, [self.email], )


###### Contests/achievements models #####

class ContestScope(models.Model):
    name = models.CharField(max_length=100)

    def __unicode__(self):
        return self.name


class ContestResult(models.Model):
    name = models.CharField(max_length=100)
    weight = models.IntegerField()

    def __unicode__(self):
        return u"%s - %s" % (self.name, self.weight)


class Contest(models.Model):
    name = models.CharField(max_length=100)
    scope = models.ForeignKey(ContestScope, related_name="contests")

    def __unicode__(self):
        return u"%s" % (self.name,)


class ContestEdition(models.Model):
    year = models.IntegerField()
    edition = models.CharField(max_length=10)
    contest = models.ForeignKey(Contest, related_name="editions")


class Achievement(models.Model):
    points = models.IntegerField(null=True, blank=True)
    place = models.IntegerField(null=True, blank=True)
    person = models.ForeignKey(Person, related_name="achievements")
    edition = models.ForeignKey(ContestEdition)
    result = models.ForeignKey(ContestResult, null=True, blank=True)

    def __unicode__(self):
        return u"%s - %s" % (self.person, self.edition.contest)
