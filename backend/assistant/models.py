from django.db import models


class KnowledgeChunk(models.Model):
    """A retrievable unit of grounded portfolio knowledge.

    This is the substrate for the Phase 4 'Ask My Portfolio' assistant
    (see docs/roadmap.md). The assistant is NOT wired to an LLM yet --
    building the retrieval architecture without real content to ground it
    on would just be a demo, not the grounded assistant the brief asks for.

    Each chunk should map back to something published elsewhere on the
    site (a project, a role, a blog post) so the assistant's answers are
    always traceable to a real page, never invented.
    """

    SOURCE_TYPES = [
        ("project", "Project"),
        ("experience", "Experience"),
        ("skill", "Skill"),
        ("blog", "Blog post"),
        ("certification", "Certification"),
    ]

    source_type = models.CharField(max_length=20, choices=SOURCE_TYPES)
    source_id = models.CharField(
        max_length=100, help_text="Matches the id used in the frontend content JSON."
    )
    text = models.TextField(help_text="The actual grounded content, in plain prose.")
    source_url = models.URLField(
        blank=True, help_text="Public URL this chunk should link back to."
    )

    def __str__(self) -> str:
        return f"{self.source_type}:{self.source_id}"
