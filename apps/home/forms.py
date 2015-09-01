# -*- coding: utf-8 -*-
from datetime import datetime

from django import forms
from django.core.exceptions import ValidationError
from django.utils.functional import cached_property

from apps.community.models import Person
from .models import Guest, JubileeBooking


LAST_YEAR_CHOICES = [(year, year) for year in range(1994, 2016)]


class GuestForm(forms.ModelForm):
    class Meta:
        model = Guest
        fields = ('email',)


class JubileeBookingForm(forms.ModelForm):
    first_name = forms.CharField(label=u'Imię', max_length=50)
    last_name = forms.CharField(label=u'Nazwisko', max_length=50, help_text=u'W przypadku kobiet prosimy o podanie nazwiska panieńskiego.')
    last_year = forms.ChoiceField(label='Rocznik', choices=LAST_YEAR_CHOICES)
    gifts_included = forms.BooleanField(label='', help_text=u'Chciałbym otrzymać upominki i w związku z tym wpłacam'
                                                      u' kwotę 30 zł na konto Szkolnej Rady Rodziców.', required=False)

    class Meta:
        model = JubileeBooking
        fields = ('email', 'first_name', 'last_name', 'last_year',
                  'gifts_included')

    @cached_property
    def person(self):
        first_name = self.cleaned_data.get('first_name')
        last_name = self.cleaned_data.get('last_name')
        last_year = self.cleaned_data.get('last_year')
        return Person.objects.filter(first_name=first_name, last_name=last_name,
                                     group__last_year=last_year).first()

    def clean(self):
        if not self.person:
            raise ValidationError(u'Podana osoba nie istnieje w naszej bazie danych. Skontaktuj się z dyrekcją szkoły.')

        existing_booking = JubileeBooking.objects.filter(person=self.person)
        if existing_booking.exists():
            raise ValidationError(u'Twoje zgłoszenie zostało już wysłane. Jeżeli nie wysyłałeś zgłoszenia'
                                  u' skontaktuj się z dyrekcją szkoły.')
        return self.cleaned_data

    def save(self, commit=True):
        self.instance.person = self.person
        super(JubileeBookingForm, self).save(commit=commit)
