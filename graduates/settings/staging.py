from .base import *

DEBUG = False

EMAIL_BACKEND = "djrill.mail.backends.djrill.DjrillBackend"

MANDRILL_API_KEY = get_env_variable("MANDRILL_API_KEY")