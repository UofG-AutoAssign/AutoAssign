import json
from rest_framework import status
from rest_framework.test import APIClient
from Assign import models
from rest_framework.test import APITestCase
import collections


# Test Login (All get reqeust)
class LoginTestCase(APITestCase):

    def setUp(self):
        models.HR.objects.create(email='Hr@email.com',
                                 first_name='Hr', second_name='Test',
                                 password='5fa5f62fe937033750ed096d66c866be', role='3')

        models.Graduate.objects.create(email='Graduate@email.com',
                                       first_name='Graduate', second_name='Test',
                                       password='5fa5f62fe937033750ed096d66c866be', role='1')

        models.Manager.objects.create(email='Manager@email.com',
                                      first_name='Manager', second_name='Test',
                                      password='5fa5f62fe937033750ed096d66c866be', role='2')

    def test_login_Wrong(self):
        body = {"username": "Wrong", "password": "Wrong"}

        response = self.client.post("", body)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {'status': False, 'error': 'User name or password error'})

    def test_login_Right(self):
        body = {"username": "Hr@email.com", "password": "123456"}

        response = self.client.post("", body, format="json")
        token = response.data["token"]
        self.assertEqual(response.data, {'status': True, 'user_type': 'Hr', 'token': token})

        body = {"username": "Graduate@email.com", "password": "123456"}

        response = self.client.post("", body, format="json")
        token = response.data["token"]
        self.assertEqual(response.data, {'status': True, 'user_type': 'Graduate', 'token': token})

        body = {"username": "Manager@email.com", "password": "123456"}

        response = self.client.post("", body, format="json")
        token = response.data["token"]
        self.assertEqual(response.data, {'status': True, 'user_type': 'Manger', 'token': token})


# Test Information View
class ViewTestCase(APITestCase):

    def setUp(self):
        models.HR.objects.create(email='Hr@email.com',
                                 first_name='Hr', second_name='Test',
                                 password='5fa5f62fe937033750ed096d66c866be', role='3')

        models.Graduate.objects.create(email='Graduate@email.com',
                                       first_name='Graduate', second_name='Test',
                                       password='5fa5f62fe937033750ed096d66c866be', role='1')

        Man = models.Manager.objects.create(email='Manager@email.com',
                                            first_name='Manager', second_name='Test',
                                            password='5fa5f62fe937033750ed096d66c866be', role='2')

        models.Skill.objects.create(skill_name="A")
        models.Skill.objects.create(skill_name="B")
        models.Skill.objects.create(skill_name="C")

        Team_obj = models.Team.objects.create(team_name='Manager@email.com',
                                              man_id=Man, ratio=0.5, )

        Skill_obj = models.Skill.objects.all()

        Team_obj.Skill.set(Skill_obj)

    # Hr
    def test_Hr_Information(self):
        body = {"username": "Hr@email.com", "password": "123456"}

        response = self.client.post("", body, format="json")
        token = response.data["token"]

        self.client.credentials(HTTP_AUTHORIZATION=token)
        new_response = self.client.get("/home/hr", format="json")

        self.assertEqual(new_response.data, {'status': True, 'data': {'first_name': 'Hr', 'second_name': 'Test',
                                                                      'email': 'Hr@email.com'}})


