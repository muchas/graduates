from django.core.validators import validate_email, validate_integer


class EmailValidator(object):
    def __init__(self, field):
        self.field = field

    def __call__(self, attrs):
        value = attrs[self.field]
        validate_email(value)


class IntegerValidator(object):
    def __init__(self, field):
        self.field = field

    def __call__(self, attrs):
        value = attrs[self.field]
        validate_integer(value)