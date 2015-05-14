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

from django.utils.translation import ugettext_lazy as _
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

    ALLOWED_HOSTS = ['.lo5.bielsko.pl', '127.0.0.1', 'localhost', '188.226.230.41']

    INTERNAL_IPS = ('127.0.0.1',)

    DEFAULT_FROM_EMAIL = 'absolwenci@lo5.bielsko.pl'

    SERVER_EMAIL = 'absolwenci@lo5.bielsko.pl'

    AUTH_USER_MODEL = 'accounts.User'

    ACCOUNT_ACTIVATION_DAYS = 7

    TIME_ZONE = 'Europe/Warsaw'

    LANGUAGE_CODE = 'pl'

    LANGUAGES = (
        ('pl', _('Polish')),
        ('en', _('English')),
    )

    # If you set this to False, Django will make some optimizations so as not
    # to load the internationalization machinery.
    USE_I18N = True

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
        'django.contrib.sites',
        'absolute',
        'haystack',
        'rest_framework',
        'easy_thumbnails',
        'captcha',
        "djrill",
        'apps.home',
        'apps.community',
        'apps.accounts',
        'apps.posts',
        'apps.tracking',
        'debug_toolbar',
    )

    TEMPLATE_CONTEXT_PROCESSORS = (
        "django.contrib.auth.context_processors.auth",
        "django.core.context_processors.debug",
        "django.core.context_processors.i18n",
        "django.core.context_processors.media",
        "django.core.context_processors.static",
        "django.core.context_processors.tz",
        "django.core.context_processors.request",
        "absolute.context_processors.absolute",
        "django.contrib.messages.context_processors.messages",
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
        'django.middleware.locale.LocaleMiddleware',
        'debug_toolbar.middleware.DebugToolbarMiddleware',
    )

    ROOT_URLCONF = 'graduates.urls'

    STATICFILES_DIRS = (
        os.path.join(BASE_DIR, "static"),
    )

    STATIC_URL = '/static/'

    STATIC_ROOT = os.path.join(BASE_DIR + "/../", 'static')

    MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

    MEDIA_URL = '/media/'

    LOCALE_PATHS = (
        os.path.join(BASE_DIR, 'locale')
    )

    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': 'graduates_db',
            'USER': 'root',
            'PASSWORD': '5jfoi3b6',
            'HOST': '127.0.0.1',
            'PORT': '5432',
        }
    }

    HAYSTACK_CONNECTIONS = {
        'default': {
            'ENGINE': 'apps.community.backends.ConfigurableElasticSearchEngine',
            'URL': 'http://127.0.0.1:9200/',
            'INDEX_NAME': 'graduates',
        },
    }

    ELASTICSEARCH_INDEX_SETTINGS = {
        'settings': {
            "analysis": {
                "analyzer": {
                    "ngram_analyzer": {
                        "type": "custom",
                        "tokenizer": "lowercase",
                        "filter": ["haystack_ngram"]
                    },
                    "edgengram_analyzer": {
                        "type": "custom",
                        "tokenizer": "lowercase",
                        "filter": ["haystack_edgengram"]
                    }
                },
                "tokenizer": {
                    "haystack_ngram_tokenizer": {
                        "type": "nGram",
                        "min_gram": 3,
                        "max_gram": 15,
                    },
                    "haystack_edgengram_tokenizer": {
                        "type": "edgeNGram",
                        "min_gram": 2,
                        "max_gram": 15,
                        "side": "front"
                    }
                },
                "filter": {
                    "haystack_ngram": {
                        "type": "nGram",
                        "min_gram": 3,
                        "max_gram": 15
                    },
                    "haystack_edgengram": {
                        "type": "edgeNGram",
                        "min_gram": 1,
                        "max_gram": 15
                    }
                }
            }
        }
    }

    MESSAGE_STORAGE = 'django.contrib.messages.storage.session.SessionStorage'

    REST_FRAMEWORK = {
        'DEFAULT_PERMISSION_CLASSES': (
            'rest_framework.permissions.IsAuthenticated',
        )
    }

    URLS_JS_GENERATED_FILE = BASE_DIR + '/static/js/routes.js'

    THUMBNAIL_ALIASES = {
        '': {
            'photo': {
                'size': (263, 263),
                'quality': 100,
                'crop': 'scale'
            },
            'thumbnail': {
                'size': (50, 50),
                'quality': 85,
                'crop': 'scale'
            }
        },
    }

    CACHES = {
        'default': {
            'BACKEND': 'django.core.cache.backends.memcached.MemcachedCache',
            'LOCATION': '127.0.0.1:11211',
        }
    }

    LOGIN_REDIRECT_URL = '/'

    PERSONAL_DATA_EMAIL_FIELD = 'E-mail'

    SITE_ID = 1

    RECAPTCHA_PUBLIC_KEY = '6Leypf8SAAAAAP8M7JlGB9xDw3Ohw9w7n6LY4Rn9'
    RECAPTCHA_PRIVATE_KEY= '6Leypf8SAAAAAC1h9vEWSwvOzyTr-vpRmYOsGz3a'


class Development(Default):
    EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
    WSGI_APPLICATION = 'graduates.wsgi.application'


class Staging(Default):
    EMAIL_BACKEND = "djrill.mail.backends.djrill.DjrillBackend"
    MANDRILL_API_KEY = "-aUv8GibNMA58b69RhCSNw"


class Production(Default):
    DEBUG = False

    EMAIL_BACKEND = "djrill.mail.backends.djrill.DjrillBackend"
    MANDRILL_API_KEY = "-aUv8GibNMA58b69RhCSNw"

    INTERCOM_APP_ID = "im1t13q0"
