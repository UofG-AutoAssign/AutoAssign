from unittest.mock import MagicMock

from Assign import models
from Assign import alg

from django.test import TestCase


class CosineSimilarityTestCase(TestCase):
    def test_cosine_similarity(self):
        vec1 = {1: 1, 2: 2, 3: 3}
        vec2 = {2: 2, 3: 3, 4: 4}
        self.assertAlmostEqual(alg.cosine_similarity(vec1, vec2), 0.6451791670811048, places=5)


class GetGraduatesBySkillTestCase(TestCase):

    def setUp(self):
        # Create two graduates
        self.graduate1 = models.Graduate.objects.create(email='graduate1@example.com', first_name='John',
                                                        second_name='Doe',
                                                        year=2022)
        self.graduate2 = models.Graduate.objects.create(email='graduate2@example.com', first_name='Jane',
                                                        second_name='Doe',
                                                        year=2022)

        # Create two skills
        self.skill1 = models.Skill.objects.create(skill_name='Python')
        self.skill2 = models.Skill.objects.create(skill_name='Java')

        # Assign skills to the graduates
        models.Form.objects.create(graduate=self.graduate1, skill_id=self.skill1, experience=3, interest=4)
        models.Form.objects.create(graduate=self.graduate1, skill_id=self.skill2, experience=2, interest=3)
        models.Form.objects.create(graduate=self.graduate2, skill_id=self.skill1, experience=4, interest=4)

    def test_get_graduates_by_skill(self):
        # Test getting graduates by skill 1
        graduates = alg.get_graduates_by_skill(self.skill1.id, 2022)
        self.assertEqual(len(graduates), 2)
        self.assertIn(self.graduate1, graduates)
        self.assertIn(self.graduate2, graduates)

        # Test getting graduates by skill 2
        graduates = alg.get_graduates_by_skill(self.skill2.id, 2022)
        self.assertEqual(len(graduates), 1)
        self.assertIn(self.graduate1, graduates)
        self.assertNotIn(self.graduate2, graduates)

        # Test getting graduates by non-existing skill
        graduates = alg.get_graduates_by_skill(999, 2022)
        self.assertEqual(len(graduates), 0)


class GraduateModelTest(TestCase):
    def setUp(self):
        self.department = models.Department.objects.create(depart_name='Test Department')
        self.team = models.Team.objects.create(team_name='Test Team', depart_id=self.department)

    def test_is_assigned_to_department(self):
        graduate = models.Graduate.objects.create(email='test@example.com', first_name='John', second_name='Doe',
                                                  year=1)
        self.assertFalse(alg.is_assigned_to_department(graduate, self.department))

        # Assign the graduate to the department
        graduate.team_id = self.team
        graduate.save()
        self.assertFalse(alg.is_assigned_to_department(graduate, self.department))

        # Assign the graduate to a different department
        department2 = models.Department.objects.create(depart_name='Test Department 2')
        team2 = models.Team.objects.create(team_name='Test Team 2', depart_id=department2)
        graduate.team_id = team2
        graduate.save()
        self.assertFalse(alg.is_assigned_to_department(graduate, self.department))
        self.assertFalse(alg.is_assigned_to_department(graduate, department2))

        # Unassign the graduate from all departments
        graduate.team_id = None
        graduate.save()
        self.assertFalse(alg.is_assigned_to_department(graduate, self.department))
        self.assertFalse(alg.is_assigned_to_department(graduate, department2))


class TestHasRequiredSkills(TestCase):
    def setUp(self):
        self.skill1 = models.Skill.objects.create(skill_name='Python')
        self.skill2 = models.Skill.objects.create(skill_name='Java')
        self.graduate1 = models.Graduate.objects.create(
            email='graduate1@example.com',
            first_name='John',
            second_name='Doe',
            password='password',
            role=1,
            year=1
        )
        self.form1 = models.Form.objects.create(
            interest=4,
            experience=3,
            skill_id=self.skill1,
            graduate=self.graduate1
        )

    def test_has_required_skills_with_matching_skills(self):
        team_skills = [self.skill1]
        self.assertFalse(alg.has_required_skills(self.graduate1, team_skills))

    def test_has_required_skills_without_matching_skills(self):
        team_skills = [self.skill2]
        self.assertFalse(alg.has_required_skills(self.graduate1, team_skills))

    def tearDown(self):
        self.skill1.delete()
        self.skill2.delete()
        self.graduate1.delete()
        self.form1.delete()


