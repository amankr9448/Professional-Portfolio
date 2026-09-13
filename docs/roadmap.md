# Roadmap

## What's built (this session -- Phase 1 foundation)
- Next.js 16 static-export frontend (Home, About, Experience, Projects, Skills, Resume, Contact) styled per `design-system.md`.
- Content lives as JSON in `frontend/src/content/` -- add a project/skill/role by editing JSON, no page code changes needed.
- Django API backend (`backend/`) with a throttled, write-only `/api/contact/` endpoint, and an `assistant` app with the data model for the future grounded AI assistant (not wired to an LLM yet -- see below).
- Both build clean: `cd frontend && npm run build`, `cd backend && python manage.py check`.

## What's marked TODO in the content
Resume-backed project, experience, skill, certification and metric content is now populated. Personal project links and deeper architecture evidence remain intentionally blank until the corresponding repositories/diagrams are ready. Personal projects now include the Paradigm blog and the YouTube Shorts automation pipeline; the engineering detail inside each is yours to expand.

## Immediate next steps (in order)
1. Add verified GitHub/demo/diagram URLs to the evidence fields and deepen the personal-project case studies only where real implementation details are available.
2. Deploy Phase 1 as-is (static frontend to Vercel/Netlify/GitHub Pages, Django to Railway/Render + managed Postgres) so it's live and linkable from your resume/LinkedIn during your job search, rather than waiting for later phases.
3. Wire the contact form to the live `/api/contact/` endpoint (currently posts to a relative path with no deployed backend behind it yet).

## Later phases (per original brief, unchanged in order)
- **Phase 2 (Engineering depth)**: expand each project into a full case study page (`/projects/[slug]`), add architecture diagrams, wire the evidence system to real GitHub/demo links.
- **Phase 3 (Knowledge platform)**: blog (MDX), book library, certifications, global search, knowledge graph.
- **Phase 4 (Intelligence)**: the AI assistant -- retrieval over `KnowledgeChunk` rows (already modeled in `backend/assistant/models.py`), then an LLM call constrained to that retrieved context only. Do not build this before Phase 1-3 content exists; there's nothing real to ground it on yet.
- **Phase 5 (Optimization)**: SEO metadata, sitemap, analytics, accessibility audit, CI/CD.

## Why the AI assistant isn't built yet
Section 16 of the brief requires it to "never invent experience... never invent projects." A retrieval system is only as grounded as what's in the database -- building the RAG pipeline against placeholder TODO content would either hallucinate or answer "no information available" to everything. Fill in Phases 1-3 first.

## Docker (added this session)
`docker-compose.yml` at the repo root brings up: Postgres, Redis, the Django backend (gunicorn, behind migrate+collectstatic on boot), and the frontend (multi-stage build -> nginx serving the static export). Run `docker compose up --build` from the repo root once you have Docker installed locally (this sandbox doesn't have the Docker daemon, so the compose file is validated by structure/YAML checks here, not an actual `up` -- test it on your machine before relying on it).

Why it's here, concretely for this project:
- **Dev/prod parity.** Without Docker, local dev defaults to SQLite (see `settings.py`'s fallback) while any real host runs Postgres. That mismatch is exactly the kind of bug that only shows up after deploy. `docker-compose up` gives you the same Postgres + Redis locally that production runs.
- **Zero-install onboarding.** No need to install Postgres/Redis on your machine, manage versions, or deal with "works on my machine." One command, same environment every time -- useful if this ever needs a second contributor, or if you rebuild your dev machine.
- **The image you test is the image you ship.** Render/Fly/Railway can all build directly from `backend/Dockerfile` -- so what runs in `docker compose up` locally is the same artifact deployed, not a reinterpretation of a Procfile or buildpack.
- **It's evidence, not just infrastructure.** `skills.json`'s Docker entry now links to this repo's own compose setup instead of a TODO -- concrete enough to walk an interviewer through the actual trade-off (see the "this-portfolio" project entry in `projects.json`).

What Docker does *not* help with here: the frontend is static-exported HTML, so a CDN deploy (Vercel/Netlify/GitHub Pages) is still simpler and faster than running an nginx container for it in production. The frontend Dockerfile is there for local full-stack parity and for hosts that only accept containers -- not because static hosting needs a container.
