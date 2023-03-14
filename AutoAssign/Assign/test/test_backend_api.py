import json
from rest_framework import status
from rest_framework.test import APIClient
from Assign import models
from rest_framework.test import APITestCase
from collections import OrderedDict


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
        self.assertEqual(response.data, {"code": 403, 'status': False, 'error': 'User name or password error'})

    def test_login_Right(self):
        body = {"username": "Hr@email.com", "password": "123456"}

        response = self.client.post("", body, format="json")
        self.assertEqual(response.data['user_type'], 'Hr')

        body = {"username": "Graduate@email.com", "password": "123456"}

        response = self.client.post("", body, format="json")
        self.assertEqual(response.data['user_type'], 'Graduate')

        body = {"username": "Manager@email.com", "password": "123456"}

        response = self.client.post("", body, format="json")
        self.assertEqual(response.data['user_type'], 'Manager')


# Test Information View
class ViewTestCase(APITestCase):

    def setUp(self):
        models.HR.objects.create(email='Hr@email.com',
                                 first_name='Hr', second_name='Test',
                                 password='5fa5f62fe937033750ed096d66c866be', role='3')

        models.Graduate.objects.create(email='Graduate@email.com',
                                       first_name='Graduate', second_name='Test',
                                       password='5fa5f62fe937033750ed096d66c866be', role='1')

        man = models.Manager.objects.create(email='Manager@email.com',
                                            first_name='Manager', second_name='Test',
                                            password='5fa5f62fe937033750ed096d66c866be', role='2')

        models.Skill.objects.create(skill_name="A")
        models.Skill.objects.create(skill_name="B")
        models.Skill.objects.create(skill_name="C")

        team_obj = models.Team.objects.create(team_name='Manager@email.com',
                                              man_id=man, ratio=0.5, )

        skill_obj = models.Skill.objects.all()

        team_obj.skill.set(skill_obj)

    # Hr
    def test_Hr_Information(self):
        body = {"username": "Hr@email.com", "password": "123456"}

        response = self.client.post("", body, format="json")
        token = response.data["token"]

        self.client.credentials(HTTP_AUTHORIZATION=token)
        new_response = self.client.get("/home/hr/", format="json")

        self.assertEqual(new_response.data,
                         {'code': 200, 'status': True,
                          'data': {'first_name': 'Hr', 'second_name': 'Test',
                                   'email': 'Hr@email.com'}})


