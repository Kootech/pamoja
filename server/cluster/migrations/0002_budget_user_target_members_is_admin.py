# Generated by Django 4.1.2 on 2022-11-06 09:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cluster', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='budget',
            name='user_target',
            field=models.DecimalField(decimal_places=2, max_digits=12, null=True),
        ),
        migrations.AddField(
            model_name='members',
            name='is_admin',
            field=models.BooleanField(default=False),
        ),
    ]
