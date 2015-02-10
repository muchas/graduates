import mock
from django.core.urlresolvers import reverse
from django.test import TestCase
from templatetags.navigation import current, current_url_equals


class CurrentTagTest(TestCase):
    def setUp(self):
        self.request = mock.Mock
        self.url_name = 'login'
        self.request.path = reverse(self.url_name)

    def test_returns_value_when_resolved_path_equals_current_path(self):
        return_value = ' active'
        returned_value = current({'request': self.request}, self.url_name)
        self.assertEquals(return_value, returned_value)

        return_value = 'test'
        returned_value = current({'request': self.request},
                                 self.url_name, return_value)
        self.assertEquals(return_value, returned_value)

    def test_returns_empty_string_when_resolved_path_not_equals_current_path(self):
        return_value = ''
        returned_value = current({'request': self.request}, 'not_login')
        self.assertEquals(return_value, returned_value)

    def test_returns_empty_string_when_current_path_is_not_resolved(self):
        return_value = ''
        request = mock.Mock
        request.path = '/invalid-!@#-path'
        returned_value = current({'request': request}, 'test')
        self.assertEquals(return_value, returned_value)


class CurrentUrlEqualsHelperTest(TestCase):
    def setUp(self):
        self.request = mock.Mock
        self.url_name = 'login'
        self.request.path = reverse(self.url_name)
        self.context = {'request': self.request}

    def test_returns_true_when_resolved_path_equals_current_path(self):
        matches = current_url_equals(self.context, self.url_name)
        self.assertTrue(matches)

    @mock.patch('django.core.urlresolvers.resolve')
    def test_returns_true_when_kwargs_matched(self, mocked_resolve):
        url_name = 'test_url'
        page_slug = 'test_slug'
        mocked_resolve.url_name = url_name
        mocked_resolve.kwargs = {
            'page_slug': page_slug,
        }
        mocked_resolve.return_value = mocked_resolve
        matches = current_url_equals(self.context, url_name,
                                     page_slug=page_slug)
        path = self.context.get('request').path
        mocked_resolve.assert_called_once_with(path)
        self.assertTrue(matches)

    def test_returns_false_when_resolved_path_not_current_path(self):
        url_name = 'not_login'
        matches = current_url_equals(self.context, url_name)
        self.assertFalse(matches)

    def test_returns_false_when_current_path_not_resolved(self):
        self.request.path = '/invalid-!@#-path'
        url_name = 'test'
        matches = current_url_equals(self.context, url_name)
        self.assertFalse(matches)

    def test_returns_false_when_context_invalid(self):
        context = mock.Mock
        url_name = self.url_name
        matches = current_url_equals(context, url_name)
        self.assertFalse(matches)

    @mock.patch('django.core.urlresolvers.resolve')
    def test_returns_false_when_kwargs_unmatched(self, mocked_resolve):
        url_name = 'test_url'
        page_slug = 'test_slug'
        mocked_resolve.url_name = url_name
        mocked_resolve.kwargs = {
            'page_slug': 'slug_test',
        }
        mocked_resolve.return_value = mocked_resolve
        matches = current_url_equals(self.context, url_name,
                                     page_slug=page_slug)
        path = self.context.get('request').path
        mocked_resolve.assert_called_once_with(path)
        self.assertFalse(matches)

    @mock.patch('django.core.urlresolvers.resolve')
    def test_returns_false_when_resolve_kwargs_unmatched(self,
                                                         mocked_resolve):
        url_name = 'test_url'
        page_slug = 'test_slug'
        mocked_resolve.url_name = url_name
        mocked_resolve.kwargs = {
            'page_slug': 'slug_test',
        }
        mocked_resolve.return_value = mocked_resolve
        matches = current_url_equals(self.context, url_name,
                                     page_slug=page_slug,
                                     other_kwarg='test')
        path = self.context.get('request').path
        mocked_resolve.assert_called_once_with(path)
        self.assertFalse(matches)
