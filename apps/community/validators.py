from django.core.validators import validate_email, validate_integer
from rest_framework.validators import UniqueValidator as BaseUniqueValidator


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


class ImageValidator(object):
    def __init__(self, field):
        self.field = field

    def __call__(self, attrs):
        value = attrs[self.field]
        import pdb; pdb.set_trace()


class UniqueValidator(BaseUniqueValidator):
    def __init__(self, queryset, message=None, field_name=None):
        BaseUniqueValidator.__init__(self, queryset, message)
        self.field_name = field_name

    def set_context(self, serializer_field):
        if not self.field_name:
            self.field_name = serializer_field.source_attrs[0]
        self.instance = getattr(serializer_field.parent, 'instance', None)