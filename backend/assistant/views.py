import json
import os
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from rest_framework import status, throttling
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.response import Response


BIO_FACTS = """- Aman Kumar is a backend engineer based in Bengaluru, India.
- He has 3+ years of experience as a Software Developer at Genpact, working with GE Vernova.
- His core stack includes Python, Django, PostgreSQL, Redis, AWS, Docker, REST APIs and system design.
- His production work includes systems handling 500K+ monthly requests, 60% query-time reduction, 40% database read reduction and 80% storage-cost reduction.
- His education is a Bachelor of Engineering in Computer Science from Nitte Meenakshi Institute of Technology (2019-2023, CGPA 8.51/10).
- His portfolio includes backend engineering work, an automated YouTube Shorts pipeline and a blog called The Paradigm.
- Direct visitors to the portfolio contact page for contact details. Never invent personal information."""


class AssistantRateThrottle(throttling.AnonRateThrottle):
    scope = "anon"


@api_view(["POST"])
@throttle_classes([AssistantRateThrottle])
def chat(request):
    api_key = os.environ.get("GROQ_API_KEY")
    if not api_key:
        return Response(
            {"reply": "The assistant is not configured yet. Please try again later."},
            status=status.HTTP_503_SERVICE_UNAVAILABLE,
        )

    messages = request.data.get("messages")
    if not isinstance(messages, list) or not messages:
        return Response(
            {"error": "messages must be a non-empty list."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    safe_messages = []
    for message in messages[-12:]:
        if not isinstance(message, dict) or message.get("role") not in {"user", "assistant"}:
            return Response(
                {"error": "Each message must have a user or assistant role."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        content = message.get("content")
        if not isinstance(content, str) or not content.strip() or len(content) > 2000:
            return Response(
                {"error": "Each message must contain 1-2000 characters."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        safe_messages.append({"role": message["role"], "content": content.strip()})

    payload = {
        "model": "openai/gpt-oss-120b",
        "max_tokens": 450,
        "messages": [
            {
                "role": "system",
                "content": (
                    'You are "Ask Me", the friendly assistant on Aman Kumar\'s portfolio. '
                    "Answer general questions and questions about Aman using only the facts below. "
                    "Do not invent experience, contact information, or claims. Keep replies concise "
                    "(2-4 sentences) unless the visitor asks for detail.\n\nFACTS ABOUT AMAN:\n"
                    + BIO_FACTS
                ),
            },
            *safe_messages,
        ],
    }

    request_body = json.dumps(payload).encode("utf-8")
    groq_request = Request(
        "https://api.groq.com/openai/v1/chat/completions",
        data=request_body,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}",
        },
        method="POST",
    )

    try:
        with urlopen(groq_request, timeout=25) as response:
            data = json.load(response)
    except HTTPError as error:
        error_body = error.read(4096).decode("utf-8", errors="replace")
        if api_key in error_body:
            error_body = error_body.replace(api_key, "[REDACTED]")
        print(f"Groq assistant request failed: HTTP {error.code}: {error_body}")
        return Response(
            {"reply": "The assistant is temporarily unavailable. Please try again shortly."},
            status=status.HTTP_502_BAD_GATEWAY,
        )
    except (URLError, TimeoutError, json.JSONDecodeError) as error:
        print(f"Groq assistant request failed: {error}")
        return Response(
            {"reply": "The assistant is temporarily unavailable. Please try again shortly."},
            status=status.HTTP_502_BAD_GATEWAY,
        )

    reply = data.get("choices", [{}])[0].get("message", {}).get("content", "").strip()
    if not reply:
        return Response(
            {"reply": "I didn't catch that. Could you try asking another way?"},
            status=status.HTTP_200_OK,
        )
    return Response({"reply": reply})

# Create your views here.
