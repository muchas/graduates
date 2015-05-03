from django import template
from django.conf import settings


register = template.Library()


@register.inclusion_tag("tracking/intercom.html")
def intercom(user):
    if hasattr(settings, "INTERCOM_APP_ID") and user.is_authenticated():
        name = user.person.full_name if hasattr(user, 'person') else None
        return {
            "app_id": settings.INTERCOM_APP_ID,
            "name": name,
            "email": user.email,
            "created_at": user.date_joined
        }
    else:
        return {}