class testGraduateApi(APITestCase):

    def setUp(self):
        man = models.Manager.objects.create(email='Manager@email.com',
                                            first_name='Manager', second_name='Test',
                                            password='5fa5f62fe937033750ed096d66c866be', role='2')

        team_obj = models.Team.objects.create(team_name='Team',
                                              man_id=man, ratio=0.5, )

        grad_obj = models.Graduate.objects.create(email='Graduate@email.com',
                                                  first_name='Graduate', second_name='Test',
                                                  password='5fa5f62fe937033750ed096d66c866be', role='1',
                                                  team_id=team_obj)

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

    # All Graduate Get Request
    def test_Grad_View(self):
        body = {"username": "Graduate@email.com", "password": "123456"}

        response = self.client.post("", body, format="json")
        token = response.data["token"]

        # Get Graduate Information
        self.client.credentials(HTTP_AUTHORIZATION=token)
        new_response = self.client.get("/home/grad/", format="json")

        self.assertEqual(new_response.data, {'code': 200, 'status': True,
                                             'data': {'first_name': 'Graduate', 'second_name': 'Test',
                                                      'email': 'Graduate@email.com', 'year': 1}})

        # Get Team Information
        new_response = self.client.get("/home/grad/team/", format="json")

        validate_data = {
            'team_name': 'Team',
            'man_information': [
                {'man_id': 1, 'man_name': 'Manager Test', 'man_email': 'Manager@email.com'}
            ],
            'depart_information': 'Null',
            'team_members': [
                {'grad_id': 1, 'grad_name': 'Graduate Test'}
            ]
        }

        self.assertEqual(new_response.data['code'], 200)
        self.assertEqual(new_response.data['status'], True)
        self.assertEqual(new_response.data['data'], validate_data)

        # Get Graduate Form Information
        new_response = self.client.get("/home/grad/form/", format="json")

        validate_data = {'grad_id': 1,
                         'form_information': [
                             {'Form_id': 1, 'Skill_id': 1, 'skill_name': 'A', 'Interest': 5, 'Experience': 2},
                             {'Form_id': 2, 'Skill_id': 2, 'skill_name': 'B', 'Interest': 5, 'Experience': 2},
                             {'Form_id': 3, 'Skill_id': 3, 'skill_name': 'C', 'Interest': 5, 'Experience': 2}]}

        self.assertEqual(new_response.data['code'], 200)
        self.assertEqual(new_response.data['status'], True)
        self.assertEqual(new_response.data['data'], validate_data)

    # All Graduate's Post/Put Reqeust:
    def test_Graduate_Api(self):
        body = {"username": "Graduate@email.com", "password": "123456"}

        response = self.client.post("", body, format="json")
        token = response.data["token"]

        self.client.credentials(HTTP_AUTHORIZATION=token)

        # Update Graduate's information

        update_information = {"first_name": "AAAAA", "second_name": "One", "email": "Graduate@email.com"}
        new_response = self.client.put("/home/grad/", update_information, format="json")

        validate_data = {'code': 200, 'status': True, 'Grad_id': 1,
                         'data': {'first_name': 'AAAAA', 'second_name': 'One',
                                  'email': 'Graduate@email.com', 'year': 1}}

        self.assertEqual(new_response.data, validate_data)

        # Test Update Form (Correct Case)
        body = {"username": "Graduate@email.com", "password": "123456"}

        response = self.client.post("", body, format="json")
        token = response.data["token"]

        update_information = [{"interest": 1, "experience": 1, "skill_id": 3, "graduate": 1},
                              {"interest": 2, "experience": 1, "skill_id": 4, "graduate": 1},
                              {"interest": 3, "experience": 4, "skill_id": 2, "graduate": 1}, ]

        self.client.credentials(HTTP_AUTHORIZATION=token)

        new_response = self.client.post("/home/grad/form/", update_information, format="json")

        validate_data = {'code': 200, 'status': True, 'data': {'grad_id': 1, 'form_information': [
            {'Form_id': 4, 'Skill_id': 3, 'skill_name': 'C', 'Interest': 1, 'Experience': 1},
            {'Form_id': 5, 'Skill_id': 4, 'skill_name': 'D', 'Interest': 2, 'Experience': 1},
            {'Form_id': 6, 'Skill_id': 2, 'skill_name': 'B', 'Interest': 3, 'Experience': 4}]}}

        self.assertEqual(new_response.data, validate_data)

        # Test Update Form (Wrong Case)

        update_information = [{"interest": 1, "experience": 1, "skill_id": 3, "graduate": 1},
                              {"interest": 2, "experience": 1, "skill_id": 4, "graduate": 1},
                              {"interest": 3, "experience": 4, "skill_id": 9, "graduate": 1}, ]

        new_response = self.client.post("/home/grad/form/", update_information, format="json")

        validate_data = {
            'code': 403,
            'status': False,
            'error': 'Update Form failed',
        }

        self.assertEqual(new_response.data['code'], validate_data['code'])
        self.assertEqual(new_response.data['status'], validate_data['status'])
        self.assertEqual(new_response.data['error'], validate_data['error'])

        # Change Password (Correct Case)
        update_information = {"pwd": "123456", "pwd1": "12345", "pwd2": "12345"}

        new_response = self.client.put("/home/ChangePassword/", update_information, format="json")

        validate_data = {'code': 200, 'data': 'Password Changed', 'status': True}

        self.assertEqual(new_response.data, validate_data)

        # Change Password (Case One : wrong original password )

        new_response = self.client.put("/home/ChangePassword/", update_information, format="json")

        validate_data = {'code': 403, 'error': 'password error', 'status': False}

        self.assertEqual(new_response.data, validate_data)

        # Change Password (Case Two : Two updated password are incorrect )

        update_information = {"pwd": "12345", "pwd1": "1234", "pwd2": "12345"}

        new_response = self.client.put("/home/ChangePassword/", update_information, format="json")

        validate_data = {'code': 400, 'error': 'Please check whether the passwords entered are consistent'}

        self.assertEqual(new_response.data, validate_data)


