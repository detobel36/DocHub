# -*- coding: utf-8 -*-
from __future__ import unicode_literals

# Copyright 2014, Cercle Informatique ASBL. All rights reserved.
#
# This program is free software: you can redistribute it and/or modify it
# under the terms of the GNU Affero General Public License as published by
# the Free Software Foundation, either version 3 of the License, or (at
# your option) any later version.
#
# This software was made by hast, C4, ititou at UrLab, ULB's hackerspace

import os
from PIL import Image, ImageOps
from base64 import b64decode


from django.core.urlresolvers import reverse
from django.shortcuts import get_object_or_404, render
from django.contrib.auth.decorators import login_required
from django.core.cache.utils import make_template_fragment_key
from django.core.cache import cache
from django.contrib import messages
from django.http import HttpResponseRedirect, HttpResponseForbidden
from django.contrib.auth import authenticate, login

from polydag.models import Node
from graph.models import Course
from www import settings

from forms import SettingsForm
from django_statsd.clients import statsd


def empty_user_followed_list_cache(user):
    cache.delete(make_template_fragment_key('user_followed_list', [user.netid]))


@login_required
def follow_node(request, nodeid):
    node = get_object_or_404(Node, pk=nodeid)
    request.user.follow.add(node)
    empty_user_followed_list_cache(request.user)

    statsd.incr('user.follow.follow')
    return HttpResponseRedirect(reverse('node_canonic', args=[nodeid]))


@login_required
def follow_node_children(request, nodeid):
    node = get_object_or_404(Node, pk=nodeid)
    for child in node.children(only=[Course]):
        statsd.incr('user.follow.follow')
        request.user.follow.add(child)
    empty_user_followed_list_cache(request.user)
    return HttpResponseRedirect(reverse('node_canonic', args=[nodeid]))


@login_required
def unfollow_node(request, nodeid):
    node = get_object_or_404(Node, pk=nodeid)
    request.user.follow.remove(node)
    empty_user_followed_list_cache(request.user)

    statsd.incr('user.follow.unfollow')
    return HttpResponseRedirect(reverse('node_canonic', args=[nodeid]))


@login_required
def user_settings(request):
    if request.method == 'POST':
        form = SettingsForm(request.POST, request.FILES)

        if form.is_valid():
            im = Image.open(request.FILES['profile_pic'])
            im = ImageOps.fit(im, (120, 120), Image.ANTIALIAS)

            if not os.path.exists(os.path.join(settings.MEDIA_ROOT, "profile")):
                os.makedirs(os.path.join(settings.MEDIA_ROOT, "profile"))

            im.save(os.path.join(settings.MEDIA_ROOT, "profile/{}.png".format(request.user.netid)))
            request.user.photo = "png"
            request.user.save()

            messages.success(request, 'Votre profil a été mis à jour.')
            statsd.incr('user.update_profile')

            return render(request, "settings.html", {'form': SettingsForm()})
    else:
        form = SettingsForm()

    return render(request, 'users/settings.html', {
        'form': form,
    })


@login_required
def panel_hide(request):
    request.user.welcome = False
    request.user.save()

    statsd.incr('user.panel_hide')

    return HttpResponseRedirect(reverse('index'))


def auth(request):
    sid, uid = request.GET.get("_sid", False), request.GET.get("_uid", False)
    next_url = request.GET.get("next", "")
    if next_url != "":
        next_url = b64decode(next_url)
    else:
        next_url = "/"

    if sid and uid:
        user = authenticate(sid=sid, uid=uid)
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(next_url)

    statsd.incr('user.view.auth_fail')
    HttpResponseForbidden()
