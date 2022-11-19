from django.http import JsonResponse

from rest_framework.response import Response
from rest_framework.decorators import APIView


# Create your views here.

class LoginView(APIView):
    def get(self, request):
        return Response({"test": True, "message": "sucess"})

    def poss(self,request):
        pass

    def put(self,request):
        pass

    def delete(self,request):
        pass