import json
from app.config import settings

STORY_PROMPT = """
You are a professional comic book writer. Create a {num_pages}-page comic about: "{topic}"
Art style: {style}. Emotion intensity: {emotion_intensity}.
Return ONLY valid JSON. No markdown, no preamble. Exact format:
{{
  "title": "Comic Title",
  "genre": "genre",
  "pages": [
    {{
      "page_number": 1,
      "panels": [
        {{
          "panel_number": 1,
          "dialogue": "Speech or narration text",
          "emotion": "happy|sad|angry|surprised|neutral|scared",
          "camera_angle": "wide|medium|close-up|overhead|low-angle",
          "character": "Character name or Narrator",
          "image_prompt": "Detailed stable diffusion prompt for this panel"
        }}
      ]
    }}
  ]
}}

Requirements:
- Exactly {num_pages} pages
- 4-6 panels per page (vary for pacing)
- Image prompts must be 2-3 sentences, highly descriptive
- Vary camera angles per page for cinematic feel
- Build emotional arc: setup -> conflict -> climax -> resolution
"""

def generate_story(topic: str, style: str, num_pages: int, emotion_intensity: str):
    prompt = STORY_PROMPT.format(
        num_pages=num_pages,
        topic=topic,
        style=style,
        emotion_intensity=emotion_intensity
    )
    
    if settings.LLM_PROVIDER == "ollama":
        import ollama
        client = ollama.Client(host=settings.OLLAMA_BASE_URL)
        response = client.chat(
            model=settings.OLLAMA_MODEL,
            messages=[{"role": "user", "content": prompt}],
            format="json"
        )
        content = response['message']['content']
        return json.loads(content)
    else:
        raise NotImplementedError("LLM Provider not yet implemented")
