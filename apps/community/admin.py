from django.contrib import admin
from models import Person, TeacherLearnYears, Subject, Group, City, Employment, Student, University, \
    UniversityDepartment, Branch, Company, Attribute, PersonalData, Invitation, Contest, ContestEdition, ContestScope, \
    Achievement, ContestResult


class UniversityDepartmentInline(admin.TabularInline):
    model = UniversityDepartment


@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'is_registered', 'allow_invitation')
    list_display_links = ('first_name', 'last_name')
    list_editable = ('allow_invitation',)
    list_filter = ('sex', 'allow_invitation',)
    search_fields = ['last_name', 'married_name', 'first_name']


@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = ('name', 'latitude', 'longitude', 'is_empty', 'is_verified')
    list_editable = ('is_verified',)
    list_filter = ('is_empty', 'is_verified')
    search_fields = ['name']


@admin.register(Employment)
class EmploymentAdmin(admin.ModelAdmin):
    list_display = ('person', 'name', 'company', 'city', 'branch', 'start', 'end')
    search_fields = ['name', 'company__name', 'branch__name', 'person__last_name', 'person__married_name',
                     'person__first_name']


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('person', 'university', 'department', 'school', 'start', 'end')
    search_fields = ['university', 'department', 'school', 'person__last_name', 'person__married_name',
                     'person__first_name']


@admin.register(University)
class UniversityAdmin(admin.ModelAdmin):
    list_display = ('name', 'acronym', 'city', 'is_verified')
    list_editable = ('is_verified',)
    list_filter = ('is_verified',)
    search_fields = ['name', 'acronym', 'city']
    inlines = (UniversityDepartmentInline,)


@admin.register(PersonalData)
class PersonalDataAdmin(admin.ModelAdmin):
    list_display = ('person', 'attribute', 'value', 'is_public')
    list_editable = ('is_public',)
    list_filter = ('is_public',)
    search_fields = ['person', 'attribute', 'value']


@admin.register(Group)
class GroupAdmin(admin.ModelAdmin):
    list_display = ('symbol', 'tutor', 'first_year', 'last_year', 'is_graduated')
    list_editable = ('is_graduated',)
    list_filter = ('is_graduated',)


admin.site.register(TeacherLearnYears)
admin.site.register(Subject)
admin.site.register(UniversityDepartment)
admin.site.register(Branch)
admin.site.register(Company)
admin.site.register(Attribute)
admin.site.register(Invitation)
admin.site.register(Contest)
admin.site.register(ContestEdition)
admin.site.register(ContestResult)
admin.site.register(ContestScope)
admin.site.register(Achievement)