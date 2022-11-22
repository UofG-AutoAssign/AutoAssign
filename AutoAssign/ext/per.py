from rest_framework.permissions import BasePermission

# Permissions
class GradPermission(BasePermission):
    message = {"status": False, 'msg': "no access 1"}

    def has_permission(self, request, view):
        if request.user.role == 1:
            return True
        return False


class ManagerPermission(BasePermission):
    message = {"status": False, 'msg': "no access 2"}

    def has_permission(self, request, view):
        if request.user.role == 2:
            return True
        return False


class HrPermission(BasePermission):
    message = {"status": False, 'msg': "no access 3"}

    def has_permission(self, request, view):
        if request.user.role == 3:
            return True
        return False