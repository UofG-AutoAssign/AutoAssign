# Generated by Django 4.1 on 2022-11-23 02:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("Assign", "0005_graduate_role_hr_role_manager_role"),
    ]

    operations = [
        migrations.AlterField(
            model_name="graduate",
            name="depart_id",
            field=models.ForeignKey(
                default=1,
                on_delete=django.db.models.deletion.CASCADE,
                to="Assign.department",
            ),
        ),
        migrations.AlterField(
            model_name="graduate",
            name="man_id",
            field=models.ForeignKey(
                default=1,
                on_delete=django.db.models.deletion.CASCADE,
                to="Assign.manager",
            ),
        ),
        migrations.AlterField(
            model_name="graduate",
            name="team_id",
            field=models.ForeignKey(
                default=1, on_delete=django.db.models.deletion.CASCADE, to="Assign.team"
            ),
        ),
    ]
