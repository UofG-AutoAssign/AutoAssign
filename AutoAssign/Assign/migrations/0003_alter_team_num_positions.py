# Generated by Django 4.1 on 2023-03-13 16:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("Assign", "0002_registration_graduate_token_hr_token_manager_token"),
    ]

    operations = [
        migrations.AlterField(
            model_name="team",
            name="num_positions",
            field=models.IntegerField(default=10),
        ),
    ]