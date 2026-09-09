from rest_framework import serializers

from .models import ContactMessage


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["name", "email", "message"]

    def validate_message(self, value: str) -> str:
        # Basic anti-spam floor -- reject empty or trivially short submissions.
        if len(value.strip()) < 10:
            raise serializers.ValidationError(
                "Message is too short -- add a bit more detail."
            )
        return value
