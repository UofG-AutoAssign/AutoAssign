import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'AutoAssign.settings')

import django
import random

django.setup()

from Assign.models import Graduate, Manager, Department, HR, Form, Team, Skill


def populate():
    grad_list = [
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

    man_list = [
        {'email': 'Manager@email.com',
         'depart_id': 0,
         'first_name': "Manager",
         'second_name': "One",
         'password': "5fa5f62fe937033750ed096d66c866be",
         'role': 2,
         },
        {'email': 'Manager2@email.com',
         'depart_id': 0,
         'first_name': "Manager",
         'second_name': "Two",
         'password': "5fa5f62fe937033750ed096d66c866be",
         'role': 2,
         },
        {'email': 'Manager3@email.com',
         'depart_id': 0,
         'first_name': "Manager",
         'second_name': "3",
         'password': "5fa5f62fe937033750ed096d66c866be",
         'role': 2,
         },
        {'email': 'Manager4@email.com',
         'depart_id': 0,
         'first_name': "Manager",
         'second_name': "4",
         'password': "5fa5f62fe937033750ed096d66c866be",
         'role': 2,
         },
        {'email': 'Manager5@email.com',
         'depart_id': 0,
         'first_name': "Manager",
         'second_name': "5",
         'password': "5fa5f62fe937033750ed096d66c866be",
         'role': 2,
         },
        {'email': 'Manager6@email.com',
         'depart_id': 0,
         'first_name': "Manager",
         'second_name': "6",
         'password': "5fa5f62fe937033750ed096d66c866be",
         'role': 2,
         },
        {'email': 'Manager7@email.com',
         'depart_id': 0,
         'first_name': "Manager",
         'second_name': "7",
         'password': "5fa5f62fe937033750ed096d66c866be",
         'role': 2,
         },
        {'email': 'Manager8@email.com',
         'depart_id': 0,
         'first_name': "Manager",
         'second_name': "8",
         'password': "5fa5f62fe937033750ed096d66c866be",
         'role': 2,
         },
        {'email': 'Manager9@email.com',
         'depart_id': 0,
         'first_name': "Manager",
         'second_name': "9",
         'password': "5fa5f62fe937033750ed096d66c866be",
         'role': 2,
         },
        {'email': 'Manager10@email.com',
         'depart_id': 0,
         'first_name': "Manager",
         'second_name': "10",
         'password': "5fa5f62fe937033750ed096d66c866be",
         'role': 2,
         },

    ]

    hr_list = [
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

    skill_lists = [{'skill_name': 'Python'}, {'skill_name': 'R'}, {'skill_name': 'SQL'}, {'skill_name': 'Tableau'},
                   {'skill_name': 'Hadoop'}, {'skill_name': 'Spark'}, {'skill_name': 'Scala'},
                   {'skill_name': 'TensorFlow'}, {'skill_name': 'PyTorch'}, {'skill_name': 'Scikit-learn'},
                   {'skill_name': 'AWS'}, {'skill_name': 'Microsoft Azure'}, {'skill_name': 'Google Cloud Platform'},
                   {'skill_name': 'Docker'}, {'skill_name': 'Kubernetes'}, {'skill_name': 'Terraform'},
                   {'skill_name': 'Ansible'}, {'skill_name': 'Linux'}, {'skill_name': 'Shell Scripting'},
                   {'skill_name': 'JavaScript'}, {'skill_name': 'React'}, {'skill_name': 'Angular'},
                   {'skill_name': 'Vue'}, {'skill_name': 'Node.js'}, {'skill_name': 'HTML/CSS'},
                   {'skill_name': 'Ruby on Rails'}, {'skill_name': 'MongoDB'}, {'skill_name': 'Kafka'},
                   {'skill_name': 'Cassandra'}, {'skill_name': 'Apache Airflow'}, {'skill_name': 'Swift'},
                   {'skill_name': 'Kotlin'}, {'skill_name': 'Java'}, {'skill_name': 'React Native'},
                   {'skill_name': 'Flutter/Dart'}, {'skill_name': 'Android SDK'}, {'skill_name': 'iOS SDK'},
                   {'skill_name': 'RESTful APIs'}, {'skill_name': 'Git'}, {'skill_name': 'Agile Methodologies'},
                   {'skill_name': 'Power BI'}, {'skill_name': 'SAP BusinessObjects'}, {'skill_name': 'Microsoft Excel'},
                   {'skill_name': 'ETL Tools'}, {'skill_name': 'Data Warehousing'}, {'skill_name': 'Data Mining'},
                   {'skill_name': 'Jenkins'}, {'skill_name': 'Keras'}, {'skill_name': 'NumPy'},
                   {'skill_name': 'Pandas'},
                   {'skill_name': 'Deep Learning'}, {'skill_name': 'Computer Vision'},
                   {'skill_name': 'Natural Language Processing'}, {'skill_name': 'PHP'},
                   {'skill_name': 'C++'}, {'skill_name': 'C#'}, {'skill_name': 'MySQL'}, {'skill_name': 'PostgresSQL'}]

    dep_list = [
        {'depart_name': 'Advanced Analytics',
         },
        {'depart_name': 'Cloud Solutions',
         },
        {'depart_name': 'Full Stack Development',
         },
        {'depart_name': 'Data Engineering',
         },
        {'depart_name': 'Mobile Development',
         },
        {'depart_name': 'Business Intelligence',
         },
        {'depart_name': 'DevOps & Automation',
         },
        {'depart_name': 'Machine Learning',
         },
        {'depart_name': 'Data Science & Analytics',
         },
        {'depart_name': 'Backend Development',
         },
    ]

    team_list = [
        {'team_name': 'Data Wizards', 'Skill_One': 1, 'Skill_Two': 2, 'Skill_Three': 3, 'Skill_Four': 4,
         'Skill_Five': 5, 'ratio': 0.3
         },
        {'team_name': 'Cloud Masters', 'Skill_One': 6, 'Skill_Two': 7, 'Skill_Three': 8, 'Skill_Four': 9,
         'Skill_Five': 10, 'ratio': 0.4
         },
        {'team_name': 'Full Stack Heroes', 'Skill_One': 11, 'Skill_Two': 12,
         'Skill_Three': 13, 'Skill_Four': 14,
         'Skill_Five': 15, 'ratio': 0.6
         },
        {'team_name': 'Data Engineers', 'Skill_One': 16, 'Skill_Two': 17,
         'Skill_Three': 18, 'Skill_Four': 19,
         'Skill_Five': 20, 'ratio': 0.7
         },
        {'team_name': 'Mobile Mavericks', 'Skill_One': 21, 'Skill_Two': 15,
         'Skill_Three': 22, 'Skill_Four': 23,
         'Skill_Five': 24, 'ratio': 1
         },
        {'team_name': 'BI Gurus', 'Skill_One': 21, 'Skill_Two': 25,
         'Skill_Three': 26, 'Skill_Four': 27,
         'Skill_Five': 28, 'ratio': 0.1
         },
        {'team_name': 'DevOps Ninjas', 'Skill_One': 23, 'Skill_Two': 29,
         'Skill_Three': 28, 'Skill_Four': 30,
         'Skill_Five': 31, 'ratio': 0.5
         },
        {'team_name': 'ML Titans', 'Skill_One': 32, 'Skill_Two': 33,
         'Skill_Three': 31, 'Skill_Four': 34,
         'Skill_Five': 28, 'ratio': 0.4
         },
        {'team_name': 'Data Science Dynamos', 'Skill_One': 28, 'Skill_Two': 26,
         'Skill_Three': 35, 'Skill_Four': 36,
         'Skill_Five': 37, 'ratio': 0.3
         },
        {'team_name': 'Backend Builders', 'Skill_One': 38, 'Skill_Two': 39,
         'Skill_Three': 40, 'Skill_Four': 41,
         'Skill_Five': 42, 'ratio': 0.2
         },

    ]

    for s in skill_lists:
        new_skill = Skill.objects.create(skill_name=s['skill_name'])
        new_skill.save()

    for dep in dep_list:
        new_de = Department.objects.create(depart_name=dep['depart_name'])
        new_de.save()

    for man in man_list:
        new_man = Manager.objects.create(email=man['email'], first_name=man['first_name'],
                                         second_name=man['second_name'], password=man['password'], role=man['role'])
        new_man.save()

    i = 1
    for team in team_list:
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

    for Hr in hr_list:
        new_hr = HR.objects.create(email=Hr['email'], first_name=Hr['first_name'], second_name=Hr['second_name'],
                                   password=Hr['password'], role=Hr['role'])
        new_hr.save()

    skill_id = 1

    for Grad in grad_list:

        interest = random.randint(0, 4)
        j = random.randint(0, 4)

        new_grad = Graduate.objects.create(email=Grad['email'], first_name=Grad['first_name'],
                                           second_name=Grad['second_name'], password=Grad['password'],
                                           role=Grad['role'])
        for i in range(5):
            skill_obj = Skill.objects.filter(id=skill_id).first()

            skill_id = skill_id + 1

            new_Form = Form.objects.create(interest=interest, experience=j, skill_id=skill_obj, graduate=new_grad)
            new_Form.save()

        new_grad.save()


if __name__ == '__main__':
    print("starting Assign population script")
    populate()
    print("TestData populated")
