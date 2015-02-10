from django.test import SimpleTestCase


def setup_view(view, request, *args, **kwargs):
    """Mimic as_view() returned callable, but returns view instance.

    args and kwargs are the same you would pass to ``reverse()``

    """
    view.request = request
    view.args = args
    view.kwargs = kwargs
    return view


class ClaimViewTests(SimpleTestCase):

    def test_context_data(self):
        """

        :return:
        """
        pass