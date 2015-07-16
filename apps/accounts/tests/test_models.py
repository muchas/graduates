from uuid import UUID
import datetime

from django.test import TestCase
from django.conf import settings
from django.core import mail

from model_mommy import mommy

from ..models import RegistrationProfile, User, Claim


class ClaimTests(TestCase):
    def test_claim_creation(self):
        claim = mommy.make(Claim)
        self.assertEqual(Claim.objects.all().count(), 1)
        self.assertFalse(claim.is_considered)


class UserTests(TestCase):
    """

    """
    def setUp(self):
        pass

    def test_user_model_creation(self):
        user = mommy.make(User)
        self.assertEqual(User.objects.all().count(), 1)

    def test_user_creation(self):
        user = User.objects.create_user('john@doe.com', 'secret')
        self.assertTrue(user.check_password('secret'))
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        self.assertEqual(User.objects.all().count(), 1)

    def test_user_creation_without_password(self):
        user = User.objects.create_user('john@doe.com')
        self.assertFalse(user.check_password(None))
        self.assertEqual(User.objects.all().count(), 1)

    def test_superuser_creation(self):
        user = User.objects.create_superuser('john@doe.com', 'secret')
        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)
        self.assertTrue(user.check_password('secret'))
        self.assertEqual(User.objects.filter(is_staff=True).count(), 1)

    def test_user_full_name(self):
        user = mommy.prepare(User, first_name='John', last_name='Doe')
        full_name = "%s %s" % (user.first_name, user.last_name)
        self.assertEqual(user.get_full_name(), full_name.strip())

    def test_user_short_name(self):
        user = mommy.prepare(User, first_name='John', last_name='Doe')
        self.assertEqual(user.get_short_name(), user.first_name)

    def test_user_email_sending(self):
        user = mommy.prepare(User)
        user.email_user('subject', 'message')
        self.assertEqual(len(mail.outbox), 1)
        self.assertEqual(mail.outbox[0].to, [user.email])


