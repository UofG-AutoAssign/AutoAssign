from django.contrib import admin

# Register your models here.
from Assign import models
# Register your models here.

class GraduateAdmin(admin.ModelAdmin):
    list = ('grad_email', 'man_id', 'team_id','depart_id','first_name','second_name','password')

    admin.site.register(models.Graduate)