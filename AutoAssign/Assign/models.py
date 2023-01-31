from django.db import models


# Create your models here.

# unique = True ,Give a unique index to email, greatly improve the efficiency of mysql query
# db_index=True Give an index to name, greatly improve the efficiency of mysql query

class Graduate(models.Model):
    # grad_id = models.BigAutoField(verbose_name="grad_id ",
    #                               primary_key=True)

    email = models.CharField(verbose_name="Graduate's email", max_length=100,
                             null=False,
                             unique=True,
                             )

    # One to Many Link to Manger

    man_id = models.ForeignKey(to="Manager", on_delete=models.CASCADE,
                               null=True,
                               )

    # One to Many Link to team

    team_id = models.ForeignKey(to="Team", on_delete=models.CASCADE,
                                null=True,
                                )

    # One to Many Link to Departments
    # If we delete a department ,The department id for Graduate will be set to NULL

    depart_id = models.ForeignKey(to="Department", on_delete=models.CASCADE,
                                  null=True,
                                  )

    first_name = models.CharField(verbose_name="first name", max_length=30,
                                  null=False)
    second_name = models.CharField(verbose_name="second name", max_length=30,
                                   null=False)

    # password
    password = models.CharField(verbose_name="Password", max_length=64,
                                null=False)

    role = models.IntegerField(verbose_name="Roles", default=1)

    # Many to Many link to the Form
    Form = models.ManyToManyField(to="Form")


class Manager(models.Model):
    # man_id = models.BigAutoField(verbose_name="man_id ",
    #                              primary_key=True)

    email = models.CharField(verbose_name="manger's email", max_length=100,
                             null=False,
                             unique=True,
                             )

    first_name = models.CharField(verbose_name="first name", max_length=30,
                                  null=False)

    second_name = models.CharField(verbose_name="second name", max_length=30,
                                   null=False)

    # password
    password = models.CharField(verbose_name="Password", max_length=64,
                                null=False)

    role = models.IntegerField(verbose_name="Roles", default=2)


class Department(models.Model):
    # depart_id = models.BigAutoField(verbose_name="department's id ",
    #                                 primary_key=True)

    depart_name = models.CharField(verbose_name="department's name", max_length=100,
                                   null=False,
                                   db_index=True)

    num_employ = models.PositiveIntegerField(verbose_name="Number of employ", default=0,
                                             null=True)


class HR(models.Model):
    # hr_id = models.BigAutoField(primary_key=True)

    email = models.CharField(verbose_name="Hr's email", max_length=100,
                             null=False,
                             unique=True,
                             )

    first_name = models.CharField(verbose_name="first_name", max_length=30,
                                  null=False)

    second_name = models.CharField(verbose_name="second_name", max_length=30,
                                   null=False)

    # password
    password = models.CharField(verbose_name="Password", max_length=64,
                                null=False)

    role = models.IntegerField(verbose_name="Roles", default=3)


class Form(models.Model):
    # form_id = models.BigAutoField(verbose_name="department's id ",
    #                               primary_key=True)

    # Ten positions are preset and inserted if the user selects more

    interest = models.IntegerField(verbose_name="Interest_One", null=True)

    experience = models.IntegerField(verbose_name="experience_One", null=True)
    Skill_id = models.ForeignKey(to="Skill", related_name='Skill', on_delete=models.CASCADE, null=True)


class Team(models.Model):
    # team_id = models.BigAutoField(verbose_name="team's id ",
    #                               primary_key=True)

    team_name = models.CharField(verbose_name="Team's name", max_length=100,
                                 null=False,
                                 unique=True,
                                 )

    team_profile = models.JSONField(verbose_name="team's profile ",
                                    null=True)

    # One to Many Link to Manger

    man_id = models.ForeignKey(to="Manager", on_delete=models.CASCADE, null=True)

    # One to Many Link to Departments
    depart_id = models.ForeignKey(to="Department", on_delete=models.CASCADE, null=True)

    ratio = models.FloatField(verbose_name="Ratio",
                              null=True)

    Skill = models.ManyToManyField(to="Skill")


class Skill(models.Model):
    skill_name = models.CharField(verbose_name="skills_name", max_length=100,
                                  null=False,
                                  unique=True,
                                  )