class testManGerApi(APITestCase):
    def setUp(self):
        models.HR.objects.create(email='Hr@email.com',
                                 first_name='Hr', second_name='Test',
                                 password='5fa5f62fe937033750ed096d66c866be', role='3')

        man = models.Manager.objects.create(email='Manager@email.com',
                                            first_name='Manager', second_name='Test',
                                            password='5fa5f62fe937033750ed096d66c866be', role='2')

        models.Skill.objects.create(skill_name="A")
        models.Skill.objects.create(skill_name="B")
        models.Skill.objects.create(skill_name="C")

        Team_obj = models.Team.objects.create(team_name='Team',
                                              man_id=man, ratio=0.5, )

        skill_obj = models.Skill.objects.all()

        Team_obj.skill.set(skill_obj)

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
        validate_data = {'code': 200, 'status': True, 'data': {'first_name': 'Manager', 'second_name': 'Test',
                                                               'email': 'Manager@email.com'}}
        self.assertEqual(new_response.data, validate_data)

        # Get Team information:

        new_response = self.client.get("/home/man/team/", format="json")

        data = {
            'team_name': 'Team',
            'man_information': [
                {'man_id': 1, 'man_name': 'Manager Test', 'man_email': 'Manager@email.com'}
            ],
            'depart_information': 'Null',
            'team_members': [
                {'grad_id': 1, 'grad_name': 'Graduate Test'}
            ]
        }

        validate_data = {
            'code': 200,
            'status': True,
            'data': data
        }

        self.assertEqual(new_response.data, validate_data)

        # View Team Setting
        new_response = self.client.get("/home/man/Team/setting/", format="json")

        validate_data = {'code': 200, 'status': True, 'data':
            {'team_name': 'Team', 'ratio': 0.5,
             'skill_information': [{'skill_id': 1, 'skill_name': 'A'},
                                   {'skill_id': 2, 'skill_name': 'B'}, {'skill_id': 3, 'skill_name': 'C'}]}}
        self.assertEqual(new_response.data, validate_data)

    # All Manger Post/Put Reqeust:
    def test_Manger_Api(self):
        body = {"username": "Manager@email.com", "password": "123456"}

        response = self.client.post("", body, format="json")
        token = response.data["token"]

        self.client.credentials(HTTP_AUTHORIZATION=token)

        # Update Manger_information

        update_information = {"first_name": "AAAAA", "second_name": "One", "email": "Manager@email.com"}
        new_response = self.client.put("/home/man/", update_information, format="json")

        validate_data = {'code': 200, 'status': True, 'Man_id': 1,
                         'data': {'first_name': 'AAAAA', 'second_name': 'One', 'email': 'Manager@email.com'}}

        self.assertEqual(new_response.data, validate_data)

        # Update Team Setting

        body = {"username": "Manager@email.com", "password": "123456"}

        response = self.client.post("", body, format="json")
        token = response.data["token"]

        update_information = {"ration": 0.5, "skill": [1, 2]}

        self.client.credentials(HTTP_AUTHORIZATION=token)

        new_response = self.client.put("/home/man/Team/UpdateSetting/", update_information, format="json")

        validate_data = {'code': 200, 'status': True,
                         'data': {'team_name': 'Team', 'ratio': 0.5,
                                  'skill_information': [{'skill_id': 1, 'skill_name': 'A'},
                                                        {'skill_id': 2, 'skill_name': 'B'}]}}

        self.assertEqual(new_response.data, validate_data)


