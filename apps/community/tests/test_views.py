# -*- coding: utf-8 -*-
from django.core.urlresolvers import reverse

from model_mommy import mommy
from rest_framework import status
from rest_framework.test import APITestCase

from apps.accounts.models import User
from ..models import Person, Student, Employment, City, TeacherLearnYears, Group, Attribute, PersonalData


class StudentListViewTests(APITestCase):
    def setUp(self):
        self.url = reverse('student_list')
        self.username = 'john@doe.com'
        self.password = 'secret'

    def get_student_sample_data(self):
        return {
            'start': '2014-01-01',
            'end': '2019-10-11',
            'school': 'Computer Science',
            'university': {
                'name': u"Akademia Górniczo Hutnicza",
                'acronym': 'AGH',
                'city': {
                    'name': u"Kraków"
                }
            },
            'department': {
                'name': 'Informatyki, Elektroniki i Telekomunikacji',
                'acronym': None
            }
        }

    def create_community_member(self, username, password):
        person = mommy.make(Person)
        user = User.objects.create_user(username, password, person=person)
        return user

    def test_create_student(self):
        self.create_community_member(self.username, self.password)
        self.client.login(username=self.username, password=self.password)
        data = self.get_student_sample_data()
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data.get('school'), data['school'])
        self.assertEqual(response.data['university'].get('name'), data['university']['name'])

    def test_create_student_without_person_object(self):
        User.objects.create_user(self.username, self.password)
        data = self.get_student_sample_data()
        self.client.login(username=self.username, password=self.password)
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_student_without_authentication(self):
        data = self.get_student_sample_data()
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_student_list(self):
        user = self.create_community_member(self.username, self.password)
        person = mommy.make(Person)
        mommy.make(Student, person=user.person, _quantity=5)
        mommy.make(Student, person=person, _quantity=3)
        self.client.login(username=self.username, password=self.password)
        response = self.client.get(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 5)

    def test_student_list_without_authentication(self):
        response = self.client.get(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_student_list_without_person_object(self):
        User.objects.create_user(self.username, self.password)
        self.client.login(username=self.username, password=self.password)
        response = self.client.get(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class StudentViewTests(APITestCase):
    def setUp(self):
        self.username = 'john@doe.pl'
        self.password = 'random'
        person = mommy.make(Person)
        self.student = mommy.make(Student, person=person)
        self.url = reverse('student', kwargs={'pk': self.student.pk})
        self.bad_url = reverse('student', kwargs={'pk': 1000})
        User.objects.create_user(self.username, self.password, person=person)

    def get_student_sample_data(self):
        return {
            'start': '2014-01-01',
            'end': '2019-10-11',
            'school': 'Computer Science',
            'university': {
                'name': u"Akademia Górniczo Hutnicza",
                'acronym': 'AGH',
                'city': {
                    'name': u"Kraków"
                }
            },
            'department': {
                'name': 'Informatyki, Elektroniki i Telekomunikacji',
                'acronym': None
            }
        }

    def get_incorrect_student_data(self):
        pass

    def test_retrieve_student(self):
        self.client.login(username=self.username, password=self.password)
        response = self.client.get(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['school'], self.student.school)

    def test_retrieve_student_without_authentication(self):
        response = self.client.get(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_retrieve_non_existing_student(self):
        self.client.login(username=self.username, password=self.password)
        response = self.client.get(self.bad_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_student(self):
        self.client.login(username=self.username, password=self.password)
        data = self.get_student_sample_data()
        response = self.client.put(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['school'], data['school'])
        self.assertEqual(response.data['university']['name'], data['university']['name'])

    def test_update_student_without_authentication(self):
        data = self.get_student_sample_data()
        response = self.client.put(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_non_existing_student(self):
        self.client.login(username=self.username, password=self.password)
        data = self.get_student_sample_data()
        response = self.client.put(self.bad_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_student_by_community_member(self):
        """
        Ensures that student information can't be changed by different user
        """
        person = mommy.make(Person)
        User.objects.create_user('tricky@hacker.com', '321', person=person)
        self.client.login(username='tricky@hacker.com', password='321')
        data = self.get_student_sample_data()
        response = self.client.put(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_student(self):
        self.client.login(username=self.username, password=self.password)
        response = self.client.delete(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_student_without_authentication(self):
        response = self.client.delete(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_non_existing_student(self):
        self.client.login(username=self.username, password=self.password)
        response = self.client.delete(self.bad_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_student_by_community_member(self):
        person = mommy.make(Person)
        User.objects.create_user('tricky@hacker.com', '321', person=person)
        self.client.login(username='tricky@hacker.com', password='321')
        response = self.client.delete(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class EmploymentListViewTests(APITestCase):
    def setUp(self):
        self.url = reverse('employment_list')
        self.username = 'mungo@jerry.com'
        self.password = 'inthesummertime'

    def get_employment_sample_data(self):
        return {
            'name': 'C++ Developer',
            'start': '2005-05-15',
            'end': '2008-11-12',
            'company': {
                'name': 'Developers',
            },
            'city': {
                'name': 'London',
            },
            'branch': {
                'name': 'IT'
            }
        }

    def create_community_member(self, username, password):
        person = mommy.make(Person)
        user = User.objects.create_user(username, password, person=person)
        return user

    def test_create_employment(self):
        self.create_community_member(self.username, self.password)
        self.client.login(username=self.username, password=self.password)
        data = self.get_employment_sample_data()
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], data['name'])
        self.assertEqual(response.data['company']['name'], data['company']['name'])

    def test_create_employment_without_authentication(self):
        data = self.get_employment_sample_data()
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_employment_without_person_object(self):
        User.objects.create_user(self.username, self.password)
        self.client.login(username=self.username, password=self.password)
        data = self.get_employment_sample_data()
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_employment_list(self):
        user = self.create_community_member(self.username, self.password)
        person = mommy.make(Person)
        mommy.make(Employment, person=user.person, _quantity=2)
        mommy.make(Employment, person=person, _quantity=3)
        self.client.login(username=self.username, password=self.password)
        response = self.client.get(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_employment_list_without_authentication(self):
        response = self.client.get(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_employment_list_without_person_object(self):
        User.objects.create_user(self.username, self.password)
        self.client.login(username=self.username, password=self.password)
        response = self.client.get(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class EmploymentViewTests(APITestCase):
    def setUp(self):
        self.username = 'john@doe.pl'
        self.password = 'random'
        person = mommy.make(Person)
        self.employment = mommy.make(Employment, person=person)
        self.url = reverse('employment', kwargs={'pk': self.employment.pk})
        self.bad_url = reverse('employment', kwargs={'pk': 1000})
        User.objects.create_user(self.username, self.password, person=person)

    def get_employment_sample_data(self):
        return {
            'name': 'C++ Developer',
            'start': '2005-05-15',
            'end': '2008-11-12',
            'company': {
                'name': 'Developers',
            },
            'city': {
                'name': 'London',
            },
            'branch': {
                'name': 'IT'
            }
        }

    def test_retrieve_employment(self):
        self.client.login(username=self.username, password=self.password)
        response = self.client.get(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], self.employment.name)

    def test_retrieve_employment_without_authentication(self):
        response = self.client.get(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_retrieve_non_existing_employment(self):
        self.client.login(username=self.username, password=self.password)
        response = self.client.get(self.bad_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_employment(self):
        self.client.login(username=self.username, password=self.password)
        data = self.get_employment_sample_data()
        response = self.client.put(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], data['name'])
        self.assertEqual(response.data['company']['name'], data['company']['name'])

    def test_update_employment_without_authentication(self):
        data = self.get_employment_sample_data()
        response = self.client.put(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_non_existing_employment(self):
        self.client.login(username=self.username, password=self.password)
        data = self.get_employment_sample_data()
        response = self.client.put(self.bad_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_employment_by_community_member(self):
        """
        Ensures that employment information can't be changed by different user
        """
        person = mommy.make(Person)
        User.objects.create_user('tricky@hacker.com', '321', person=person)
        self.client.login(username='tricky@hacker.com', password='321')
        data = self.get_employment_sample_data()
        response = self.client.put(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_employment(self):
        self.client.login(username=self.username, password=self.password)
        response = self.client.delete(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_employment_without_authentication(self):
        response = self.client.delete(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_non_existing_employment(self):
        self.client.login(username=self.username, password=self.password)
        response = self.client.delete(self.bad_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_employment_by_community_member(self):
        person = mommy.make(Person)
        User.objects.create_user('tricky@hacker.com', '321', person=person)
        self.client.login(username='tricky@hacker.com', password='321')
        response = self.client.delete(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class CityListViewTests(APITestCase):
    def setUp(self):
        self.url = reverse('city_list')
        mommy.make(City, is_verified=True, _quantity=3)
        mommy.make(City, is_verified=False, _quantity=6)

    def test_city_list(self):
        User.objects.create_user('john@doe.com', '312')
        self.client.login(username='john@doe.com', password='312')
        response = self.client.get(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)

    def test_city_list_without_authentication(self):
        response = self.client.get(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class TeacherListViewTests(APITestCase):
    def setUp(self):
        self.url = reverse('teacher_list')
        mommy.make(TeacherLearnYears, _quantity=3)

    def test_teacher_list(self):
        User.objects.create_user('john@doe.pl', '123')
        self.client.login(username='john@doe.pl', password='123')
        response = self.client.get(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)

    def test_teacher_list_without_authentication(self):
        response = self.client.get(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class GroupListViewTests(APITestCase):
    pass


class GroupDetailViewTests(APITestCase):
    def setUp(self):
        self.username = 'john@doe.pl'
        self.password = 'random'
        self.group = mommy.make(Group)
        self.url = reverse('group', kwargs={'pk': self.group.pk})
        self.bad_url = reverse('group', kwargs={'pk': 1000})
        User.objects.create_user(self.username, self.password)

    def test_retrieve_group(self):
        self.client.login(username=self.username, password=self.password)
        response = self.client.get(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['symbol'], self.group.symbol)

    def test_retrieve_group_without_authentication(self):
        response = self.client.get(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_retrieve_non_existing_group(self):
        self.client.login(username=self.username, password=self.password)
        response = self.client.get(self.bad_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class PersonGroupViewTests(APITestCase):
    pass


class PersonalDataUpdateViewTests(APITestCase):
    def setUp(self):
        self.username = 'john@doe.pl'
        self.password = 'randomized'
        self.attribute = mommy.make(Attribute, data_type=Attribute.EMAIL_FIELD)
        self.url = reverse('personal_data', kwargs={'pk': self.attribute.id})
        self.bad_url = reverse('personal_data', kwargs={'pk': 1000})
        person = mommy.make(Person)
        User.objects.create_user(self.username, self.password, person=person)

    def get_sample_personal_data(self):
        return {
            'value': 'asher@mannion.co',
            'is_public': False
        }

    def get_incorrect_personal_data(self):
        return {
            'value': 'not email value',
            'is_public': True
        }

    def test_update_personal_data(self):
        self.client.login(username=self.username, password=self.password)
        data = self.get_sample_personal_data()
        response = self.client.put(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['value'], data['value'])
        self.assertEqual(response.data['is_public'], data['is_public'])

    def test_update_invalid_personal_data(self):
        self.client.login(username=self.username, password=self.password)
        data = self.get_incorrect_personal_data()
        response = self.client.put(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_personal_data_without_authentication(self):
        data = self.get_sample_personal_data()
        response = self.client.put(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_personal_data_without_person(self):
        User.objects.create_user('sample@user.com', '123')
        self.client.login(username='sample@user.com', password='123')
        data = self.get_sample_personal_data()
        response = self.client.put(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_non_existing_attribute(self):
        self.client.login(username=self.username, password=self.password)
        data = self.get_sample_personal_data()
        response = self.client.put(self.bad_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class AttributeListViewTests(APITestCase):
    def setUp(self):
        self.url = reverse('personal_data_list')
        self.username = 'john@doe.com'
        self.password = '123123'

    def test_attributes_list(self):
        attributes = mommy.make(Attribute, _quantity=3)
        attribute = attributes[0]
        person = mommy.make(Person)
        personal_data = mommy.make(PersonalData, attribute=attribute, person=person)
        User.objects.create_user(self.username, self.password, person=person)

        self.client.login(username=self.username, password=self.password)
        response = self.client.get(self.url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)

        for obj in response.data:
            if obj.get('id') == attribute.id:
                self.assertEqual(obj.get('value'), personal_data.value)
                self.assertEqual(obj.get('is_public'), personal_data.is_public)

    def test_attributes_list_without_authentication(self):
        response = self.client.get(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_attributes_list_without_person(self):
        User.objects.create_user(self.username, self.password)
        self.client.login(username=self.username, password=self.password)
        response = self.client.get(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)