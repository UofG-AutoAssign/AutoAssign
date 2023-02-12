# import json
# from rest_framework import status
# from rest_framework.test import APIClient
# from Assign import models
# from rest_framework.test import APITestCase
#
# # Test Login
# class HrLoginTestCase(APITestCase):
#
#     def setUp(self):
#         models.HR.objects.create(email='Hr@email.com',
#                                  first_name='Hr', second_name='Test',
#                                  password='123456', role='3')
#
#     def test_login_Wrong(self):
#         body = {"username": "Wrong", "password": "Wrong"}
#
#         response = self.client.post("", body)
#         self.assertEqual(response.status_code, 200)
#         self.assertEqual(response.data, {'status': False, 'error': 'User name or password error'})

#     def test_login_Correct(self):
#         body = {
#             "username": "Hr@email.com",
#             "password": "123456"
#         }
#
#         response = self.client.post("", body)
#         self.assertEqual(response.status_code, 200)
#
#         data = response.data
#         status = data['status']
#         Usertype = data['User Type']
#
#         self.assertEqual(status, True)
#         self.assertEqual(Usertype, 'Hr')
#
#
# class ManLoginTestCase(APITestCase):
#
#     def setUp(self):
#         models.Manager.objects.create(email='Man@email.com', first_name=
#         'Man', second_name='Test', password='123456', role='2')
#
#     def test_login_Wrong(self):
#         body = {"username": "Wrong", "password": "Wrong"}
#
#         response = self.client.post("", body)
#         self.assertEqual(response.status_code, 200)
#         self.assertEqual(response.data, {'status': False, 'error': 'User name or password error'})
#
#     def test_login_Correct(self):
#         body = {
#             "username": "Man@email.com",
#             "password": "123456"
#         }
#
#         response = self.client.post("", body)
#         self.assertEqual(response.status_code, 200)
#
#         data = response.data
#         status = data['status']
#         Usertype = data['User Type']
#
#         self.assertEqual(status, True)
#         self.assertEqual(Usertype, 'Manger')