class testGraduateApi(APITestCase):

    def setUp(self):
        Man = models.Manager.objects.create(email='Manager@email.com',
                                            first_name='Manager', second_name='Test',
                                            password='5fa5f62fe937033750ed096d66c866be', role='2')

        Team_obj = models.Team.objects.create(team_name='Team',
                                              man_id=Man, ratio=0.5, )

        Grad_obj = models.Graduate.objects.create(email='Graduate@email.com',
                                                  first_name='Graduate', second_name='Test',
                                                  password='5fa5f62fe937033750ed096d66c866be', role='1',
                                                  team_id=Team_obj)

        A = models.Skill.objects.create(skill_name="A")

        models.Skill.objects.create(skill_name="B")
        models.Skill.objects.create(skill_name="C")
        models.Skill.objects.create(skill_name="D")

        models.Form.objects.create(interest=5,
                                   experience=2, Skill_id=A)

        Form_obj = models.Form.objects.all()

        Grad_obj.Form.set(Form_obj)

    # All Graduate Get Request
    def test_Grad_View(self):
        body = {"username": "Graduate@email.com", "password": "123456"}

        response = self.client.post("", body, format="json")
        token = response.data["token"]

        # Get Graduate Information
        self.client.credentials(HTTP_AUTHORIZATION=token)
        new_response = self.client.get("/home/grad/", format="json")

        self.assertEqual(new_response.data, {'status': True, 'data': {'first_name': 'Graduate', 'second_name': 'Test',
                                                                      'email': 'Graduate@email.com'}})

        # Get Graduate Form Information
        new_response = self.client.get("/home/grad/Form", format="json")

        self.assertEqual(new_response.data, {'data': {'id': 1, 'Form_information':
            [{'Form_id': 1, 'Skill_id': 1, 'skill_name': 'A', 'Interest': 5, 'Experience': 2}, ]}, 'status': True})

    # All Graduate Post/Put Reqeust:
    def test_Graduate_Api(self):
        body = {"username": "Graduate@email.com", "password": "123456"}

        response = self.client.post("", body, format="json")
        token = response.data["token"]

        self.client.credentials(HTTP_AUTHORIZATION=token)

        # Update Manger_information

        updata_information = {"first_name": "AAAAA", "second_name": "One", "email": "Graduate@email.com"}
        new_response = self.client.put("/home/grad/", updata_information, format="json")

        self.assertEqual(new_response.data, {'status': True, 'Grad_id': 1,
                                             'data': {'first_name': 'AAAAA', 'second_name': 'One',
                                                      'email': 'Graduate@email.com'}})

        # Update Form
        body = {"username": "Graduate@email.com", "password": "123456"}

        response = self.client.post("", body, format="json")
        token = response.data["token"]

        update_information = [{"interest": 1, "experience": 1, "Skill_id": 3},
                              {"interest": 2, "experience": 1, "Skill_id": 4},
                              {"interest": 3, "experience": 4, "Skill_id": 2}, ]

        self.client.credentials(HTTP_AUTHORIZATION=token)

        new_response = self.client.post("/home/grad/Form", update_information, format="json")

        self.assertEqual(new_response.data, {'status': True, 'data': {'id': 1,
                                                                      'Form_information':
                                                                          [{'Form_id': 2, 'Skill_id': 3,
                                                                            'skill_name': 'C', 'Interest': 1,
                                                                            'Experience': 1},
                                                                           {'Form_id': 3, 'Skill_id': 4,
                                                                            'skill_name': 'D', 'Interest': 2,
                                                                            'Experience': 1},
                                                                           {'Form_id': 4, 'Skill_id': 2,
                                                                            'skill_name': 'B', 'Interest': 3,
                                                                            'Experience': 4}]}})


