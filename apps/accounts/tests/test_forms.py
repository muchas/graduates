# -*- coding: utf-8 -*-
from django.test import TestCase
from model_mommy import mommy
from apps.accounts.forms import RegistrationForm, PersonForm, ClaimForm, AuthenticationForm
from apps.accounts.models import User
from apps.community.models import Person


class RegistrationFormTest(TestCase):
    """
    Test the default registration form
    """
    def test_registration_form_fails(self):
        User.objects.create_user('example@alfred.com', 'secret')

        invalid_data_dicts = [
            # Invalid email
            {'data': {'email': 'john@doe.com%',
                      'password1': 'secret1',
                      'password2': 'secret1'},
             'error': ('email', [u"Enter a valid email address."])},
            # Existing user
            {'data': {'email': 'example@alfred.com',
                      'password1': 'secret1',
                      'password2': 'secret1',},
             'error': ('email', [u"Użytkownik z podanym e-mailem już istnieje."])},
            # Password mismatch
            {'data': {'email': 'john@doe.com',
                      'password1': 'secret1',
                      'password2': 'secret2'},
             'error': ('__all__', [u"Wprowadzone hasła nie są identyczne."])},
        ]

        for invalid_dict in invalid_data_dicts:
            form = RegistrationForm(data=invalid_dict['data'])
            self.assertFalse(form.is_valid())
            self.assertEqual(form.errors[invalid_dict['error'][0]], invalid_dict['error'][1])

    def test_registration_form_success(self):
        form = RegistrationForm(data={'email': 'john@doe.com',
                                      'password1': 'secret',
                                      'password2': 'secret' })
        self.assertTrue(form.is_valid())


class PersonFormTest(TestCase):
    def test_non_existing_person(self):
        error_message = [u"Osoba o podanym imieniu i nazwisku nie istnieje w naszej bazie."]
        form = PersonForm(data={'first_name': 'John',
                                'last_name': 'Doe'})
        self.assertFalse(form.is_valid())
        self.assertEqual(form.errors['__all__'], error_message)

    def test_person_with_account(self):
        first_name, last_name = 'John', 'Doe'
        person = mommy.make(Person, first_name=first_name, last_name=last_name)
        mommy.make(User, person=person)
        error_message = [u"Podana osoba posiada już konto użytkownika."]
        form = PersonForm(data={'first_name': first_name,
                                'last_name': last_name})
        self.assertFalse(form.is_valid())
        self.assertEqual(form.errors['__all__'], error_message)

    def test_successful_scenario(self):
        first_name, last_name = 'John', 'Doe'
        mommy.make(Person, first_name=first_name, last_name=last_name)
        form = PersonForm(data={'first_name': first_name,
                                'last_name': last_name})
        self.assertTrue(form.is_valid())


class AuthenticationFormTest(TestCase):
    def test_incorrect_login(self):
        form = AuthenticationForm(data={'email': 'john@doe.com',
                                        'password': 'secret'})
        self.assertFalse(form.is_valid())

    def test_inactive_user_login(self):
        user = User.objects.create_user('john@doe.com', 'secret')
        user.is_active = False
        user.save()
        form = AuthenticationForm(data={'email': 'john@doe.com',
                                        'password': 'secret'})
        self.assertFalse(form.is_valid())
        self.assertEqual([u"To konto jest niekatywne."], form.errors['__all__'])

    def test_successful_login(self):
        User.objects.create_user('john@doe.com', 'secret')
        form = AuthenticationForm(data={'email': 'john@doe.com',
                                        'password': 'secret'})
        self.assertTrue(form.is_valid())


# I don't know at this moment how to test form with reCaptcha field
# class ClaimFormTest(TestCase):
#     def test_non_existing_person(self):
        # error_message = [u"Osoba o podanym imieniu i nazwisku nie istnieje w naszej bazie."]
        # form = ClaimForm(data={})