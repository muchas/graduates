# -*- coding: utf-8 -*-
from django.contrib import messages
from django.core.urlresolvers import reverse
from django.shortcuts import redirect
from django.views.generic.base import TemplateView
from django.views.generic.edit import FormView, CreateView

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from apps.accounts.models import User
from .forms import GuestForm, JubileeBookingForm
from .serializers import FeedbackSerializer


class HomePageView(TemplateView):
    def get_context_data(self, **kwargs):
        context = super(HomePageView, self).get_context_data(**kwargs)
        if self.request.user.is_authenticated():
            context['members_count'] = User.objects.all().count()
        return context

    def get_template_names(self):
        user = self.request.user
        if user.is_authenticated() and user.is_community_member:
            if not user.is_introduced:
                return ["home/introduction.html"]
            else:
                return ["home/application.html"]
        return ["home/landing.html"]


class GuestView(FormView):
    template_name = 'home/guest.html'
    form_class = GuestForm

    def form_invalid(self, form):
        return redirect('home')

    def form_valid(self, form):
        form.save()
        return self.render_to_response(self.get_context_data())


class FaqView(TemplateView):
    template_name = "home/faq.html"


class FeedbackView(generics.CreateAPIView):
    serializer_class = FeedbackSerializer
    permission_classes = (IsAuthenticated,)


class JubileeBookingView(FormView):
    template_name = 'home/jubilee_form.html'
    form_class = JubileeBookingForm

    def get_success_url(self):
        return reverse('jubilee_booking')

    def form_valid(self, form):
        form.save()
        messages.add_message(self.request, messages.SUCCESS, u'Twoje zgłoszenie zostało pomyślnie wysłane. Dziękujemy.')
        return super(JubileeBookingView, self).form_valid(form)
