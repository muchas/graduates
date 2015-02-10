# -*- coding: utf-8 -*-
from django import forms
from django.utils.translation import ugettext_lazy as _

from django.contrib.auth import authenticate, get_user_model
from apps.accounts.models import User, Claim
from apps.community.models import Person
from captcha.fields import ReCaptchaField


class PersonForm(forms.Form):
    first_name = forms.CharField(
        label=u"Imię"
    )

    last_name = forms.CharField(
        label=u"Nazwisko",
        help_text="W przypadku kobiet prosimy o podanie nazwiska panieńskiego."
    )

    def clean(self):
        first_name = self.cleaned_data.get('first_name')
        last_name = self.cleaned_data.get('last_name')

        existing = Person.objects.filter(
            first_name=first_name,
            last_name=last_name
        ).first()

        if not existing:
            raise forms.ValidationError(u"Osoba o podanym imieniu i nazwisku nie istnieje w naszej bazie.")

        if hasattr(existing, 'user'):
            raise forms.ValidationError(u"Podana osoba posiada już konto użytkownika.")

        return self.cleaned_data


class RegistrationForm(forms.Form):
    email = forms.EmailField(label="Adres e-mail")
    password1 = forms.CharField(label="Hasło", widget=forms.PasswordInput)
    password2 = forms.CharField(label="Hasło (powtórz)", widget=forms.PasswordInput)

    def clean_email(self):
        """
        Validate that the username is alphanumeric and is not already
        in use.

        """
        existing = User.objects.filter(email__iexact=self.cleaned_data['email'])
        if existing.exists():
            raise forms.ValidationError(u"Użytkownik z podanym e-mailem już istnieje.")
        else:
            return self.cleaned_data['email']

    def clean(self):
        if 'password1' in self.cleaned_data and 'password2' in self.cleaned_data:
            if self.cleaned_data['password1'] != self.cleaned_data['password2']:
                raise forms.ValidationError(u"Wprowadzone hasła nie są identyczne.")
        return self.cleaned_data


class ClaimForm(forms.Form):
    first_name = forms.CharField(label=u"Imię", widget=forms.TextInput(attrs={'class': 'span3'}))
    last_name = forms.CharField(label=u"Nazwisko", widget=forms.TextInput(attrs={'class': 'span3'}))
    email = forms.EmailField(label=u"Adres e-mail", widget=forms.TextInput(attrs={'class': 'span3'}))
    contact_phone = forms.CharField(label=u"Telefon kontaktowy", max_length=12, widget=forms.TextInput(attrs={'class': 'span3'}))
    captcha = ReCaptchaField(label="")

    def clean_email(self):
        email = self.cleaned_data.get('email')
        existing = Claim.objects.filter(email=email).exists()
        if existing:
            raise forms.ValidationError(u"Z podanego e-maila wysłano już zgłoszenie.")
        return email

    def clean(self):
        first_name = self.cleaned_data.get('first_name')
        last_name = self.cleaned_data.get('last_name')

        existing = Person.objects.filter(first_name=first_name, last_name=last_name).first()

        if not existing:
            raise forms.ValidationError(u"Osoba o podanym imieniu i nazwisku nie istnieje w naszej bazie.")

        if not hasattr(existing, 'user'):
            raise forms.ValidationError(u"Podane konto nie jest zajęte.")

        return self.cleaned_data


class AuthenticationForm(forms.Form):
    """
    Base class for authenticating users. Extend this to get a form that accepts
    username/password logins.
    """
    email = forms.EmailField(
        max_length=40,
        required=False,
        widget=forms.EmailInput(attrs={'class': 'span3', 'placeholder': 'Adres e-mail'})
    )
    password = forms.CharField(
        label=_("Password"),
        required=False,
        widget=forms.PasswordInput(attrs={'class': 'span3', 'placeholder': 'Hasło'})
    )

    error_messages = {
        'invalid_login': _(u"Wprowadź poprawny email oraz hasło. "
                           u"Uwaga: wielkość liter ma znaczenie!"),
        'inactive': _("To konto jest niekatywne."),
    }

    def __init__(self, request=None, *args, **kwargs):
        """
        The 'request' parameter is set for custom auth use by subclasses.
        The form data comes in via the standard 'data' kwarg.
        """
        self.request = request
        self.user_cache = None
        super(AuthenticationForm, self).__init__(*args, **kwargs)

        # Set the label for the "username" field.
        UserModel = get_user_model()
        self.username_field = UserModel._meta.get_field(UserModel.USERNAME_FIELD)

    def clean(self):
        email = self.cleaned_data.get('email')
        password = self.cleaned_data.get('password')

        self.user_cache = authenticate(email=email,
                                       password=password)
        if self.user_cache is None:
            raise forms.ValidationError(
                self.error_messages['invalid_login'],
                code='invalid_login'
            )
        else:
            self.confirm_login_allowed(self.user_cache)

        return self.cleaned_data

    def confirm_login_allowed(self, user):
        """
        Controls whether the given User may log in. This is a policy setting,
        independent of end-user authentication. This default behavior is to
        allow login by active users, and reject login by inactive users.

        If the given user cannot log in, this method should raise a
        ``forms.ValidationError``.

        If the given user may log in, this method should return None.
        """
        if not user.is_active:
            raise forms.ValidationError(
                self.error_messages['inactive'],
                code='inactive',
            )

    def get_user_id(self):
        if self.user_cache:
            return self.user_cache.id
        return None

    def get_user(self):
        return self.user_cache