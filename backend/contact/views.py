from rest_framework import generics, throttling
from rest_framework.response import Response

from .models import ContactMessage
from .serializers import ContactMessageSerializer


class ContactRateThrottle(throttling.AnonRateThrottle):
    scope = "anon"


class ContactMessageCreateView(generics.CreateAPIView):
    """POST /api/contact/ -- the only public operation on this model.

    Deliberately write-only: there is no list/retrieve endpoint, so a
    submitted message is never readable through the API, only via
    Django admin. Throttled at the project-level anon rate to blunt
    scripted spam.
    """

    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    throttle_classes = [ContactRateThrottle]

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        # Never echo back the stored object -- just confirm receipt.
        return Response({"status": "received"}, status=response.status_code)
