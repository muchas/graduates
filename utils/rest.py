from django.core.cache import get_cache
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.settings import api_settings


class CacheModelMixin(object):

    cache_backend = 'default'

    def get_object_key(self):
        # Perform the lookup filtering.
        lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field

        assert lookup_url_kwarg in self.kwargs, (
            'Expected view %s to be called with a URL keyword argument '
            'named "%s". Fix your URL conf, or set the `.lookup_field` '
            'attribute on the view correctly.' %
            (self.__class__.__name__, lookup_url_kwarg)
        )

        identifier = str(self.kwargs[lookup_url_kwarg])

        return self.get_serializer_class().__name__ + identifier

    def get_cached_data(self):
        """
        This function does not check object-level permissions
        """
        cache = get_cache(self.cache_backend)
        return cache.get(self.get_object_key())

    def perform_cache(self, data):
        cache = get_cache(self.cache_backend)
        cache.set(self.get_object_key(), dict(data))

    def clear_cache(self):
        cache = get_cache(self.cache_backend)
        cache.delete(self.get_object_key())


class RetrieveCachedModelMixin(CacheModelMixin):
    """
    Retrieve a model instance from cache
    """
    def retrieve(self, request, *args, **kwargs):
        data = self.get_cached_data()
        if not data:
            obj = self.get_object()
            serializer = self.get_serializer(obj)
            data = serializer.data
            self.perform_cache(data)
        return Response(data)


class CreateCachedModelMixin(CacheModelMixin):
    """
    """
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        self.perform_cache(serializer.data)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()

    def get_success_headers(self, data):
        try:
            return {'Location': data[api_settings.URL_FIELD_NAME]}
        except (TypeError, KeyError):
            return {}


class UpdateCachedModelMixin(CacheModelMixin):
    """
    """
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        self.perform_cache(serializer.data)
        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)


class DestroyModelMixin(CacheModelMixin):
    """
    Destroy a model instance.
    """
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        self.clear_cache()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()


class RetrieveCachedAPIView(RetrieveCachedModelMixin,
                            generics.GenericAPIView):
    """
    This view does not check object-level permissions in order to get
    quick access to data from cache.
    """
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
