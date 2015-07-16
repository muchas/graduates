from django.core.mail import mail_admins

from rest_framework import serializers

from .models import Feedback


class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        read_only_fields = ('user', 'created', 'modified', 'is_read')

    def create(self, validated_data):
        feedback = Feedback.objects.create(
            user=self.context['request'].user,
            **validated_data
        )
        mail_admins('Feedback from: ' + feedback.user.email, feedback.content)
        return feedback