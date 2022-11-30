from rest_framework.permissions import BasePermission


# Permissions
class GradPermission(BasePermission):
    message = {"status": False, 'msg': "Require Graduate's Permission"}

    def has_permission(self, request, view):
        if request.user.role == 1:
            return True
        return False


class ManagerPermission(BasePermission):
    message = {"status": False, 'msg': "Require Manager's Permission"}

    def has_permission(self, request, view):
        if request.user.role == 2:
            return True
        return False


class HrPermission(BasePermission):
    message = {"status": False, 'msg': "Require Hr's Permission"}

    def has_permission(self, request, view):
        if request.user.role == 3:
            return True
        return False
