import json
from rest_framework import status
from rest_framework.test import APIClient
from Assign import models
from rest_framework.test import APITestCase
from django.test import TestCase


class ManagerModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        models.Manager.objects.create(
            email="test@example.com",
            first_name="John",
            second_name="Doe",
            password="password",
            role=2,
            token="token"
        )

    def test_email_label(self):
        manager = models.Manager.objects.get(id=1)
        field_label = manager._meta.get_field('email').verbose_name
        self.assertEquals(field_label, "manger's email")

    def test_first_name_label(self):
        manager = models.Manager.objects.get(id=1)
        field_label = manager._meta.get_field('first_name').verbose_name
        self.assertEquals(field_label, "first name")

    def test_second_name_label(self):
        manager = models.Manager.objects.get(id=1)
        field_label = manager._meta.get_field('second_name').verbose_name
        self.assertEquals(field_label, "second name")

    def test_password_label(self):
        manager = models.Manager.objects.get(id=1)
        field_label = manager._meta.get_field('password').verbose_name
        self.assertEquals(field_label, "Password")

    def test_role_label(self):
        manager = models.Manager.objects.get(id=1)
        field_label = manager._meta.get_field('role').verbose_name
        self.assertEquals(field_label, "Roles")

    def test_email_max_length(self):
        manager = models.Manager.objects.get(id=1)
        max_length = manager._meta.get_field('email').max_length
        self.assertEquals(max_length, 100)

    def test_first_name_max_length(self):
        manager = models.Manager.objects.get(id=1)
        max_length = manager._meta.get_field('first_name').max_length
        self.assertEquals(max_length, 30)

    def test_second_name_max_length(self):
        manager = models.Manager.objects.get(id=1)
        max_length = manager._meta.get_field('second_name').max_length
        self.assertEquals(max_length, 30)

    def test_password_max_length(self):
        manager = models.Manager.objects.get(id=1)
        max_length = manager._meta.get_field('password').max_length
        self.assertEquals(max_length, 64)

    def test_email_unique(self):
        manager = models.Manager(email="test@example.com", first_name="Jane", second_name="Doe", password="password",
                                 role=2)
        with self.assertRaises(Exception):
            manager.save()

    def test_token_null(self):
        manager = models.Manager(email="test2@example.com", first_name="Jane", second_name="Doe", password="password",
                                 role=2)
        self.assertIsNone(manager.token)


class GraduateModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        models.Team.objects.create(team_name="Test Team")
        models.Graduate.objects.create(
            email="test@example.com",
            team_id=models.Team.objects.get(id=1),
            first_name="John",
            second_name="Doe",
            password="password",
            role=1,
            year=1,
            token="token"
        )

    def test_email_label(self):
        graduate = models.Graduate.objects.get(id=1)
        field_label = graduate._meta.get_field('email').verbose_name
        self.assertEquals(field_label, "Graduate's email")

    def test_first_name_label(self):
        graduate = models.Graduate.objects.get(id=1)
        field_label = graduate._meta.get_field('first_name').verbose_name
        self.assertEquals(field_label, "first name")

    def test_second_name_label(self):
        graduate = models.Graduate.objects.get(id=1)
        field_label = graduate._meta.get_field('second_name').verbose_name
        self.assertEquals(field_label, "second name")

    def test_password_label(self):
        graduate = models.Graduate.objects.get(id=1)
        field_label = graduate._meta.get_field('password').verbose_name
        self.assertEquals(field_label, "Password")

    def test_role_label(self):
        graduate = models.Graduate.objects.get(id=1)
        field_label = graduate._meta.get_field('role').verbose_name
        self.assertEquals(field_label, "Roles")

    def test_year_label(self):
        graduate = models.Graduate.objects.get(id=1)
        field_label = graduate._meta.get_field('year').verbose_name
        self.assertEquals(field_label, "year")

    def test_email_max_length(self):
        graduate = models.Graduate.objects.get(id=1)
        max_length = graduate._meta.get_field('email').max_length
        self.assertEquals(max_length, 100)

    def test_first_name_max_length(self):
        graduate = models.Graduate.objects.get(id=1)
        max_length = graduate._meta.get_field('first_name').max_length
        self.assertEquals(max_length, 30)

    def test_second_name_max_length(self):
        graduate = models.Graduate.objects.get(id=1)
        max_length = graduate._meta.get_field('second_name').max_length
        self.assertEquals(max_length, 30)

    def test_password_max_length(self):
        graduate = models.Graduate.objects.get(id=1)
        max_length = graduate._meta.get_field('password').max_length
        self.assertEquals(max_length, 64)

    def test_email_unique(self):
        graduate = models.Graduate(email="test@example.com", team_id=models.Team.objects.get(id=1), first_name="Jane",
                                   second_name="Doe", password="password", role=1, year=1)
        with self.assertRaises(Exception):
            graduate.save()

    def test_team_foreign_key(self):
        graduate = models.Graduate.objects.get(id=1)
        team_id = graduate._meta.get_field('team_id').remote_field.model
        self.assertEquals(team_id, models.Team)

    def test_token_null(self):
        graduate = models.Graduate(email="test2@example.com", team_id=models.Team.objects.get(id=1), first_name="Jane",
                                   second_name="Doe", password="password", role=1, year=1)
        self.assertIsNone(graduate.token)


class DepartmentModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        models.Department.objects.create(
            depart_name="Test Department",
            num_employ=10
        )

    def test_depart_name_label(self):
        department = models.Department.objects.get(id=1)
        field_label = department._meta.get_field('depart_name').verbose_name
        self.assertEquals(field_label, "department's name")

    def test_num_employ_label(self):
        department = models.Department.objects.get(id=1)
        field_label = department._meta.get_field('num_employ').verbose_name
        self.assertEquals(field_label, "Number of employ")

    def test_depart_name_max_length(self):
        department = models.Department.objects.get(id=1)
        max_length = department._meta.get_field('depart_name').max_length
        self.assertEquals(max_length, 100)

    def test_num_employ_default(self):
        department = models.Department.objects.get(id=1)
        num_employ = department._meta.get_field('num_employ').default
        self.assertEquals(num_employ, 0)

    def test_depart_name_db_index(self):
        department = models.Department.objects.get(id=1)
        db_index = department._meta.get_field('depart_name').db_index
        self.assertTrue(db_index)


class HRModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        models.HR.objects.create(
            email="test@example.com",
            first_name="John",
            second_name="Doe",
            password="password",
            role=3,
            token="token"
        )

    def test_email_label(self):
        hr = models.HR.objects.get(id=1)
        field_label = hr._meta.get_field('email').verbose_name
        self.assertEquals(field_label, "Hr's email")

    def test_first_name_label(self):
        hr = models.HR.objects.get(id=1)
        field_label = hr._meta.get_field('first_name').verbose_name
        self.assertEquals(field_label, "first_name")

    def test_second_name_label(self):
        hr = models.HR.objects.get(id=1)
        field_label = hr._meta.get_field('second_name').verbose_name
        self.assertEquals(field_label, "second_name")

    def test_password_label(self):
        hr = models.HR.objects.get(id=1)
        field_label = hr._meta.get_field('password').verbose_name
        self.assertEquals(field_label, "Password")

    def test_role_label(self):
        hr = models.HR.objects.get(id=1)
        field_label = hr._meta.get_field('role').verbose_name
        self.assertEquals(field_label, "Roles")

    def test_email_max_length(self):
        hr = models.HR.objects.get(id=1)
        max_length = hr._meta.get_field('email').max_length
        self.assertEquals(max_length, 100)

    def test_first_name_max_length(self):
        hr = models.HR.objects.get(id=1)
        max_length = hr._meta.get_field('first_name').max_length
        self.assertEquals(max_length, 30)

    def test_second_name_max_length(self):
        hr = models.HR.objects.get(id=1)
        max_length = hr._meta.get_field('second_name').max_length
        self.assertEquals(max_length, 30)

    def test_password_max_length(self):
        hr = models.HR.objects.get(id=1)
        max_length = hr._meta.get_field('password').max_length
        self.assertEquals(max_length, 64)

    def test_email_unique(self):
        hr = models.HR(email="test@example.com", first_name="Jane", second_name="Doe", password="password", role=3)
        with self.assertRaises(Exception):
            hr.save()

    def test_token_null(self):
        hr = models.HR(email="test2@example.com", first_name="Jane", second_name="Doe", password="password", role=3)
        self.assertIsNone(hr.token)


class FormModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        skill = models.Skill.objects.create(
            skill_name="Test Skill"
        )
        graduate = models.Graduate.objects.create(
            email="test@example.com",
            first_name="John",
            second_name="Doe",
            password="password",
            role=1,
            year=1
        )
        form = models.Form.objects.create(
            interest=5,
            experience=3,
            skill_id=skill,
            graduate=graduate
        )

    def test_interest_label(self):
        form = models.Form.objects.get(id=1)
        field_label = form._meta.get_field('interest').verbose_name
        self.assertEquals(field_label, "Interest_One")

    def test_experience_label(self):
        form = models.Form.objects.get(id=1)
        field_label = form._meta.get_field('experience').verbose_name
        self.assertEquals(field_label, "experience_One")

    def test_skill_id_label(self):
        form = models.Form.objects.get(id=1)
        field_label = form._meta.get_field('skill_id').verbose_name
        self.assertEquals(field_label, "skill id")

    def test_graduate_label(self):
        form = models.Form.objects.get(id=1)
        field_label = form._meta.get_field('graduate').verbose_name
        self.assertEquals(field_label, "graduate")

    def test_skill_id_foreign_key(self):
        form = models.Form.objects.get(id=1)
        skill_id = form._meta.get_field('skill_id').remote_field.model
        self.assertEquals(skill_id, models.Skill)

    def test_graduate_foreign_key(self):
        form = models.Form.objects.get(id=1)
        graduate = form._meta.get_field('graduate').remote_field.model
        self.assertEquals(graduate, models.Graduate)


class TeamModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        manager = models.Manager.objects.create(
            email="manager@example.com",
            first_name="John",
            second_name="Doe",
            password="password",
            role=2
        )
        department = models.Department.objects.create(
            depart_name="Test Department",
            num_employ=10
        )
        skill = models.Skill.objects.create(
            skill_name="Test Skill"
        )
        team = models.Team.objects.create(
            team_name="Test Team",
            man_id=manager,
            depart_id=department,
            ratio=0.5,
            num_positions=5
        )
        team.skill.add(skill)

    def test_team_name_label(self):
        team = models.Team.objects.get(id=1)
        field_label = team._meta.get_field('team_name').verbose_name
        self.assertEquals(field_label, "Team's name")

    def test_team_name_unique(self):
        with self.assertRaises(Exception):
            team = models.Team.objects.create(
                team_name="Test Team",
                man_id=models.Manager.objects.create(
                    email="manager2@example.com",
                    first_name="Jane",
                    second_name="Doe",
                    password="password",
                    role=2
                ),
                depart_id=models.Department.objects.create(
                    depart_name="Test Department 2",
                    num_employ=10
                ),
                ratio=0.5,
                num_positions=5
            )

    def test_team_manager_one_to_one(self):
        team = models.Team.objects.get(id=1)
        manager = team._meta.get_field('man_id').remote_field.model
        self.assertEquals(manager, models.Manager)

    def test_team_depart_one_to_many(self):
        team = models.Team.objects.get(id=1)
        department = team._meta.get_field('depart_id').remote_field.model
        self.assertEquals(department, models.Department)

    def test_team_skill_many_to_many(self):
        team = models.Team.objects.get(id=1)
        skill = team._meta.get_field('skill').remote_field.model
        self.assertEquals(skill, models.Skill)

class RegistrationModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        models.Registration.objects.create(
            email="test@example.com",
            registration_status=0,
            role=1,
            token="test_token"
        )

    def test_email_label(self):
        registration = models.Registration.objects.get(id=1)
        field_label = registration._meta.get_field('email').verbose_name
        self.assertEquals(field_label, "User's email")

    def test_registration_status_label(self):
        registration = models.Registration.objects.get(id=1)
        field_label = registration._meta.get_field('registration_status').verbose_name
        self.assertEquals(field_label, "registration_status")

    def test_registration_status_default(self):
        registration = models.Registration.objects.create(
            email="test2@example.com",
            role=1,
            token="test_token"
        )
        self.assertEquals(registration.registration_status, 0)

    def test_role_label(self):
        registration = models.Registration.objects.get(id=1)
        field_label = registration._meta.get_field('role').verbose_name
        self.assertEquals(field_label, "Roles")

    def test_token_label(self):
        registration = models.Registration.objects.get(id=1)
        field_label = registration._meta.get_field('token').verbose_name
        self.assertEquals(field_label, "Token")
