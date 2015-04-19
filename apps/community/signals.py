from django.db.models.signals import pre_save, post_delete
from django.dispatch import receiver
from apps.community.models import Employment, Student


@receiver(pre_save, sender=Employment)
def on_employment_save(sender, instance, *args, **kwargs):
    instance.city.is_empty = False
    instance.city.save()


@receiver(post_delete, sender=Employment)
def on_employment_delete(sender, instance, *args, **kwargs):
    city = instance.city
    city.is_empty = not city.people.exists()
    city.save()


@receiver(pre_save, sender=Student)
def on_student_save(sender, instance, *args, **kwargs):
    instance.university.city.is_empty = False
    instance.university.city.save()


@receiver(post_delete, sender=Student)
def on_student_delete(sender, instance, *args, **kwargs):
    city = instance.university.city
    city.is_empty = not city.people.exists()
    city.save()
