import json
from rest_framework import status
from rest_framework.test import APIClient
from Assign import models
from rest_framework.test import APITestCase
from django.test import TestCase


class HrTestCase(TestCase):

    def setUp(self):
        models.HR.objects.create(email='Hr@email.com',
                                 first_name='Hr', second_name='Test',
                                 password='123456', role='3')

    def test_my_model(self):
        self.assertEqual(models.HR.objects.count(), 1)
        self.assertEqual(models.HR.objects.get().email, "Hr@email.com")


class ManagerTestCase(TestCase):

    def setUp(self):
        models.Manager.objects.create(email='Manager@email.com',
                                      first_name='Manager', second_name='Test',
                                      password='123456', role='2')

    def test_my_model(self):
        self.assertEqual(models.Manager.objects.count(), 1)
        self.assertEqual(models.Manager.objects.get().email, "Manager@email.com")


class Graduate(TestCase):

    def setUp(self):
        models.Graduate.objects.create(email='Graduate@email.com',
                                       first_name='Graduate', second_name='Test',
                                       password='123456', role='3')

    def test_my_model(self):
        self.assertEqual(models.Graduate.objects.count(), 1)
        self.assertEqual(models.Graduate.objects.get().email, "Graduate@email.com")


class Department(TestCase):

    def setUp(self):
        models.Department.objects.create(depart_name='Department')

    def test_my_model(self):
        self.assertEqual(models.Department.objects.count(), 1)
        self.assertEqual(models.Department.objects.get().depart_name, "Department")


class HR(TestCase):

    def setUp(self):
        models.HR.objects.create(email='HR@email.com',
                                 first_name='HR', second_name='Test',
                                 password='123456', role='1')

    def test_my_model(self):
        self.assertEqual(models.HR.objects.count(), 1)
        self.assertEqual(models.HR.objects.get().email, "HR@email.com")


class Form(TestCase):

    def setUp(self):
        Skill_obj = models.Skill.objects.create(skill_name="1")
        models.Form.objects.create(interest=1, experience=3, Skill_id=Skill_obj, )

    def test_my_model(self):
        self.assertEqual(models.Form.objects.count(), 1)
        self.assertEqual(models.Form.objects.get().interest, 1)


class Team(TestCase):

    def setUp(self):
        models.Skill.objects.create(skill_name="1")
        Team = models.Team.objects.create(team_name="test", ratio=0.5)

        Skill_obj = models.Skill.objects.all()

        Team.Skill.set(Skill_obj)

    def test_my_model(self):
        self.assertEqual(models.Form.objects.Team(), 1)
        self.assertEqual(models.Form.objects.get().team_name, "test")


class Skill(TestCase):

    def setUp(self):
        models.Skill.objects.create(skill_name="1")

    def test_my_model(self):
        self.assertEqual(models.Skill.objects.Team(), 1)
        self.assertEqual(models.Skill.objects.get().team_name, "1")
