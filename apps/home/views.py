from django.shortcuts import redirect
from django.views.generic.base import TemplateView


class HomePageView(TemplateView):
    def get_template_names(self):
        if self.request.user.is_authenticated():
            return ["home/application.html"]
        else:
            return ["home/landing.html"]


class FaqView(TemplateView):
    template_name = "home/faq.html"