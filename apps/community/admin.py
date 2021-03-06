from django.contrib import admin
from models import Person, TeacherLearnYears, Subject, Group, City, Employment, Student, University, \
    UniversityDepartment, Branch, Company, Attribute, PersonalData

admin.site.register(Person)
admin.site.register(TeacherLearnYears)
admin.site.register(Subject)
admin.site.register(Group)
admin.site.register(City)
admin.site.register(Student)
admin.site.register(Employment)
admin.site.register(University)
admin.site.register(UniversityDepartment)
admin.site.register(Branch)
admin.site.register(Company)
admin.site.register(Attribute)
admin.site.register(PersonalData)