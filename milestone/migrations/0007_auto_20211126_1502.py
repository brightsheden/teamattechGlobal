# Generated by Django 3.1.2 on 2021-11-26 23:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('milestone', '0006_promotion_is_expired'),
    ]

    operations = [
        migrations.AlterField(
            model_name='promotion',
            name='content',
            field=models.TextField(blank=True, null=True),
        ),
    ]
