from django.shortcuts import redirect
from django.views.generic.base import TemplateView
from apps.accounts.models import User


class HomePageView(TemplateView):
    def get_context_data(self, **kwargs):
        context = super(HomePageView, self).get_context_data(**kwargs)
        if self.request.user.is_authenticated():
            context['members_count'] = User.objects.all().count()
        return context

    def get_template_names(self):
        if self.request.user.is_authenticated():
            return ["home/application.html"]
        else:
            return ["home/landing.html"]


class FaqView(TemplateView):
    template_name = "home/faq.html"