class testHrApi(APITestCase):

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

    # All Hr Get Request
    def test_hr_View(self):
        body = {"username": "Hr@email.com", "password": "123456"}

        response = self.client.post("", body, format="json")
        token = response.data["token"]

        # Get Hr information
        self.client.credentials(HTTP_AUTHORIZATION=token)
        new_response = self.client.get("/home/hr/", format="json")

        validate_data = {'code': 200, 'status': True,
                         'data': {'first_name': 'Hr', 'second_name': 'Test', 'email': 'Hr@email.com'}}

        self.assertEqual(new_response.data, validate_data)

        # View all team
        new_response = self.client.get("/home/hr/TeamView/", format="json")

        validate_data = {
            "code": 200,
            "status": True,
            "data": [
                OrderedDict([
                    ("team_name", "Team"),
                    ("team_id", 1),
                    ("team_information", {
                        "man_id": 1,
                        "man_email": "Manager@email.com",
                        "first_name": "Manager",
                        "second_name": "Test",
                        "dep_id": 1,
                        "Dep_name": "Department"
                    })
                ])
            ]
        }

        self.assertEqual(new_response.data, validate_data)

        # View all Grad

        new_response = self.client.get("/home/hr/GradView/", format="json")

        validate_data = {
            "code": 200,
            "status": True,
            "data": [
                OrderedDict([
                    ("id", 1),
                    ("email", "Graduate@email.com"),
                    ("first_name", "Graduate"),
                    ("second_name", "Test")
                ]),
                OrderedDict([
                    ("id", 2),
                    ("email", "Graduate2@email.com"),
                    ("first_name", "Graduate"),
                    ("second_name", "Test")
                ])
            ]
        }

        self.assertEqual(new_response.data, validate_data)

        # View all Man

        new_response = self.client.get("/home/hr/ManView/", format="json")

        validate_data = {
            "code": 200,
            "status": True,
            "data": [
                OrderedDict([
                    ("id", 1),
                    ("email", "Manager@email.com"),
                    ("first_name", "Manager"),
                    ("second_name", "Test")
                ]),
                OrderedDict([
                    ("id", 2),
                    ("email", "Manager2@email.com"),
                    ("first_name", "Manager"),
                    ("second_name", "Test")
                ])
            ]
        }

        self.assertEqual(new_response.data, validate_data)

        # View all Skill
        new_response = self.client.get("/home/skill/", format="json")

        validate_data = {
            "code": 200,
            "status": True,
            "data": [
                OrderedDict([
                    ("id", 1),
                    ("skill_name", "A")
                ]),
                OrderedDict([
                    ("id", 2),
                    ("skill_name", "B")
                ]),
                OrderedDict([
                    ("id", 3),
                    ("skill_name", "C")
                ]),
                OrderedDict([
                    ("id", 4),
                    ("skill_name", "D")
                ])
            ]
        }

        self.assertEqual(new_response.data, validate_data)

        # View all Un_Assign graduate

        new_response = self.client.get("/home/hr/UnGradView/", format="json")

        validate_data = {
            "code": 200,
            "status": True,
            "data": [
                OrderedDict([
                    ("id", 2),
                    ("email", "Graduate2@email.com"),
                    ("first_name", "Graduate"),
                    ("second_name", "Test")
                ])
            ]
        }

        self.assertEqual(new_response.data, validate_data)

        # View all Un_Assign Manager

        new_response = self.client.get("/home/hr/UnManView/", format="json")

        validate_data = {
            "code": 200,
            "status": True,
            "data": [
                OrderedDict([
                    ("id", 2),
                    ("email", "Manager2@email.com"),
                    ("first_name", "Manager"),
                    ("second_name", "Test")
                ])
            ]
        }

        self.assertEqual(new_response.data, validate_data)

        # View all Team And Department

        new_response = self.client.get("/home/hr/AllTeamAndDep/", format="json")

        validate_data = [
            OrderedDict([
                ('team_name', 'Team'),
                ('team_id', 1),
                ('depart_name', 'Department'),
                ('depart_id', 1),
                ('man_id', 1),
                ('man_name', 'Manager Test'),
                ('man_email', 'Manager@email.com'),
                ('team_members', [
                    {'grad_id': 1, 'grad_name': 'Graduate Test', 'grad_email': 'Graduate@email.com'}
                ]),
                ('num_positions', 10)
            ])
        ]

        self.assertEqual(new_response.data["data"], validate_data)

        # View all year 2 Graduate.

        new_response = self.client.get("/home/hr/AllYearTwoGrad/", format="json")

        validate_data = {
            "code": 200,
            "status": True,
            "data": [
                OrderedDict([
                    ("id", 2),
                    ("email", "Graduate2@email.com"),
                    ("first_name", "Graduate"),
                    ("second_name", "Test")
                ])
            ]
        }

        self.assertEqual(new_response.data, validate_data)

        # View all year 2 Graduate.

        new_response = self.client.get("/home/hr/DepartmentView/", format="json")

        validate_data = {
            "code": 200,
            "status": True,
            "data": [
                OrderedDict([
                    ("id", 1),
                    ("depart_name", "Department")
                ])
            ]
        }

        self.assertEqual(new_response.data, validate_data)

    # All Hr Post/Put Reqeust:
    def test_Hr_Api(self):
        body = {"username": "Hr@email.com", "password": "123456"}

        response = self.client.post("", body, format="json")
        token = response.data["token"]

        self.client.credentials(HTTP_AUTHORIZATION=token)

        # Update Hr_information

        update_information = {"first_name": "AAAAA", "second_name": "One", "email": "Hr@email.com"}
        new_response = self.client.put("/home/hr/", update_information, format="json")

        validate_data = {'code': 200, 'status': True, 'Hr_id': 1,
                         'data': {'first_name': 'AAAAA', 'second_name': 'One', 'email': 'Hr@email.com'}}

        self.assertEqual(new_response.data, validate_data)

        body = {"username": "Hr@email.com", "password": "123456"}

        response = self.client.post("", body, format="json")
        token = response.data["token"]

        self.client.credentials(HTTP_AUTHORIZATION=token)

        # Create a Team

        models.Manager.objects.create(email='Manager3@email.com',
                                      first_name='Manager', second_name='Test_2',
                                      password='5fa5f62fe937033750ed096d66c866be', role='2')

        update_information = [{"team_name": "aaa", "man_id": 2, "depart_id": 1, "num_positions": 3}]

        new_response = self.client.post("/home/hr/CreateTeam/", update_information, format="json")

        validate_data = {
            "code": 200,
            "status": True,
            "data": [
                OrderedDict([
                    ("man_id", 2),
                    ("depart_id", 1),
                    ("num_positions", 3)
                ])
            ]
        }

        self.assertEqual(new_response.data, validate_data)

        # Delete Graduate

        update_information = {"id": 3}

        models.Graduate.objects.create(email='Graduate3@email.com',
                                       first_name='Graduate', second_name='Test',
                                       password='5fa5f62fe937033750ed096d66c866be', role='1')

        new_response = self.client.post("/home/hr/DeleteGrad/", update_information, format="json")

        validate_data = {'code': 200, 'status': True, 'detail': 'Has been deleted'}

        self.assertEqual(new_response.data, validate_data)

        # Delete Manger:

        update_information = {"id": 3}

        models.Manager.objects.create(email='Manager4@email.com',
                                      first_name='Manager3', second_name='Test',
                                      password='5fa5f62fe937033750ed096d66c866be', role='2')

        new_response = self.client.post("/home/hr/DeleteMan/", update_information, format="json")

        validate_data = {'code': 200, 'status': True, 'detail': 'Has been deleted'}

        self.assertEqual(new_response.data, validate_data)

        # Delete All year 2 Graduate:

        update_information = {"check_num": 1}

        new_response = self.client.post("/home/hr/DeleteYearTwo/", update_information, format="json")

        validate_data = {'code': 200, 'status': True, 'detail': 'Has been deleted'}

        self.assertEqual(new_response.data, validate_data)

        # Update Grad year api :

        update_information = [{"grad_id": "1", "year": 1}]

        new_response = self.client.post("/home/hr/ChangeGraduateYear/", update_information, format="json")

        validate_data = {'code': 200, 'status': True, 'detail': 'Has been Changed '}

        self.assertEqual(new_response.data, validate_data)

        # Assign Grad to one Team (Case One : Team is not full)

        update_information = {"grad_id": 1, "team_id": 2}

        new_response = self.client.put("/home/hr/AssignGrad/", update_information, format="json")

        validate_data = {'code': 200, 'status': True, 'Grad_id': 1, 'Team_id': 2, 'detail': 'Updated'}

        self.assertEqual(new_response.data, validate_data)

        # Assign Grad to one Team (Team is full)

        models.Team.objects.create(team_name='full_team',
                                   ratio=0.5, num_positions=0)

        update_information = {"grad_id": 1, "team_id": 3}

        new_response = self.client.put("/home/hr/AssignGrad/", update_information, format="json")

        validate_data = {'code': 403, 'status': False, 'error': 'Assign Grad failed', 'detail': 'The team is full'}

        self.assertEqual(new_response.data, validate_data)

        # Assign Manger to one Team

        update_information = {"man_id": "2", "team_id": 2}

        new_response = self.client.put("/home/hr/AssignMan/", update_information, format="json")

        validate_data = {'code': 200, 'status': True, 'Man_id': 2, 'Team_id': 2, 'detail': 'Updated'}

        self.assertEqual(new_response.data, validate_data)
