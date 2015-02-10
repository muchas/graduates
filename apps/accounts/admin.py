from django.contrib import admin
from models import Claim, Invitation, User

# Register your models here.
admin.site.register(Claim)
admin.site.register(Invitation)
admin.site.register(User)