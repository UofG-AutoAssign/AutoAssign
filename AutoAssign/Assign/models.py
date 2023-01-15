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

    # One to One Link to Graduate
    grad_id = models.ForeignKey(to="Graduate", on_delete=models.CASCADE)

    # Ten positions are preset and inserted if the user selects more

    Skill_One = models.ForeignKey(to="Skill", related_name='skill_One_id', on_delete=models.CASCADE, null=True)
    Skill_Two = models.ForeignKey(to="Skill", related_name='skill_Two_id', on_delete=models.CASCADE, null=True)
    Skill_Three = models.ForeignKey(to="Skill", related_name='skill_Three_id', on_delete=models.CASCADE, null=True)
    Skill_Four = models.ForeignKey(to="Skill", related_name='skill_Four_id', on_delete=models.CASCADE, null=True)
    Skill_Five = models.ForeignKey(to="Skill", related_name='skill_Five_id', on_delete=models.CASCADE, null=True)
    Skill_Six = models.ForeignKey(to="Skill", related_name='skill_Six_id', on_delete=models.CASCADE, null=True)
    Skill_Seven = models.ForeignKey(to="Skill", related_name='skill_Seven_id', on_delete=models.CASCADE, null=True)
    Skill_Eight = models.ForeignKey(to="Skill", related_name='skill_Eight_id', on_delete=models.CASCADE, null=True)
    Skill_Nine = models.ForeignKey(to="Skill", related_name='skill_Nine_id', on_delete=models.CASCADE, null=True)
    Skill_Ten = models.ForeignKey(to="Skill", related_name='skill_Ten_id', on_delete=models.CASCADE, null=True)

    interest_One = models.IntegerField(verbose_name="Interest_One", null=True)
    interest_Two = models.IntegerField(verbose_name="Interest_Two", null=True)
    interest_Three = models.IntegerField(verbose_name="Interest_Three", null=True)
    interest_Four = models.IntegerField(verbose_name="Interest_Four", null=True)
    interest_Five = models.IntegerField(verbose_name="Interest_Five", null=True)
    interest_Six = models.IntegerField(verbose_name="Interest_Six", null=True)
    interest_Seven = models.IntegerField(verbose_name="Interest_Seven", null=True)
    interest_Eight = models.IntegerField(verbose_name="Interest_Eight", null=True)
    interest_Nine = models.IntegerField(verbose_name="Interest_Nine", null=True)
    interest_Ten = models.IntegerField(verbose_name="Interest_Ten", null=True)

    experience_One = models.IntegerField(verbose_name="experience_One", null=True)
    experience_Two = models.IntegerField(verbose_name="experience_Two", null=True)
    experience_Three = models.IntegerField(verbose_name="experience_Three", null=True)
    experience_Four = models.IntegerField(verbose_name="experience_Four", null=True)
    experience_Five = models.IntegerField(verbose_name="experience_Five", null=True)
    experience_Six = models.IntegerField(verbose_name="experience_Six", null=True)
    experience_Seven = models.IntegerField(verbose_name="experience_Seven", null=True)
    experience_Eight = models.IntegerField(verbose_name="experience_Eight", null=True)
    experience_Nine = models.IntegerField(verbose_name="experience_Nine", null=True)
    experience_Ten = models.IntegerField(verbose_name="experience_Ten", null=True)


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

    man_id = models.ForeignKey(to="Manager", on_delete=models.CASCADE,null = True)

    # One to Many Link to Departments
    depart_id = models.ForeignKey(to="Department", on_delete=models.CASCADE, null=True)

    ratio = models.FloatField(verbose_name="Ratio",
                              null=True)

    Skill_One = models.ForeignKey(to="Skill", related_name='Skill_One_id', on_delete=models.CASCADE, null=True)
    Skill_Two = models.ForeignKey(to="Skill", related_name='Skill_Two_id', on_delete=models.CASCADE, null=True)
    Skill_Three = models.ForeignKey(to="Skill", related_name='Skill_Three_id', on_delete=models.CASCADE, null=True)
    Skill_Four = models.ForeignKey(to="Skill", related_name='Skill_Four_id', on_delete=models.CASCADE, null=True)
    Skill_Five = models.ForeignKey(to="Skill", related_name='Skill_Five_id', on_delete=models.CASCADE, null=True)


class Skill(models.Model):
    skill_name = models.CharField(verbose_name="skills_name", max_length=100,
                                  null=False,
                                  unique=True,
                                  )