class testManGerApi(APITestCase):
    def setUp(self):
        models.HR.objects.create(email='Hr@email.com',
                                 first_name='Hr', second_name='Test',
                                 password='5fa5f62fe937033750ed096d66c866be', role='3')

        Man = models.Manager.objects.create(email='Manager@email.com',
                                            first_name='Manager', second_name='Test',
                                            password='5fa5f62fe937033750ed096d66c866be', role='2')

        models.Skill.objects.create(skill_name="A")
        models.Skill.objects.create(skill_name="B")
        models.Skill.objects.create(skill_name="C")

        Team_obj = models.Team.objects.create(team_name='Team',
                                              man_id=Man, ratio=0.5, )

        Skill_obj = models.Skill.objects.all()

        Team_obj.Skill.set(Skill_obj)

        models.Graduate.objects.create(email='Graduate@email.com',
                                       first_name='Graduate', second_name='Test',
                                       password='5fa5f62fe937033750ed096d66c866be', role='1', team_id=Team_obj)

    # All Manger get request
    def test_Manger_View(self):
        body = {"username": "Manager@email.com", "password": "123456"}

        response = self.client.post("", body, format="json")
        token = response.data["token"]

        self.client.credentials(HTTP_AUTHORIZATION=token)
        # Get Manager Information

        new_response = self.client.get("/home/man/", format="json")
        self.assertEqual(new_response.data, {'status': True, 'data': {'first_name': 'Manager', 'second_name': 'Test',
                                                                      'email': 'Manager@email.com'}})

        # Get Team information:

        new_response = self.client.get("/home/man/Team/Setting", format="json")

        self.assertEqual(new_response.data, {'status': True, 'data': {'team_name': 'Team', 'ratio': 0.5,
                                                                      'Skill_information': [
                                                                          {'Skill_id': 1, 'skill_name': 'A'},
                                                                          {'Skill_id': 2, 'skill_name': 'B'},
                                                                          {'Skill_id': 3, 'skill_name': 'C'}]}})

        # Get Team View

        new_response = self.client.get("/home/man/Team", format="json")

        test_data = collections.OrderedDict()
        test_data['email'] = 'Graduate@email.com'
        test_data['first_name'] = 'Graduate'
        test_data['second_name'] = 'Test'

        self.assertEqual(new_response.data, {'status': True, 'data': [test_data]})

    # All Manger Post/Put Reqeust:
    def test_Manger_Api(self):
        body = {"username": "Manager@email.com", "password": "123456"}

        response = self.client.post("", body, format="json")
        token = response.data["token"]

        self.client.credentials(HTTP_AUTHORIZATION=token)

        # Update Manger_information

        updata_information = {"first_name": "AAAAA", "second_name": "One", "email": "Manager@email.com"}
        new_response = self.client.put("/home/man/", updata_information, format="json")

        self.assertEqual(new_response.data, {'status': True, 'Man_id': 1,
                                             'data': {'first_name': 'AAAAA', 'second_name': 'One',
                                                      'email': 'Manager@email.com'}})

        # Update Team Setting

        body = {"username": "Manager@email.com", "password": "123456"}

        response = self.client.post("", body, format="json")
        token = response.data["token"]

        update_information = {"ration": 0.5, "Skill": [1, 2]}

        self.client.credentials(HTTP_AUTHORIZATION=token)

        new_response = self.client.put("/home/man/Team/UpdateSetting", update_information, format="json")

        self.assertEqual(new_response.data, {'status': True,
                                             'data': {'team_name': 'Team', 'ratio': 0.5,
                                                      'Skill_information': [{'Skill_id': 1, 'skill_name': 'A'},
                                                                            {'Skill_id': 2, 'skill_name': 'B'}]}})


