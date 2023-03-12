"""
Confirm user permissions
"""
from rest_framework.permissions import BasePermission


# Permissions
class GradPermission(BasePermission):
    """
        Custom permission class to check whether the user
        -making the request has the required permissions
        -to access the resource.

        The user must have a role equal to 1 to have permission to access the resource.
    """
    message = {"status": False, 'msg': "Require Graduate's Permission"}

    def has_permission(self, request, view):
        """
           Check whether the user making the request has
           -the required permissions to access the resource.

           Args:
               request (Request): The HTTP request object.
               view (View): The view handling the request.

           Returns:
               bool: True if the user has the required permissions, False otherwise.
       """
        if request.user.role == 1:
            return True

        return False


class ManagerPermission(BasePermission):
    """
       Custom permission class to check whether the user
       -making the request has the required permissions
       -to access the resource.

       The user must have a role equal to 2 to have permission to access the resource.
   """
    message = {"status": False, 'msg': "Require Manager's Permission"}

    def has_permission(self, request, view):
        """
            Check whether the user making the request has
            -the required permissions to access the resource.

            Args:
                request (Request): The HTTP request object.
                view (View): The view handling the request.

            Returns:
                bool: True if the user has the required permissions, False otherwise.
        """
        if request.user.role == 2:
            return True

        return False


class HrPermission(BasePermission):
    """
      Custom permission class to check whether the user
      -making the request has the required permissions
      -to access the resource.

      The user must have a role equal to 3 to have permission to access the resource.
    """
    message = {"status": False, 'msg': "Require Hr's Permission"}

    def has_permission(self, request, view):
        """
            Check whether the user making the request
            has the required permissions
            to access the resource.

            Args:
                request (Request): The HTTP request object.
                view (View): The view handling the request.

            Returns:
                bool: True if the user has the required permissions, False otherwise.
        """
        if request.user.role == 3:
            return True

        return False
