"""

DataBase Model:

This is the file where the DataBase Model is stored.
Please use the command after the update to update the database:
-> python manage.py make migrations
-> python manage.py make migrate


"""
from django.db import models


# unique = True ,Give a unique index to email, greatly improve the efficiency of mysql query
# db_index=True Give an index to name, greatly improve the efficiency of mysql query


class Graduate(models.Model):
    """

    Graduate Table:

    This table stores the basic information about the Graduate,
    And the Token inside is used to reset the password.

    """

    # grad_id = models.BigAutoField(verbose_name="grad_id ",
    #                               primary_key=True)

    email = models.CharField(verbose_name="Graduate's email", max_length=100,
                             null=False,
                             unique=True,
                             )

    # One to Many Link to team

    team_id = models.ForeignKey(to="Team", on_delete=models.CASCADE,
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

    year = models.IntegerField(default=1)

    token = models.CharField(verbose_name="Password", max_length=64,
                             null=True)


class Manager(models.Model):
    """

        Manager Table:

        This table stores the basic information about the Manager,
        And the Token inside is used to reset the password.

    """

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

    token = models.CharField(verbose_name="Password", max_length=64,
                             null=True)


class Department(models.Model):
    """

    Department Table:

    This table stores the basic information about the Department.

    """
    # depart_id = models.BigAutoField(verbose_name="department's id ",
    #                                 primary_key=True)

    depart_name = models.CharField(verbose_name="department's name", max_length=100,
                                   null=False,
                                   db_index=True)

    num_employ = models.PositiveIntegerField(verbose_name="Number of employ", default=0,
                                             null=True)


class HR(models.Model):
    """

    HR Table:

    This table stores the basic information about the Department.
    And the Token inside is used to reset the password.

    """

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

    token = models.CharField(verbose_name="Password", max_length=64,
                             null=True)


class Form(models.Model):
    """

    Form Table:

    This form mainly stores the information of the form filled by the Graduate,
    which records the skills selected by the Graduate,
    the degree of familiarity and interest in the skills.

    """

    # form_id = models.BigAutoField(verbose_name="department's id ",
    #                               primary_key=True)

    # Ten positions are preset and inserted if the user selects more

    interest = models.IntegerField(verbose_name="Interest_One", null=True)

    experience = models.IntegerField(verbose_name="experience_One", null=True)
    skill_id = models.ForeignKey(to="Skill", related_name='Skill',
                                 on_delete=models.CASCADE, null=True)
    graduate = models.ForeignKey(to="Graduate", on_delete=models.CASCADE, null=True)


class Team(models.Model):
    """

    Team Table:

    This table stores information about the Team, as well as the Team Settings.

    """
    # team_id = models.BigAutoField(verbose_name="team's id ",
    #                               primary_key=True)

    team_name = models.CharField(verbose_name="Team's name", max_length=100,
                                 null=False,
                                 unique=True,
                                 )

    # One to One Link to Manger

    man_id = models.OneToOneField(to="Manager", on_delete=models.CASCADE, null=True)

    # One to Many Link to Departments
    depart_id = models.ForeignKey(to="Department", on_delete=models.CASCADE, null=True)

    ratio = models.FloatField(verbose_name="Ratio",
                              null=True, default=0.5)

    skill = models.ManyToManyField(to="Skill")

    num_positions = models.IntegerField(default=10)


class Skill(models.Model):
    """

    Skill Table:

    This table stores all the skill information.

    """

    skill_name = models.CharField(verbose_name="skills_name", max_length=100,
                                  null=False,
                                  unique=True,
                                  )


class Registration(models.Model):
    """

        Registration Table:

        This form is used to store information about who is preparing to signup.
        If the account is not registered, the registration statu is 0.

    """

    email = models.CharField(verbose_name="User's email", max_length=100,
                             null=False,
                             unique=True,
                             )

    registration_status = models.IntegerField(verbose_name="registration_status", default=0)

    role = models.IntegerField(verbose_name="Roles")

    token = models.CharField(verbose_name="Token", max_length=64, )
