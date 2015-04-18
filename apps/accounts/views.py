from django.shortcuts import redirect, get_object_or_404
from django.views.generic import FormView, TemplateView
from django.views.generic.base import View
from django.contrib.auth.views import login
from django.contrib.formtools.wizard.views import SessionWizardView
from rest_framework import views, generics
from rest_framework.permissions import IsAuthenticated
from apps.accounts import signals
from apps.accounts.models import RegistrationProfile, Claim
from apps.community.models import Person
from forms import AuthenticationForm, PersonForm, RegistrationForm, ClaimForm


class LoginView(View):
    def get(self, request):
        return login(request, authentication_form=AuthenticationForm)

    def post(self, request):
        if not request.POST.get('remember_me', None):
            request.session.set_expiry(0)
        else:
            #TODO move expiration time to SETTINGS
            request.session.set_expiry(3600*24*14)
        return login(request, authentication_form=AuthenticationForm)


class UserIntroduceView(View):
    def get(self, request):
        user = request.user
        if user and user.is_authenticated():
            user.is_introduced = True
            user.save()
        return redirect('home')


class RegistrationWizard(SessionWizardView):
    TEMPLATES = {
        "person": "registration/wizard_person.html",
        "registration": "registration/wizard_register.html"
    }

    form_list = [
        ("person", PersonForm),
        ("registration", RegistrationForm)
    ]

    def get_template_names(self):
        return [self.TEMPLATES[self.steps.current]]

    def get_context_data(self, form, **kwargs):
        context = super(RegistrationWizard, self).get_context_data(form=form, **kwargs)
        if self.steps.current == 'registration':
            data = self.storage.get_step_data('person')
            person = Person.objects.filter(
                first_name=data.get('person-first_name'),
                last_name=data.get('person-last_name')
            ).first()
            context.update({'person': person})
        return context

    def done(self, form_list, **kwargs):
        form_data = {}
        for form in form_list:
            form_data.update(form.cleaned_data)

        email, password = form_data.get('email'), form_data.get('password1')
        person = Person.objects.filter(
            first_name=form_data.get('first_name'),
            last_name=form_data.get('last_name')
        ).first()
        new_user = RegistrationProfile.objects.create_inactive_user(email, password, person)
        signals.user_registered.send(sender=self.__class__,
                                     user=new_user,
                                     request=self.request)
        return redirect('login')


class ActivationView(TemplateView):
    http_method_names = ['get']
    template_name = 'registration/activate.html'

    def get(self, request, *args, **kwargs):
        activated_user = self.activate(request, *args, **kwargs)
        if activated_user:
            signals.user_activated.send(sender=self.__class__,
                                        user=activated_user,
                                        request=request)
            return redirect('home')
        return super(ActivationView, self).get(request, *args, **kwargs)

    def activate(self, request, activation_key):
        """
        Given an an activation key, look up and activate the user
        account corresponding to that key (if possible).

        After successful activation, the signal
        ``registration.signals.user_activated`` will be sent, with the
        newly activated ``User`` as the keyword argument ``user`` and
        the class of this backend as the sender.

        """
        activated_user = RegistrationProfile.objects.activate_user(activation_key)
        if activated_user:
            signals.user_activated.send(sender=self.__class__,
                                        user=activated_user,
                                        request=request)
        return activated_user


class ClaimView(FormView):
    template_name = 'accounts/claim.html'
    form_class = ClaimForm

    def form_valid(self, form):
        cleaned_data = form.cleaned_data
        first_name, last_name = cleaned_data.get('first_name'), cleaned_data.get('last_name')
        person = get_object_or_404(Person, first_name=first_name, last_name=last_name)
        claim = Claim(person=person, email=cleaned_data.get('email'), contact_phone=cleaned_data.get('contact_phone'))
        claim.save()
        return redirect('login')


