# crud/urls.py

from django.contrib import admin
from django.urls import path, include
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),  # Prefixes all API endpoints with /api/
]

urlpatterns += staticfiles_urlpatterns()
