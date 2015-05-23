# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('documents', '0005_add_documenterror'),
    ]

    operations = [
        migrations.AlterField(
            model_name='document',
            name='original',
            field=models.FileField(upload_to='original_document'),
        ),
        migrations.AlterField(
            model_name='document',
            name='pdf',
            field=models.FileField(upload_to='pdf_document'),
        ),
        migrations.AlterField(
            model_name='page',
            name='bitmap_120',
            field=models.ImageField(width_field='height_120', upload_to='page_120'),
        ),
        migrations.AlterField(
            model_name='page',
            name='bitmap_600',
            field=models.ImageField(width_field='height_600', upload_to='page_600'),
        ),
        migrations.AlterField(
            model_name='page',
            name='bitmap_900',
            field=models.ImageField(width_field='height_900', upload_to='page_900'),
        ),
    ]
