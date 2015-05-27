# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('documents', '0002_document_git_path'),
    ]

    operations = [
        migrations.RenameField(
            model_name='document',
            old_name='git_path',
            new_name='git_url',
        ),
    ]
