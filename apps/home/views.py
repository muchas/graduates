from django.shortcuts import redirect, render
from django.views.generic.base import TemplateView
from django.views.generic.edit import FormView, CreateView
from rest_framework import generics, views, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from apps.accounts.models import User
from apps.home.forms import GuestForm
from apps.home.serializers import FeedbackSerializer


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

