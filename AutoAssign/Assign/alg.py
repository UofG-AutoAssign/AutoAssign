from django.db import transaction
from Assign import models


def cosine_similarity(vec1, vec2):
    """
    Calculates the cosine similarity between two vectors.
    :param vec1: vector 1
    :param vec2: vector 2
    :return: cosine similarity
    """
    dot_product = sum(vec1[i] * vec2[i] for i in vec1.keys() if i in vec2.keys())
    vec1_length = sum(vec1[i] ** 2 for i in vec1.keys())
    vec2_length = sum(vec2[i] ** 2 for i in vec2.keys())

    if vec1_length == 0 or vec2_length == 0:
        return 0

    return dot_product / (vec1_length ** 0.5 * vec2_length ** 0.5)


def get_graduates_by_skill(skill_id, grad_year):
    """
    Get a list of graduates with specific skill requirements.
    """
    graduates = models.Graduate.objects.filter(year=grad_year, form__skill_id=skill_id)
    return list(set(graduates))


def is_assigned_to_department(graduate, department):
    """
    Check whether a graduate has been assigned to a department before.
    :param graduate: graduate object
    :param department: department object
    :return: True if the graduate has been assigned to the department before, False otherwise.
    """
    old_team_id = graduate.team_id
    if not old_team_id:
        return False
    old_dep_id = old_team_id.depart_id

    if old_dep_id != department.id:
        return True

    return False


# Check if a graduate has the skills required by the team.
def has_required_skills(graduate, skill_objs):
    form_objs = models.Form.objects.filter(graduate=graduate).all()

    skills = {s.skill_id: s.experience for s in form_objs}
    for skill in skill_objs:
        if skill.id not in skills or skills[skill.id]:
            return False
    return True


def calculate_match_score(graduate, team):
    # pylint: disable=R0914
    """
        Calculate the match score between a graduate and a team.
    """
    interest_vec = {}
    experience_vec = {}

    # Get the team's preference rati
    ratio = team.ratio

    # Construct interest and experience vectors
    for form in graduate.form_set.all():
        skill_id = form.skill_id
        interest = form.interest / 4  # Normalize interest to range 0 to 1
        experience = form.experience / 4  # Normalize experience to range 0 to 1
        interest_vec[skill_id] = interest
        experience_vec[skill_id] = experience

    # If the team has no required skills, return 0
    team_skills = set(s.id for s in team.skill.all())
    if not team_skills:
        return 0

    # Calculate skill match
    skills = set(interest_vec.keys())
    team_skills = set(s.id for s in team.skill.all())

    common_skills = skills & team_skills

    # If graduate has no common skills with the team, return 0
    if not common_skills:
        return 0

    skill_match = len(common_skills) / len(team_skills)

    # Calculate experience match
    experience_match = cosine_similarity(experience_vec,
                                         {s.id: (1 - ratio) for s in team.skill.all()})

    # Calculate interest match
    interest_match = cosine_similarity(interest_vec, {s.id: ratio for s in team.skill.all()})

    # Weighted sum to get the overall match score
    # pylint: disable=C0301
    match_score = skill_match * 0.4 + experience_match * 0.3 * (1 - ratio) + interest_match * 0.3 * ratio
    return match_score


def sort_teams_by_preference(teams):
    """
    Sort the teams in descending order by preference ratio.
    :param teams: list of teams
    :return: sorted list of teams
    """
    team_preference = {team.id: team.ratio for team in teams}
    sorted_teams = sorted(team_preference.items(), key=lambda x: x[1], reverse=True)

    return sorted_teams


def match_graduates_to_teams(sorted_teams, grad_year):
    """
    Match graduates to teams.
    """
    # Loop through each team
    # pylint: disable=W0640, W0612
    for team_id, preference_ratio in sorted_teams:
        team = models.Team.objects.get(id=team_id)
        skill_objs = team.skill.all()

        # Get all graduates who have at least one common skill with the team
        common_skill_graduates = models.Graduate.objects.filter(
            year=grad_year,
            form__skill_id__in=skill_objs
        )

        # Exclude graduates who have already been assigned to this team or other teams
        candidates = [g for g in common_skill_graduates
                      if not g.team_id or is_assigned_to_department(g, team.depart_id)]

        # Sort candidates by match score in descending order
        candidates = sorted(candidates, key=lambda g: calculate_match_score(g, team), reverse=True)

        # Assign graduates to the team
        for candidate in candidates:
            with transaction.atomic():
                models.Graduate.objects.filter(id=candidate.id).update(team_id=team.id)

            # Update list of unassigned graduates
            unassigned_graduates = models.Graduate.objects.filter(team_id__isnull=True)

            # If the team is full, stop assigning graduates
            member_count = models.Graduate.objects.filter(team_id=team.id).count()
            if member_count >= team.num_positions:
                break

            # If there are no unassigned graduates, stop assigning graduates
            if not unassigned_graduates:
                break


# Main function that loops through all teams and matches graduates to each team
def assign_graduates_to_teams():
    # Get all teams
    teams = models.Team.objects.all()

    # Sort teams by preference ratio in descending order
    sorted_teams = sort_teams_by_preference(teams)

    # Match graduates to teams
    match_graduates_to_teams(sorted_teams, grad_year=1)
    # match_graduates_to_teams(sorted_teams, grad_year=2)

    # Get all unassigned graduates
    unassigned_graduates = models.Graduate.objects.filter(team_id__isnull=True, form__isnull=False)

    # Get current member counts for all teams
    team_member_counts = {}
    for team in teams:
        member_count = models.Graduate.objects.filter(team_id=team.id).count()
        team_member_counts[team.id] = member_count

    while unassigned_graduates:
        # Sort teams by member count in ascending order
        sorted_teams_by_member_count = sorted(teams, key=lambda t: team_member_counts[t.id])

        # pylint: disable=C0301
        # Loop through unassigned graduates and randomly assign them to the team with the fewest members
        for graduate in unassigned_graduates:
            for team in sorted_teams_by_member_count:
                if team_member_counts[team.id] < team.num_positions:
                    with transaction.atomic():
                        models.Graduate.objects.filter(id=graduate.id).update(team_id=team.id)
                        team_member_counts[team.id] += 1
                    break
            else:
                continue

            unassigned_graduates = models.Graduate.objects.filter(team_id__isnull=True)
            break
