from django import forms
from apps.home.models import Guest


class GuestForm(forms.ModelForm):
    class Meta:
        model = Guest
        fields = ('email',)