class RegistrationProfileTests(TestCase):
    user_info = {'password': 'swordfish',
                 'email': 'alice@example.com'}

    def setUp(self):
        self.old_activation = getattr(settings, 'ACCOUNT_ACTIVATION_DAYS', None)
        settings.ACCOUNT_ACTIVATION_DAYS = 7

    def tearDown(self):
        settings.ACCOUNT_ACTIVATION_DAYS = self.old_activation

    def test_profile_creation(self):
        """
        Creating a registration profile for a user populates the
        profile with the correct user and a UUID to use as
        activation key.

        """
        new_user = mommy.make(User)
        profile = RegistrationProfile.objects.create(user=new_user)

        self.assertEqual(RegistrationProfile.objects.count(), 1)
        self.assertEqual(profile.user.id, new_user.id)
        self.assertTrue(isinstance(profile.activation_key, UUID))
        self.assertEqual(unicode(profile), "Registration information for " + new_user.email)

    def test_activation_email(self):
        """
        ``RegistrationProfile.send_activation_email`` sends an
        email.

        """
        new_user = mommy.make(User)
        profile = RegistrationProfile.objects.create(user=new_user)
        profile.send_activation_email()
        self.assertEqual(len(mail.outbox), 1)
        self.assertEqual(mail.outbox[0].to, [new_user.email])

    def test_user_creation(self):
        """
        Creating a new user populates the correct data, and sets the
        user's account inactive.

        """
        new_user = RegistrationProfile.objects.create_inactive_user(**self.user_info)
        self.assertEqual(new_user.email, 'alice@example.com')
        self.assertTrue(new_user.check_password('swordfish'))
        self.assertFalse(new_user.is_active)

    def test_user_creation_email(self):
        """
        By default, creating a new user sends an activation email.

        """
        new_user = RegistrationProfile.objects.create_inactive_user(**self.user_info)
        self.assertEqual(len(mail.outbox), 1)

    def test_user_creation_no_email(self):
        """
        Passing ``send_email=False`` when creating a new user will not
        send an activation email.

        """
        new_user = RegistrationProfile.objects.create_inactive_user(send_email=False, **self.user_info)
        self.assertEqual(len(mail.outbox), 0)

    def test_unexpired_account(self):
        """
        ``RegistrationProfile.activation_key_expired()`` is ``False``
        within the activation window.

        """
        new_user = RegistrationProfile.objects.create_inactive_user(**self.user_info)
        profile = RegistrationProfile.objects.get(user=new_user)
        self.assertFalse(profile.activation_key_expired())

    def test_expired_account(self):
        """
        ``RegistrationProfile.activation_key_expired()`` is ``True``
        outside the activation window.

        """
        new_user = RegistrationProfile.objects.create_inactive_user(**self.user_info)
        new_user.date_joined -= datetime.timedelta(days=settings.ACCOUNT_ACTIVATION_DAYS + 1)
        new_user.save()
        profile = RegistrationProfile.objects.get(user=new_user)
        self.assertTrue(profile.activation_key_expired())

    def test_valid_activation(self):
        """
        Activating a user within the permitted window makes the
        account active, and resets the activation key.

        """
        new_user = RegistrationProfile.objects.create_inactive_user(**self.user_info)
        profile = RegistrationProfile.objects.get(user=new_user)
        activated = RegistrationProfile.objects.activate_user(str(profile.activation_key))

        self.assertTrue(isinstance(activated, User))
        self.assertEqual(activated.id, new_user.id)
        self.assertTrue(activated.is_active)

        profile = RegistrationProfile.objects.get(user=new_user)
        self.assertTrue(profile.is_activated)

    def test_expired_activation(self):
        """
        Attempting to activate outside the permitted window does not
        activate the account.

        """
        new_user = RegistrationProfile.objects.create_inactive_user(**self.user_info)
        new_user.date_joined -= datetime.timedelta(days=settings.ACCOUNT_ACTIVATION_DAYS + 1)
        new_user.save()

        profile = RegistrationProfile.objects.get(user=new_user)
        activated = RegistrationProfile.objects.activate_user(str(profile.activation_key))

        self.assertFalse(isinstance(activated, User))
        self.assertFalse(activated)

        new_user = User.objects.get(email='alice@example.com')
        self.assertFalse(new_user.is_active)

        profile = RegistrationProfile.objects.get(user=new_user)
        self.assertFalse(profile.is_activated)

    def test_activation_invalid_key(self):
        """
        Attempting to activate with a key which is not a UUID
        fails.

        """
        self.assertFalse(RegistrationProfile.objects.activate_user('foo'))

    def test_activation_already_activated(self):
        """
        Attempting to re-activate an already-activated account fails.

        """
        new_user = RegistrationProfile.objects.create_inactive_user(**self.user_info)
        profile = RegistrationProfile.objects.get(user=new_user)
        RegistrationProfile.objects.activate_user(str(profile.activation_key))

        profile = RegistrationProfile.objects.get(user=new_user)
        self.assertFalse(RegistrationProfile.objects.activate_user(str(profile.activation_key)))

    def test_expired_user_deletion(self):
        """
        ``RegistrationProfile.objects.delete_expired_users()`` only
        deletes inactive users whose activation window has expired.

        """
        new_user = RegistrationProfile.objects.create_inactive_user(**self.user_info)
        expired_user = RegistrationProfile.objects.create_inactive_user(password='secret',
                                                                        email='bob@example.com')
        expired_user.date_joined -= datetime.timedelta(days=settings.ACCOUNT_ACTIVATION_DAYS + 1)
        expired_user.save()

        RegistrationProfile.objects.delete_expired_users()
        self.assertEqual(RegistrationProfile.objects.count(), 1)
        self.assertRaises(User.DoesNotExist, User.objects.get, email='bob@example.com')