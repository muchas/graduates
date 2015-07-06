from uuid import UUID

from django.test import TestCase

from model_mommy import mommy

from ..models import Invitation, Person, City, Employment, Student


class InvitationTests(TestCase):
    def test_invitation_creation(self):
        invitation = mommy.make(Invitation)
        self.assertEqual(Invitation.objects.all().count(), 1)
        self.assertTrue(isinstance(invitation.uuid, UUID))
        self.assertFalse(invitation.is_expired())


class PersonTests(TestCase):
    def test_person_creation(self):
        person = mommy.make(Person)
        self.assertEqual(Person.objects.all().count(), 1)


class CityTests(TestCase):
    def test_city_creation(self):
        city = mommy.make(City)
        self.assertEqual(City.objects.all().count(), 1)
        self.assertFalse(city.is_verified)


class StudentTests(TestCase):
    def test_student_creation(self):
        student = mommy.make(Student)
        self.assertEqual(Student.objects.all().count(), 1)


class PersonManagerTests(TestCase):
    def test_people_connected_with_city(self):
        city = mommy.make(City)
        mommy.make(Employment, city=city, _quantity=3)
        mommy.make(Student, university__city=city, _quantity=2)
        mommy.make(Person)
        self.assertEqual(Person.objects.connected_with_city(city).count(), 5)