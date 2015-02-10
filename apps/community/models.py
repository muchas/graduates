from django.db import models
import datetime


YEAR_CHOICES = []
for r in range(1989, (datetime.datetime.now().year+1)):
    YEAR_CHOICES.append((r, r))


class City(models.Model):
    name = models.CharField(max_length=90)
    latitude = models.FloatField()
    longitude = models.FloatField()
    is_verified = models.BooleanField(default=False)

    def __unicode__(self):
        return u"%s" % self.name


class University(models.Model):
    name = models.CharField(max_length=255)
    is_verified = models.BooleanField(default=False)
    city = models.ForeignKey(City)

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
    picture = models.ImageField(upload_to='media/pictures/', blank=True, null=True)
    sex = models.SmallIntegerField(choices=SEX_CHOICES, default=NOT_KNOWN)

    group = models.ForeignKey(Group, related_name='pupils', blank=True, null=True)
    universities = models.ManyToManyField(University, through='Student')
    subjects = models.ManyToManyField(Subject, blank=True)

    objects = PersonManager()

    class Meta:
        verbose_name_plural = 'people'

    def __unicode__(self):
        return "%s %s" % (
            self.first_name,
            self.last_name
        )


class Industry(models.Model):
    name = models.CharField(max_length=255)

    def __unicode__(self):
        return self.name


class Company(models.Model):
    name = models.CharField(max_length=255)

    def __unicode__(self):
        return self.name


class Employment(models.Model):
    person = models.ForeignKey(Person)
    industry = models.ForeignKey(Industry)
    company = models.ForeignKey(Company)
    city = models.ForeignKey(City)

    name = models.CharField(max_length=255)
    start = models.DateField()
    end = models.DateField(null=True, blank=True)


class Student(models.Model):
    university = models.ForeignKey(University)
    person = models.ForeignKey(Person)
    start = models.DateField()
    end = models.DateField()
    school = models.CharField(max_length=255)
    department = models.CharField(max_length=255, null=True, blank=True)


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
        if self.from_year == self.to_year or not self.to_year:
            return "%s" % self.from_year
        else:
            return "%s-%s" % (self.from_year, self.to_year)
