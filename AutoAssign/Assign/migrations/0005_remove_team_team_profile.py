# Generated by Django 4.1 on 2023-03-14 22:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("Assign", "0004_alter_team_ratio"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="team",
            name="team_profile",
        ),
    ]