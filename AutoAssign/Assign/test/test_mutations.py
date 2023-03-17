from django.test import TestCase
from unittest.mock import patch

from Assign.models import Graduate, Team, Form, Department, Skill
from Assign.alg import cosine_similarity, calculate_match_score, match_graduates_to_teams, get_graduates_by_skill, \
    is_assigned_to_department, has_required_skills, sort_teams_by_preference


# class CosineSimilarityMutationTestCase(TestCase):
#     def test_cosine_similarity_mutation(self):
#         # Test that the cosine_similarity function returns 1.0 for any input
#         vec1 = {1: 0.5, 2: 0.3, 3: 0.2}
#         vec2 = {2: 0.7, 3: 0.1, 4: 0.2}
#
#         with patch('Assign.utils.sum', return_value=0.0):
#             with patch('Assign.utils.pow', return_value=1.0):
#                 similarity_score = cosine_similarity(vec1, vec2)
#
#         self.assertEqual(similarity_score, 1.0)
#
#
# class CalculateMatchScoreMutationTestCase(TestCase):
#     def test_calculate_match_score_mutation(self):
#         # Test that the calculate_match_score function returns a negative value for any input
#         graduate = Graduate.objects.create(year=1)
#         team = Team.objects.create(num_positions=2, ratio=0.5)
#
#         with patch('Assign.utils.cosine_similarity', return_value=-1.0):
#             match_score = calculate_match_score(graduate, team)
#
#         self.assertLess(match_score, 0)
#
#
# class GetGraduatesBySkillMutationTestCase(TestCase):
#     def test_get_graduates_by_skill_mutation(self):
#         # Test that the get_graduates_by_skill function returns an empty list for any input
#         skill_id = 1
#         grad_year = 2
#
#         with patch('Assign.models.Graduate.objects.filter', return_value=Graduate.objects.none()):
#             graduates = get_graduates_by_skill(skill_id, grad_year)
#
#         self.assertEqual(len(graduates), 0)
#
#
# class IsAssignedToDepartmentMutationTestCase(TestCase):
#     def test_is_assigned_to_department_mutation(self):
#         # Test that the is_assigned_to_department function always returns False
#         graduate = Graduate.objects.create(year=1)
#         department = Department.objects.create(depart_name='Test Department')
#
#         with patch.object(graduate, 'old_dep_id', None):
#             assigned_to_department = is_assigned_to_department(graduate, department)
#
#         self.assertFalse(assigned_to_department)
#
#
# class HasRequiredSkillsMutationTestCase(TestCase):
#     def test_has_required_skills_mutation(self):
#         # Test that the has_required_skills function always returns False
#         graduate = Graduate.objects.create(year=1)
#         skill1 = Skill.objects.create(skill_name='Test Skill 1')
#         skill2 = Skill.objects.create(skill_name='Test Skill 2')
#         form1 = Form.objects.create(graduate=graduate, skill_id=skill1, experience=3)
#         form2 = Form.objects.create(graduate=graduate, skill_id=skill2, experience=2)
#         skill_objs = [skill1, skill2]
#
#         with patch.object(form1, 'experience', 0):
#             with patch.object(form2, 'experience', 0):
#                 required_skills = has_required_skills(graduate, skill_objs)
#
#         self.assertFalse(required_skills)
#
#
# class MatchGraduatesToTeamsMutationTestCase(TestCase):
#     def test_match_graduates_to_teams_mutation(self):
#         # Test that the match_graduates_to_teams function always returns an empty list
#         team = Team.objects.create(team_name='Test Team', num_positions=1)
#         graduate = Graduate.objects.create(year=1)
#         skill = team.skill.first()
#         graduate.form_set.create(skill_id=skill, experience=3, interest=4)
#
#         with patch.object(Graduate.objects, 'filter', return_value=Graduate.objects.none()):
#             match_graduates_to_teams([(team.id, 1)], grad_year=1)
#
#         self.assertEqual(team.graduate_set.count(), 0)
