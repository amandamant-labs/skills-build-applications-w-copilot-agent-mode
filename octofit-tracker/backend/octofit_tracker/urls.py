"""octofit_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.http import HttpResponse, HttpResponseRedirect
import os


def redirect_api_to_codespace(request, subpath=''):
    """Redirect /api/... to the Codespace preview domain if available.

    Falls back to the current host if CODESPACE_NAME is not set.
    """
    codespace = os.environ.get('CODESPACE_NAME')
    if codespace:
        target = f"https://{codespace}-8000.app.github.dev/api/{subpath}"
    else:
        target = request.build_absolute_uri(f"/api/{subpath}")
    # Ensure trailing slash
    if not target.endswith('/'):
        target += '/'
    return HttpResponseRedirect(target)


def home(request):
    return HttpResponse("<h1>OctoFit Tracker API</h1><p>Backend is running.</p>")


urlpatterns = [
    # Redirect any API requests to the Codespace preview domain when available
    path('', home),
    path('api/', redirect_api_to_codespace),
    path('api/<path:subpath>/', redirect_api_to_codespace),
    path('admin/', admin.site.urls),
]
