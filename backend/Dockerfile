FROM python:3.12-slim

# Psycopg2 needs libpq at runtime; the -dev headers are only needed if you
# switch to psycopg2 (non-binary) -- kept out to keep the image small.
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy requirements first so `docker build` reuses this layer whenever only
# application code changes, not dependencies -- this is most of the speedup
# Docker gives you over a from-scratch deploy.
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Don't run as root in the container.
RUN useradd --create-home appuser && chown -R appuser:appuser /app
USER appuser

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

EXPOSE 8000

# Runs migrations on container start, then serves via gunicorn.
# For real deployments, split "migrate" into a separate release step
# instead of running it on every container boot.
CMD ["sh", "-c", "python manage.py migrate --noinput && python manage.py collectstatic --noinput && gunicorn config.wsgi:application --bind 0.0.0.0:${PORT:-8000} --workers 3"]
