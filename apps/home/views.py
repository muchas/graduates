from django.views.generic.base import TemplateView


class HomePageView(TemplateView):
    template_name = "home/landing.html"


class FaqView(TemplateView):
    template_name = "home/faq.html"