class testHrApi(APITestCase):

    def setUp(self):
        Man = models.Manager.objects.create(email='Manager@email.com',
                                            first_name='Manager', second_name='Test',
                                            password='5fa5f62fe937033750ed096d66c866be', role='2')

        Dep_obj = models.Department.objects.create(depart_name='Department')

        Team_obj = models.Team.objects.create(team_name='Team',
                                              man_id=Man, ratio=0.5, depart_id=Dep_obj)

        Grad_obj = models.Graduate.objects.create(email='Graduate@email.com',
                                                  first_name='Graduate', second_name='Test',
                                                  password='5fa5f62fe937033750ed096d66c866be', role='1',
                                                  team_id=Team_obj)

        models.HR.objects.create(email='Hr@email.com',
                                 first_name='Hr', second_name='Test',
                                 password='5fa5f62fe937033750ed096d66c866be', role='3')

        A = models.Skill.objects.create(skill_name="A")

        models.Skill.objects.create(skill_name="B")
        models.Skill.objects.create(skill_name="C")
        models.Skill.objects.create(skill_name="D")

        models.Form.objects.create(interest=5,
                                   experience=2, Skill_id=A)

        Form_obj = models.Form.objects.all()

        Grad_obj.Form.set(Form_obj)

    # All Hr Get Request
    def test_hr_View(self):
        body = {"username": "Hr@email.com", "password": "123456"}

        response = self.client.post("", body, format="json")
        token = response.data["token"]

        # Get Hr information
        self.client.credentials(HTTP_AUTHORIZATION=token)
        new_response = self.client.get("/home/hr", format="json")

        self.assertEqual(new_response.data, {'status': True, 'data': {'first_name': 'Hr', 'second_name': 'Test',
                                                                      'email': 'Hr@email.com'}})

        # View all team
        new_response = self.client.get("/home/hr/TeamView", format="json")

        test_data = collections.OrderedDict()
        test_data['team_name'] = 'Team'
        test_data['man_id'] = 1

        test_data['information'] = {'Man_id': 1, 'first_name': 'Manager', 'second_name': 'Test', 'Dep_id': 1,
                                    'Dep_name': 'Department'}

        self.assertEqual(new_response.data, {'status': True, 'data': [test_data]})

        # View all Grad

        new_response = self.client.get("/home/hr/GradView", format="json")

        test_data = collections.OrderedDict()
        test_data['id'] = 1
        test_data['email'] = 'Graduate@email.com'
        test_data['first_name'] = 'Graduate'
        test_data['second_name'] = 'Test'

        self.assertEqual(new_response.data, {'status': True, 'data': [test_data]})

        # View all Man

        new_response = self.client.get("/home/hr/ManView", format="json")

        test_data = collections.OrderedDict()
        test_data['id'] = 1
        test_data['email'] = 'Manager@email.com'
        test_data['first_name'] = 'Manager'
        test_data['second_name'] = 'Test'

        self.assertEqual(new_response.data, {'status': True, 'data': [test_data]})

        # View all Skill
        new_response = self.client.get("/home/skill", format="json")

        test_data = collections.OrderedDict()
        test_data['id'] = 1
        test_data['skill_name'] = 'A'

        test_data_a = collections.OrderedDict()
        test_data_a['id'] = 2
        test_data_a['skill_name'] = 'B'

        test_data_b = collections.OrderedDict()
        test_data_b['id'] = 3
        test_data_b['skill_name'] = 'C'

        test_data_c = collections.OrderedDict()
        test_data_c['id'] = 4
        test_data_c['skill_name'] = 'D'

        self.assertEqual(new_response.data,
                         {'status': True, 'data': [test_data, test_data_a, test_data_b, test_data_c]})

    # All Hr Post/Put Reqeust:
    def test_Hr_Api(self):
        body = {"username": "Hr@email.com", "password": "123456"}

        response = self.client.post("", body, format="json")
        token = response.data["token"]

        self.client.credentials(HTTP_AUTHORIZATION=token)

        # Update Hr_information

        updata_information = {"first_name": "AAAAA", "second_name": "One", "email": "Hr@email.com"}
        new_response = self.client.put("/home/hr", updata_information, format="json")

        self.assertEqual(new_response.data, {'status': True, 'Hr_id': 1,
                                             'data': {'first_name': 'AAAAA', 'second_name': 'One',
                                                      'email': 'Hr@email.com'}})

        body = {"username": "Hr@email.com", "password": "123456"}

        response = self.client.post("", body, format="json")
        token = response.data["token"]

        self.client.credentials(HTTP_AUTHORIZATION=token)

        # Create a Team

        models.Manager.objects.create(email='Manager2@email.com',
                                      first_name='Manager', second_name='Test_2',
                                      password='5fa5f62fe937033750ed096d66c866be', role='2')

        updata_information = {"team_name": "AA", "man_id": 2, "depart_id": 1, "ratio": 0.6, "Skill": [1, 2]}

        new_response = self.client.post("/home/hr/CreateTeam", updata_information, format="json")

        self.assertEqual(new_response.data,
                         {'status': True, 'Create': 'Team', 'Status': 'success', 'status': True})

        # Delete Graduate

        updata_information = {"id": 2}

        models.Graduate.objects.create(email='Graduate2@email.com',
                                       first_name='Graduate', second_name='Test',
                                       password='5fa5f62fe937033750ed096d66c866be', role='1')

        new_response = self.client.post("/home/hr/DeleteGrad", updata_information, format="json")

        self.assertEqual(new_response.data,
                         {'status': True, 'detail': 'Has been deleted'})

        # Delete Manger:

        updata_information = {"id": 3}

        models.Manager.objects.create(email='Manager3@email.com',
                                      first_name='Manager3', second_name='Test',
                                      password='5fa5f62fe937033750ed096d66c866be', role='2')

        new_response = self.client.post("/home/hr/DeleteMan", updata_information, format="json")

        self.assertEqual(new_response.data,
                         {'status': True, 'detail': 'Has been deleted'})

        # Assign Grad to one Team

        updata_information = {"Grad_id": 1, "team_id": 2}

        new_response = self.client.put("/home/hr/AssignGrad", updata_information, format="json")

        self.assertEqual(new_response.data,
                         {'Grad_id': 1, 'Team_id': 2, 'detail': 'Updated', 'status': True})

        # Assign Manger to one Team BUG

        updata_information = {"man_id": "2", "team_id": 2}

        new_response = self.client.put("/home/hr/AssignMan", updata_information, format="json")

        self.assertEqual(new_response.data,
                         {'Grad_id': 1, 'Team_id': 2, 'detail': 'Updated', 'status': True})
