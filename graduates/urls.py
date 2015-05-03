from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from apps.home.views import HomePageView, FaqView, FeedbackView
from apps.accounts.views import LoginView, RegistrationWizard, ActivationView, ClaimView, UserIntroduceView, \
    PasswordChangeView

js_info_dict = {
    'packages': ('apps.community',)
}

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'graduates.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^$', HomePageView.as_view(), name='home'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^login/$', LoginView.as_view(), name='login'),
    url(r'^password/change/$', PasswordChangeView.as_view(), name='password-change'),
    url(r'^introduce/$', UserIntroduceView.as_view(), name='introduce'),
    url(r'^logout/$', 'django.contrib.auth.views.logout', {'next_page': '/'}, name='logout'),
    url(r'^register/$', RegistrationWizard.as_view(), name='registration'),
    url(r'^faq/$', FaqView.as_view(), name='faq'),
    url(r'^activate/(?P<activation_key>\w+)/$',
                           ActivationView.as_view(),
                           name='registration_activate'),
    url(r'^claim/$', ClaimView.as_view(), name='claim'),
    url(r'^community/', include('apps.community.urls')),
    url(r'^stream/', include('apps.posts.urls')),
    url(r'^feedback/$', FeedbackView.as_view(), name='feedback'),
    url(r'^jsi18n/$', 'django.views.i18n.javascript_catalog', js_info_dict),
    url(r'', include('django.contrib.auth.urls')),
) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


if settings.DEBUG:
    import debug_toolbar
    urlpatterns += patterns('',
        url(r'^__debug__/', include(debug_toolbar.urls)),
    )
