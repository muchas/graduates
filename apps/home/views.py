from django.views.generic.base import TemplateView
from rest_framework import generics, views, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from apps.accounts.models import User
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


class FaqView(TemplateView):
    template_name = "home/faq.html"


class FeedbackView(generics.CreateAPIView):
    serializer_class = FeedbackSerializer
    permission_classes = (IsAuthenticated,)

