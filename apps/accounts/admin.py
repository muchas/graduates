from django.contrib import admin

from .models import Claim, User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'person', 'date_joined', 'is_staff', 'is_active', 'is_introduced')
    list_editable = ('is_staff',)
    list_filter = ('is_staff', 'is_active', 'is_introduced')
    search_fields = ['email', 'person__last_name', 'person__married_name', 'person__first_name']


admin.site.register(Claim)
