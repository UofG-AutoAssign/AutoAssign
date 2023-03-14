import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'AutoAssign.settings')

import django
import random

django.setup()

from Assign.models import Graduate, Manager, Department, HR, Form, Team, Skill


def populate():
    GraduateList = [
        {'email': 'Graduate@email.com',
         'depart_id': 0,
         'first_name': "Graduate",
         'second_name': "One",
         'password': "5fa5f62fe937033750ed096d66c866be",
         'role': 1,
         },
        {'email': 'Graduate2@email.com',
         'depart_id': 0,
         'first_name': "Graduate",
         'second_name': "Two",
         'password': "5fa5f62fe937033750ed096d66c866be",
         'role': 1,
         },
        {'email': 'Graduate3@email.com',
         'depart_id': 0,
         'first_name': "Graduate",
         'second_name': "3",
         'password': "5fa5f62fe937033750ed096d66c866be",
         'role': 1,
         },
        {'email': 'Graduate4@email.com',
         'depart_id': 0,
         'first_name': "Graduate",
         'second_name': "4",
         'password': "5fa5f62fe937033750ed096d66c866be",
         'role': 1,
         },
        {'email': 'Graduate5@email.com',
         'depart_id': 0,
         'first_name': "Graduate",
         'second_name': "5",
         'password': "5fa5f62fe937033750ed096d66c866be",
         'role': 1,
         },
        {'email': 'Graduate6@email.com',
         'depart_id': 0,
         'first_name': "Graduate",
         'second_name': "6",
         'password': "5fa5f62fe937033750ed096d66c866be",
         'role': 1,
         },
        {'email': 'Graduate7@email.com',
         'depart_id': 0,
         'first_name': "Graduate",
         'second_name': "7",
         'password': "5fa5f62fe937033750ed096d66c866be",
         'role': 1,
         }
    ]

    ManagerList = [
        {'email': 'Manger@email.com',
         'depart_id': 0,
         'first_name': "Manger",
         'second_name': "One",
         'password': "5fa5f62fe937033750ed096d66c866be",
         'role': 2,
         },
        {'email': 'Manger2@email.com',
         'depart_id': 0,
         'first_name': "Manger",
         'second_name': "Two",
         'password': "5fa5f62fe937033750ed096d66c866be",
         'role': 2,
         },
        {'email': 'Manger3@email.com',
         'depart_id': 0,
         'first_name': "Manger",
         'second_name': "3",
         'password': "5fa5f62fe937033750ed096d66c866be",
         'role': 2,
         },
        {'email': 'Manger4@email.com',
         'depart_id': 0,
         'first_name': "Manger",
         'second_name': "4",
         'password': "5fa5f62fe937033750ed096d66c866be",
         'role': 2,
         },
        {'email': 'Manger5@email.com',
         'depart_id': 0,
         'first_name': "Manger",
         'second_name': "5",
         'password': "5fa5f62fe937033750ed096d66c866be",
         'role': 2,
         },
        {'email': 'Manger6@email.com',
         'depart_id': 0,
         'first_name': "Manger",
         'second_name': "6",
         'password': "5fa5f62fe937033750ed096d66c866be",
         'role': 2,
         },
        {'email': 'Manger7@email.com',
         'depart_id': 0,
         'first_name': "Manger",
         'second_name': "7",
         'password': "5fa5f62fe937033750ed096d66c866be",
         'role': 2,
         },
        {'email': 'Manger8@email.com',
         'depart_id': 0,
         'first_name': "Manger",
         'second_name': "8",
         'password': "5fa5f62fe937033750ed096d66c866be",
         'role': 2,
         },
        {'email': 'Manger9@email.com',
         'depart_id': 0,
         'first_name': "Manger",
         'second_name': "9",
         'password': "5fa5f62fe937033750ed096d66c866be",
         'role': 2,
         },
        {'email': 'Manger10@email.com',
         'depart_id': 0,
         'first_name': "Manger",
         'second_name': "10",
         'password': "5fa5f62fe937033750ed096d66c866be",
         'role': 2,
         },

    ]

    HRList = [
        {'email': 'Hr@email.com',
         'first_name': "HR",
         'second_name': "One",
         'password': "5fa5f62fe937033750ed096d66c866be",
         'role': 3,
         },
        {'email': 'Hr2@email.com',
         'first_name': "Hr",
         'second_name': "Two",
         'password': "5fa5f62fe937033750ed096d66c866be",
         'role': 3,
         }

    ]

    SkillList = [
        {'skill_name': "Python"}, {'skill_name': "AWS Lambda"}, {'skill_name': "API Gateway"},
        {'skill_name': "software design"},
        {'skill_name': "REST services"}, {'skill_name': "Full stack C#"}, {'skill_name': "Angular Web UI programming"},
        {'skill_name': "CI/CD tools"},
        {'skill_name': "Agile development"}, {'skill_name': "Web API"}, {'skill_name': "Production support"},
        {'skill_name': "Trade floor support role"}, {'skill_name': "Equity Derivatives technology experience"}
        , {'skill_name': "ITIL knowledge"}
        , {'skill_name': "UNIX platforms"}
        , {'skill_name': "MSSQL"}
        , {'skill_name': "Java"}
        , {'skill_name': "ReactJS"}
        , {'skill_name': "Spring"}
        , {'skill_name': "Hibernate"}
        , {'skill_name': " SAS/SQL"}
        , {'skill_name': "MS Office required"}
        , {'skill_name': "analytical"}
        , {'skill_name': "Data Validation"}
        , {'skill_name': "Hadoop and Excel"}
        , {'skill_name': "Good communication"}
        , {'skill_name': "Management"}
        , {'skill_name': "Financial"}
        , {'skill_name': "Consulting"}
        , {'skill_name': "statistical skills"}
        , {'skill_name': "Risk management"}
        , {'skill_name': "organizational skills"}
        , {'skill_name': "Transaction Monitoring systems"}
        , {'skill_name': "governance frameworks"}
        , {'skill_name': "MS Office products"}
        , {'skill_name': "software packages"}
        , {'skill_name': "stakeholder management"}
        , {'skill_name': "Extensive experience in risk"}
        , {'skill_name': "Private Banking or Wealth Management"}
        , {'skill_name': "CIA"}
        , {'skill_name': "Financial Crime"}
        , {'skill_name': "MIIA"}
    ]

    DepartmentList = [
        {'depart_name': 'Human Resources',
         },
        {'depart_name': 'Finance',
         },
        {'depart_name': 'Marketing',
         },
        {'depart_name': 'Sales',
         },
        {'depart_name': 'Technology',
         },
        {'depart_name': 'Research & Development',
         },
        {'depart_name': 'Customer Service',
         },
        {'depart_name': 'Production',
         },
        {'depart_name': 'Procurement',
         },
        {'depart_name': 'Administration',
         },
    ]

    TeamList = [
        {'team_name': 'Cloud Analyst', 'Skill_One': 1, 'Skill_Two': 2, 'Skill_Three': 3, 'Skill_Four': 4,
         'Skill_Five': 5, 'ratio': 0.3
         },
        {'team_name': 'CSharp Developer', 'Skill_One': 6, 'Skill_Two': 7, 'Skill_Three': 8, 'Skill_Four': 9,
         'Skill_Five': 10, 'ratio': 0.4
         },
        {'team_name': 'Equities Flow Derivatives Production Support', 'Skill_One': 11, 'Skill_Two': 12,
         'Skill_Three': 13, 'Skill_Four': 14,
         'Skill_Five': 15, 'ratio': 0.6
         },
        {'team_name': 'AVP Software Develop', 'Skill_One': 16, 'Skill_Two': 17,
         'Skill_Three': 18, 'Skill_Four': 19,
         'Skill_Five': 20, 'ratio': 0.7
         },
        {'team_name': 'Credit Strategy and Implementation', 'Skill_One': 21, 'Skill_Two': 15,
         'Skill_Three': 22, 'Skill_Four': 23,
         'Skill_Five': 24, 'ratio': 1
         },
        {'team_name': 'Deals and Forecasting', 'Skill_One': 21, 'Skill_Two': 25,
         'Skill_Three': 26, 'Skill_Four': 27,
         'Skill_Five': 28, 'ratio': 0.1
         },
        {'team_name': 'Acquisition Marketing Analytics - AVP', 'Skill_One': 23, 'Skill_Two': 29,
         'Skill_Three': 28, 'Skill_Four': 30,
         'Skill_Five': 31, 'ratio': 0.5
         },
        {'team_name': 'Global Surveillance Transaction Monitoring', 'Skill_One': 32, 'Skill_Two': 33,
         'Skill_Three': 31, 'Skill_Four': 34,
         'Skill_Five': 28, 'ratio': 0.4
         },
        {'team_name': 'Regulatory Reporting', 'Skill_One': 28, 'Skill_Two': 26,
         'Skill_Three': 35, 'Skill_Four': 36,
         'Skill_Five': 37, 'ratio': 0.3
         },
        {'team_name': 'Internal Auditor', 'Skill_One': 38, 'Skill_Two': 39,
         'Skill_Three': 40, 'Skill_Four': 41,
         'Skill_Five': 42, 'ratio': 0.2
         },

    ]

    for s in SkillList:
        new_skill = Skill.objects.create(skill_name=s['skill_name'])
        new_skill.save()

    for de in DepartmentList:
        new_de = Department.objects.create(depart_name=de['depart_name'])
        new_de.save()

    for Man in ManagerList:
        new_man = Manager.objects.create(email=Man['email'], first_name=Man['first_name'],
                                         second_name=Man['second_name'], password=Man['password'], role=Man['role'])
        new_man.save()

    i = 1
    for team in TeamList:
        skill_one = Skill.objects.filter(id=int(team['Skill_One'])).first()
        skill_two = Skill.objects.filter(id=int(team['Skill_Two'])).first()
        skill_three = Skill.objects.filter(id=int(team['Skill_Three'])).first()
        skill_four = Skill.objects.filter(id=int(team['Skill_Four'])).first()
        skill_five = Skill.objects.filter(id=int(team['Skill_Five'])).first()

        Man_obj = Manager.objects.filter(id=i).first()
        Depart_obj = Department.objects.filter(id=i).first()

        new_team = Team.objects.create(team_name=team['team_name'], man_id=Man_obj,
                                       depart_id=Depart_obj, ratio=team['ratio'])
        new_team.skill.add(skill_one)
        new_team.skill.add(skill_two)
        new_team.skill.add(skill_three)
        new_team.skill.add(skill_four)
        new_team.skill.add(skill_five)

        i = i + 1
        new_team.save()

    for Hr in HRList:
        new_hr = HR.objects.create(email=Hr['email'], first_name=Hr['first_name'], second_name=Hr['second_name'],
                                   password=Hr['password'], role=Hr['role'])
        new_hr.save()

    skill_id = 1

    for Grad in GraduateList:

        i = random.randint(0, 4)
        j = random.randint(0, 4)

        new_grad = Graduate.objects.create(email=Grad['email'], first_name=Grad['first_name'],
                                           second_name=Grad['second_name'], password=Grad['password'],
                                           role=Grad['role'])
        for i in range(5):
            skill_id = skill_id + 1

            skill_obj = Skill.objects.filter(id=skill_id).first()
            new_Form = Form.objects.create(interest=i, experience=j, skill_id=skill_obj, graduate=new_grad)
            new_Form.save()

        new_grad.save()


if __name__ == '__main__':
    print("starting Assign population script")
    populate()
    print("TestData populated")
