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
        # Ensure the my_model object has been created in the cache database
        self.assertEqual(models.HR.objects.count(), 1)
        self.assertEqual(models.HR.objects.get().email, "Hr@email.com")


class ManagerTestCase(TestCase):

    def setUp(self):
        models.Manager.objects.create(email='Manager@email.com',
                                      first_name='Manager', second_name='Test',
                                      password='123456', role='2')

    def test_my_model(self):
        # Ensure the my_model object has been created in the cache database
        self.assertEqual(models.Manager.objects.count(), 1)
        self.assertEqual(models.Manager.objects.get().email, "Manager@email.com")
