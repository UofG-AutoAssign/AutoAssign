# Generated by Django 4.1 on 2023-03-06 08:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("Assign", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Registration",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "email",
                    models.CharField(
                        max_length=100, unique=True, verbose_name="User's email"
                    ),
                ),
                (
                    "registration_status",
                    models.IntegerField(default=0, verbose_name="registration_status"),
                ),
                ("role", models.IntegerField(verbose_name="Roles")),
                ("token", models.CharField(max_length=64, verbose_name="Token")),
            ],
        ),
        migrations.AddField(
            model_name="graduate",
            name="token",
            field=models.CharField(max_length=64, null=True, verbose_name="Password"),
        ),
        migrations.AddField(
            model_name="hr",
            name="token",
            field=models.CharField(max_length=64, null=True, verbose_name="Password"),
        ),
        migrations.AddField(
            model_name="manager",
            name="token",
            field=models.CharField(max_length=64, null=True, verbose_name="Password"),
        ),
    ]