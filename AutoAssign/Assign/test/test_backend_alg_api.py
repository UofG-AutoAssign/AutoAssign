import json
from rest_framework import status
from rest_framework.test import APIClient
from Assign import models
from rest_framework.test import APITestCase
from collections import OrderedDict


class testAlgApi(APITestCase):

    def setUp(self):
        man = models.Manager.objects.create(email='Manager@email.com',
                                            first_name='Manager', second_name='Test',
                                            password='5fa5f62fe937033750ed096d66c866be', role='2')

        models.Manager.objects.create(email='Manager2@email.com',
                                      first_name='Manager', second_name='Test',
                                      password='5fa5f62fe937033750ed096d66c866be', role='2')

        dep_obj = models.Department.objects.create(depart_name='Department')

        team_obj = models.Team.objects.create(team_name='Team',
                                              man_id=man, ratio=0.5, depart_id=dep_obj)

        grad_obj = models.Graduate.objects.create(email='Graduate@email.com',
                                                  first_name='Graduate', second_name='Test',
                                                  password='5fa5f62fe937033750ed096d66c866be', role='1',
                                                  team_id=team_obj)

        models.Graduate.objects.create(email='Graduate2@email.com',
                                       first_name='Graduate', second_name='Test',
                                       password='5fa5f62fe937033750ed096d66c866be', role='1', year=2
                                       )

        models.HR.objects.create(email='Hr@email.com',
                                 first_name='Hr', second_name='Test',
                                 password='5fa5f62fe937033750ed096d66c866be', role='3')

        skill_a = models.Skill.objects.create(skill_name="A")

        skill_b = models.Skill.objects.create(skill_name="B")
        skill_c = models.Skill.objects.create(skill_name="C")

        models.Skill.objects.create(skill_name="D")

        models.Form.objects.create(interest=5,
                                   experience=2, skill_id=skill_a, graduate=grad_obj)

        models.Form.objects.create(interest=5,
                                   experience=2, skill_id=skill_b, graduate=grad_obj)

        models.Form.objects.create(interest=5,
                                   experience=2, skill_id=skill_c, graduate=grad_obj)

    # Test alg
    def test_alg(self):
        body = {"username": "Hr@email.com", "password": "123456"}

        response = self.client.post("", body, format="json")
        token = response.data["token"]

        # Test AutoAssign get api (Case one : There are some team have not set up)
        self.client.credentials(HTTP_AUTHORIZATION=token)
        new_response = self.client.get("/home/hr/AutoAssign/", format="json")

        validate_data = {'code': 200, 'status': True, 'status_code': 0,
                         'max_capacity': 10, 'detail': 'There are team that have not completed the setup.'}

        self.assertEqual(new_response.data, validate_data)

        # Test AutoAssign get api (Case Two : There are some team have not set up)
        team_obj = models.Team.objects.first()

        skill_objs = models.Skill.objects.all()

        team_obj.skill.set(skill_objs)

        self.client.credentials(HTTP_AUTHORIZATION=token)
        new_response = self.client.get("/home/hr/AutoAssign/", format="json")

        validate_data = {'code': 200, 'status': True, 'status_code': 1,
                         'max_capacity': 10, 'detail': 'Teams are ready to AutoAssign.'}

        self.assertEqual(new_response.data, validate_data)

        check_num = {"check_num": 1}
        new_response = self.client.post("/home/hr/AutoAssign/", check_num, format="json")

        validate_data = {'code': 200, 'status': True, 'detail': 'Has been Assign'}

        self.assertEqual(new_response.data, validate_data)
