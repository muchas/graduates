# -*- coding: utf-8 -*-
import os
import sys

"""
Django settings for graduates project.

For more information on this file, see
https://docs.djangoproject.com/en/1.7/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.7/ref/settings/
"""

from configurations import Configuration


BASE_DIR = os.path.dirname(os.path.dirname(__file__))

# sys.path.insert(0, os.path.join(BASE_DIR, 'apps'))


class Default(Configuration):
    DEBUG = True
    TEMPLATE_DEBUG = DEBUG
    SECRET_KEY = os.environ.get('SECRET_KEY',
                                'kekq!7l%@v)42papk*w1(*=-&rpls9av#9g$@ua(8871)%qz*f')

    ADMINS = (
        (u'Sławomir Mucha', 'mucha.slawomir@gmail.com'),
    )

    ALLOWED_HOSTS = ['.lo5.bielsko.pl', '127.0.0.1', 'localhost']

    AUTH_USER_MODEL = 'accounts.User'

    ACCOUNT_ACTIVATION_DAYS = 7

    TIME_ZONE = 'Europe/Warsaw'

    LANGUAGE_CODE = 'pl'

    # If you set this to False, Django will make some optimizations so as not
    # to load the internationalization machinery.
    USE_I18N = False

    USE_THOUSAND_SEPARATOR = True

    # If you set this to False, Django will not format dates, numbers and
    # calendars according to the current locale.
    USE_L10N = False

    # If you set this to False, Django will not use timezone-aware datetimes.
    USE_TZ = True

    INSTALLED_APPS = (
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
        'rest_framework',
        'captcha',
        'apps.home',
        'apps.community',
        'apps.accounts',
    )

    TEMPLATE_CONTEXT_PROCESSORS = (
        "django.contrib.auth.context_processors.auth",
        "django.core.context_processors.debug",
        "django.core.context_processors.i18n",
        "django.core.context_processors.media",
        "django.core.context_processors.static",
        "django.core.context_processors.tz",
        "django.core.context_processors.request",
    )

    TEMPLATE_LOADERS = (
        'django.template.loaders.filesystem.Loader',
        'django.template.loaders.app_directories.Loader',
    )

    TEMPLATE_DIRS = (
        os.path.join(BASE_DIR, 'templates'),
    )

    MIDDLEWARE_CLASSES = (
        'django.contrib.sessions.middleware.SessionMiddleware',
        'django.middleware.common.CommonMiddleware',
        'django.middleware.csrf.CsrfViewMiddleware',
        'django.contrib.auth.middleware.AuthenticationMiddleware',
        'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
        'django.contrib.messages.middleware.MessageMiddleware',
        'django.middleware.clickjacking.XFrameOptionsMiddleware',
    )

    ROOT_URLCONF = 'graduates.urls'

    STATICFILES_DIRS = (
        os.path.join(BASE_DIR, "static"),
    )

    STATIC_URL = '/static/'

    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        }
    }

    REST_FRAMEWORK = {
        'DEFAULT_PERMISSION_CLASSES': (
            'rest_framework.permissions.IsAuthenticated',
        )
    }

    URLS_JS_GENERATED_FILE='static/js/routes.js'


class Development(Default):
    EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

    WSGI_APPLICATION = 'graduates.wsgi.application'

    RECAPTCHA_PUBLIC_KEY = '6Leypf8SAAAAAP8M7JlGB9xDw3Ohw9w7n6LY4Rn9'
    RECAPTCHA_PRIVATE_KEY= '6Leypf8SAAAAAC1h9vEWSwvOzyTr-vpRmYOsGz3a'


class Staging(Default):
    pass


class Production(Default):
    pass