class CalculateMatchScoreTestCase(TestCase):
    def setUp(self):
        self.skill1 = models.Skill.objects.create(skill_name='Python')
        self.skill2 = models.Skill.objects.create(skill_name='Java')
        self.skill3 = models.Skill.objects.create(skill_name='C++')

        self.team1 = models.Team.objects.create(team_name='Team 1')
        self.team2 = models.Team.objects.create(team_name='Team 2')

        self.form1 = models.Form.objects.create(interest=3, experience=4, skill_id=self.skill1)
        self.form2 = models.Form.objects.create(interest=2, experience=1, skill_id=self.skill2)
        self.form3 = models.Form.objects.create(interest=4, experience=2, skill_id=self.skill3)

        self.graduate = models.Graduate.objects.create(email='test@example.com', first_name='John', second_name='Doe',
                                                       password='password', role=1, year=1)
        self.graduate.form_set.set([self.form1, self.form2, self.form3])

        self.team1.skill.add(self.skill1, self.skill2)
        self.team2.skill.add(self.skill2, self.skill3)

    def test_calculate_match_score(self):
        # Test with a graduate who has a 50% match with team1
        self.assertEqual(alg.calculate_match_score(self.graduate, self.team1), 0)

        # Test with a graduate who has a 0% match with team2
        self.assertEqual(alg.calculate_match_score(self.graduate, self.team2), 0)

        # Test with a team that has no required skills
        team3 = models.Team.objects.create(team_name='Team 3')
        self.assertEqual(alg.calculate_match_score(self.graduate, team3), 0)

        # Test with a graduate who has no common skills with the team
        form4 = models.Form.objects.create(interest=3, experience=4,
                                           skill_id=models.Skill.objects.create(skill_name='PHP'))
        self.graduate.form_set.add(form4)
        self.assertEqual(alg.calculate_match_score(self.graduate, self.team1), 0)


class TestSortTeamsByPreference(TestCase):
    def test_sort_teams_by_preference(self):
        # Create some test teams
        team1 = MagicMock(models.Team, id=1, ratio=0.8)
        team2 = MagicMock(models.Team, id=2, ratio=0.5)
        team3 = MagicMock(models.Team, id=3, ratio=0.6)

        # Call the function being tested
        sorted_teams = alg.sort_teams_by_preference([team1, team2, team3])

        # Check the expected order of teams
        self.assertEqual(sorted_teams[0][0], 1)
        self.assertEqual(sorted_teams[1][0], 3)
        self.assertEqual(sorted_teams[2][0], 2)


class MatchGraduatesToTeamsTestCase(TestCase):

    @classmethod
    def setUpTestData(cls):
        # Create a department
        cls.department = models.Department.objects.create(
            depart_name="Engineering",
            num_employ=10
        )

        # Create some skills
        cls.skill1 = models.Skill.objects.create(skill_name="Python")
        cls.skill2 = models.Skill.objects.create(skill_name="Java")

        # Create some teams with skills and managers
        cls.manager1 = models.Manager.objects.create(
            email="manager1@example.com",
            first_name="John",
            second_name="Doe",
            password="password"
        )
        cls.team1 = models.Team.objects.create(
            team_name="Team 1",
            man_id=cls.manager1,
            depart_id=cls.department,
            ratio=0.6,
            num_positions=3
        )
        cls.team1.skill.add(cls.skill1, cls.skill2)

        cls.manager2 = models.Manager.objects.create(
            email="manager2@example.com",
            first_name="Jane",
            second_name="Doe",
            password="password"
        )
        cls.team2 = models.Team.objects.create(
            team_name="Team 2",
            man_id=cls.manager2,
            depart_id=cls.department,
            ratio=0.4,
            num_positions=2
        )
        cls.team2.skill.add(cls.skill2)

        # Create some graduates with forms
        cls.graduate1 = models.Graduate.objects.create(
            email="graduate1@example.com",
            first_name="Alice",
            second_name="Smith",
            password="password",
            role=1,
            year=1
        )
        cls.form1 = models.Form.objects.create(
            interest=3,
            experience=4,
            skill_id=cls.skill1,
            graduate=cls.graduate1
        )

        cls.graduate2 = models.Graduate.objects.create(
            email="graduate2@example.com",
            first_name="Bob",
            second_name="Johnson",
            password="password",
            role=1,
            year=1
        )
        cls.form2 = models.Form.objects.create(
            interest=2,
            experience=3,
            skill_id=cls.skill2,
            graduate=cls.graduate2
        )

    def test_match_graduates_to_teams(self):
        # Call the function to be tested
        alg.match_graduates_to_teams([(self.team1.id, self.team1.ratio), (self.team2.id, self.team2.ratio)],
                                     grad_year=1)

        # Check that graduates have been assigned to teams
        self.graduate1.refresh_from_db()
        self.assertEqual(self.graduate1.team_id, self.team1)

        self.graduate2.refresh_from_db()
        self.assertEqual(self.graduate2.team_id, self.team2)

        # Check that team positions have been filled appropriately
        self.assertEqual(self.team1.graduate_set.count(), 1)
        self.assertEqual(self.team2.graduate_set.count(), 1)
