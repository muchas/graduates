from django import template
from apps.home.forms import GuestForm

register = template.Library()
 
 
@register.inclusion_tag("home/subscription.html")
def subscription(**kwargs):
    form = GuestForm()
    return {
        'form': form
    }