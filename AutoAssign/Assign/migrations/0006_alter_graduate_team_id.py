# Generated by Django 4.1 on 2023-03-15 16:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("Assign", "0005_remove_team_team_profile"),
    ]

    operations = [
        migrations.AlterField(
            model_name="graduate",
            name="team_id",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="Assign.team",
            ),
        ),
    ]
