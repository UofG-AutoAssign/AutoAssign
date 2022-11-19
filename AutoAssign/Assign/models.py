from django.db import models
import string
import random


# Create your models here.

# unique = True ,Give a unique index to email, greatly improve the efficiency of mysql query
# db_index=True Give an index to name, greatly improve the efficiency of mysql query


class Graduate(models.Model):
    # grad_id = models.BigAutoField(verbose_name="grad_id ",
    #                               primary_key=True)

    grad_email = models.CharField(verbose_name="Graduate's email", max_length=100,
                                  null=True,
                                  unique=True,
                                  )

    # One to Many Link to Manger

    man_id = models.ForeignKey(to="Manager", on_delete=models.CASCADE)

    # One to Many Link to team

    team_id = models.ForeignKey(to="Team", on_delete=models.CASCADE)

    # One to Many Link to Departments
    # If we delete a department ,The department id for Graduate will be set to NULL

    depart_id = models.ForeignKey(to="Department", on_delete=models.CASCADE)

    first_name = models.CharField(verbose_name="first name", max_length=30, null=True)
    second_name = models.CharField(verbose_name="second name", max_length=30, null=True)

    # password
    password = models.CharField(verbose_name="Password", max_length=64, )

    def __str__(self):
        return self.name

class Manager(models.Model):
    # man_id = models.BigAutoField(verbose_name="man_id ",
    #                              primary_key=True)

    man_email = models.CharField(verbose_name="manger's email", max_length=100,
                                 null=True,
                                 unique=True,
                                 )

    first_name = models.CharField(verbose_name="first name", max_length=30, null=True)
    second_name = models.CharField(verbose_name="second name", max_length=30, null=True)

    # password
    password = models.CharField(verbose_name="Password", max_length=64, null=True)


class Department(models.Model):
    # depart_id = models.BigAutoField(verbose_name="department's id ",
    #                                 primary_key=True)

    depart_name = models.CharField(verbose_name="department's name", max_length=100, null=True, db_index=True)
    num_employ = models.PositiveIntegerField(verbose_name="Number of employ", default=0, null=True)


class HR(models.Model):
    # hr_id = models.BigAutoField(primary_key=True)

    hr_email = models.CharField(verbose_name="Hr's email", max_length=100,
                                null=True,
                                unique=True,
                                )

    first_name = models.CharField(verbose_name="first_name", max_length=30,null=True)
    second_name = models.CharField(verbose_name="second_name", max_length=30, null=True)

    # password
    password = models.CharField(verbose_name="Password", max_length=64,null=True)


class Form(models.Model):
    # form_id = models.BigAutoField(verbose_name="department's id ",
    #                               primary_key=True)

    grad_email = models.CharField(verbose_name="grad_email", max_length=100,
                                  null=True,
                                  unique=True,
                                  )

    # One to One Link to User
    form_id = models.OneToOneField(to="Form", on_delete=models.CASCADE, unique=True)

    # Need to add something


class Team(models.Model):
    # team_id = models.BigAutoField(verbose_name="team's id ",
    #                               primary_key=True)

    team_name = models.IntegerField(verbose_name="team's id ", null=True, unique=True)
    team_profile = models.IntegerField(verbose_name="team's id ", null=True)

    # One to Many Link to Manger

    man_id = models.ForeignKey(to="Manager", on_delete=models.CASCADE)

    # One to Many Link to Departments
    depart_id = models.ForeignKey(to="Department", on_delete=models.CASCADE)

    # Need to add
