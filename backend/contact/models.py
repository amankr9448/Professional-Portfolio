from django.db import models


class ContactMessage(models.Model):
    """A message submitted through the public contact form.

    Kept deliberately minimal -- no auth, no user accounts. This is a
    write-only inbox: submissions are readable in Django admin, not
    surfaced back through any public API.
    """

    name = models.CharField(max_length=200)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    # Set true once you've triaged/replied -- lets admin filter the noise out.
    handled = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.name} <{self.email}> @ {self.created_at:%Y-%m-%d}"
