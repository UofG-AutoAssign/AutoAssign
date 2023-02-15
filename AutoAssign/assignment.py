import os
import random
import django
from collections import defaultdict

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "AutoAssign.settings")
django.setup()
from Assign import models


def import_data():
    # Import graduate skills and group by graduate
    grads = defaultdict(list)
    for grad_result in models.Form.objects.values('graduate_id', 'skill_id'):
        grads[grad_result['graduate_id']].append(grad_result['skill_id'])

    # Import skill-enthusiasm ratio for teams
    ratio = models.Team.objects.order_by('id').values_list('ratio', flat=True)

    # Import team skills and group by team
    skills = defaultdict(list)
    for team_result in models.Team.objects.values('id', 'skill'):
        skills[team_result['id']].append(team_result['skill'])

    return grads, ratio, skills


def calculate_score(team, grad_skills, team_skills, grad, positions, ratio, select, order):
    positions[team] = 5  # Add each team to the pool of available positions
    if any(k in grad_skills for k in team_skills):
        score = 0
        for skill in grad_skills:
            if skill in team_skills:
                info = models.Form.objects.get(skill_id=skill, graduate=grad)
                # score = (experience*team ratio modifier) + (interest*inverse of team ratio modifier)
                score += (info.experience * (1.0 - ratio[grad - 1]) + info.interest * (ratio[grad - 1]))

        order.append(score)  # List of every individual score, to select from highest overall to lowest
        assign = (grad, team)
        # Dict where key is score and values are assignment parameters, allows each score to be linked
        # to a graduate and a team
        select[score].append(assign)
    return positions, select, order


# Calculate each graduates compatability score for each team
def calculate_assignments(grads, ratio, skills):
    order = []
    select = defaultdict(list)
    available = []
    positions = {}

    for grad, grad_skills in grads.items():
        available.append(grad)  # Add each grad to the pool of available to be assigned
        for team, team_skills in skills.items():
            try:
                grad_depart = models.Graduate.objects.get(id=grad).team_id.depart_id
                if models.Team.objects.get(id=team).depart_id != grad_depart:
                    positions, select, order = calculate_score(team, grad_skills, team_skills,
                                                               grad, positions, ratio, select, order)
            except models.Team.DoesNotExist:
                positions, select, order = calculate_score(team, grad_skills, team_skills, grad,
                                                           positions, ratio, select, order)

    order.sort(reverse=True)
    return order, select, available, positions


# Assign graduate to team in database
def update_grad(grad_id, team_id):
    team = models.Team.objects.get(id=team_id)
    grad = models.Graduate.objects.get(id=grad_id)
    grad.team_id = team
    grad.save(update_fields=['team_id'])


# Calculate the best assignments for each graduate based on suitability scores
def assign_grads(order, select, available, positions):
    for score in order:
        if score in select:
            values = select.get(score)  # Fetch all matches for a particular score
            grad_id, team_id = values[0]  # In the event of multiple identical scores, select first assigment values
            if grad_id in available and positions[team_id] > 0:  # Check match won't overwrite a more suitable one.
                update_grad(grad_id, team_id)

                if len(values) <= 1:  # Remove score from dict if all matches have been checked
                    del select[score]
                else:
                    values.remove((grad_id, team_id))

                available.remove(grad_id)  # once a match has been found, remove grad from the availability pool
                positions[team_id] -= 1  # Remove a space from the selected team once a new grad has been assigned

            elif positions[team_id] <= 0:  # If all seats on a team is filled, delete it from the possible match pool
                del positions[team_id]

    # In the event suitablilty data is not available for a grad - missed submission, late arrival, etc. - assign them to
    # a team that has not yet been filled at random, as we do not have any information on said grad
    for leftover in models.Graduate.objects.filter(team_id__isnull=True).values_list('id', flat=True):
        team = random.choice(list(positions))
        update_grad(leftover, team)

        positions[team] -= 1

        if positions[team] <= 0:
            del positions[team]


# Programme divided into functions, not necessary for its current function, but makes it easier to extend at a future
# date should any features need to be added.
if __name__ == '__main__':
    grads, ratio, skills = import_data()
    order, select, available, positions = calculate_assignments(grads, ratio, skills)
    assign_grads(order, select, available, positions)
