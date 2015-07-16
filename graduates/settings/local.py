from .base import *


DEBUG = True

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

INSTALLED_APPS += ("debug_toolbar", )

STATIC_ROOT = os.path.join(BASE_DIR, '../', 'static')
