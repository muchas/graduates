from django.contrib import admin

from .models import Feedback, Guest, JubileeBooking

admin.site.register(Feedback)
admin.site.register(Guest)


@admin.register(JubileeBooking)
class JubileeBookingAdmin(admin.ModelAdmin):
    list_display = ('person', 'gifts_included', 'email')
