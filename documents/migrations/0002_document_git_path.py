# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('documents', '0001_squashed_0011'),
    ]

    operations = [
        migrations.AddField(
            model_name='document',
            name='git_path',
            field=models.CharField(default=None, max_length=512, null=True),
            preserve_default=True,
        ),
    ]
