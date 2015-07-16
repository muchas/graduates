from django.utils.translation import ugettext_lazy as _
from django.forms import ImageField as DjangoImageField

from rest_framework.fields import FileField as BaseFileField


class FileField(BaseFileField):
    default_error_messages = {
        'required': _("No file was submitted."),
        'invalid': _("The submitted data was not a file. Check the encoding type on the form."),
        'no_name': _("No filename could be determined."),
        'empty': _("The submitted file is empty."),
        'max_length': _('Ensure this filename has at most {max_length} characters (it has {length}).'),
        'max_size': _('The submitted file is too big.')
    }

    def __init__(self, *args, **kwargs):
        self.max_size = kwargs.pop('max_size', None)
        super(FileField, self).__init__(*args, **kwargs)

    def to_internal_value(self, data):
        data = super(FileField, self).to_internal_value(data)
        if self.max_size and data.size > self.max_size:
            self.fail('max_size')
        return data


class ImageField(FileField):
    default_error_messages = {
        'invalid_image': _(
            'Upload a valid image. The file you uploaded was either not an '
            'image or a corrupted image.'
        ),
    }

    def __init__(self, *args, **kwargs):
        self._DjangoImageField = kwargs.pop('_DjangoImageField', DjangoImageField)
        super(ImageField, self).__init__(*args, **kwargs)

    def to_internal_value(self, data):
        # Image validation is a bit grungy, so we'll just outright
        # defer to Django's implementation so we don't need to
        # consider it, or treat PIL as a test dependency.
        file_object = super(ImageField, self).to_internal_value(data)
        django_field = self._DjangoImageField()
        django_field.error_messages = self.error_messages
        django_field.to_python(file_object)
        return file_object