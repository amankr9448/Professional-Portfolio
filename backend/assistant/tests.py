import os
from io import BytesIO
from urllib.error import HTTPError
from unittest.mock import patch

from django.test import TestCase


class AssistantChatTests(TestCase):
    @patch("assistant.views.urlopen")
    @patch.dict(os.environ, {"GROQ_API_KEY": "test-api-key"})
    def test_chat_sends_groq_bearer_key(self, mocked_urlopen):
        response = mocked_urlopen.return_value.__enter__.return_value
        response.read.return_value = (
            b'{"choices":[{"message":{"content":"Hello!"}}]}'
        )

        result = self.client.post(
            "/api/assistant/",
            data='{"messages":[{"role":"user","content":"Hi"}]}',
            content_type="application/json",
        )

        self.assertEqual(result.status_code, 200)
        self.assertEqual(result.json()["reply"], "Hello!")
        groq_request = mocked_urlopen.call_args.args[0]
        self.assertEqual(
            groq_request.get_header("Authorization"),
            "Bearer test-api-key",
        )

    @patch("assistant.views.urlopen")
    @patch("builtins.print")
    @patch.dict(os.environ, {"GROQ_API_KEY": "test-api-key"})
    def test_chat_logs_groq_error_body_without_exposing_it_to_client(
        self, mocked_print, mocked_urlopen
    ):
        mocked_urlopen.side_effect = HTTPError(
            "https://api.groq.com/openai/v1/chat/completions",
            403,
            "Forbidden",
            {},
            BytesIO(b'{"error":{"message":"Project access denied"}}'),
        )

        result = self.client.post(
            "/api/assistant/",
            data='{"messages":[{"role":"user","content":"Hi"}]}',
            content_type="application/json",
        )

        self.assertEqual(result.status_code, 502)
        self.assertEqual(
            result.json()["reply"],
            "The assistant is temporarily unavailable. Please try again shortly.",
        )
        mocked_print.assert_called_once_with(
            'Groq assistant request failed: HTTP 403: {"error":{"message":"Project access denied"}}'
        )
