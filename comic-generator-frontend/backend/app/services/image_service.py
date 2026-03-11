import os
import httpx
from app.config import settings

STYLE_PREFIXES = {
  "manga":     "manga style, black and white ink, detailed linework, expressive eyes,",
  "western":   "western comic book style, bold colors, dynamic poses, ink outlines,",
  "cartoon":   "cartoon style, vibrant colors, clean lines, exaggerated expressions,",
  "realistic": "realistic illustration, detailed, cinematic lighting, painterly,"
}

async def generate_panel_image(panel_prompt: str, style: str, output_path: str):
    style_prefix = STYLE_PREFIXES.get(style, "")
    prompt = f"{style_prefix} {panel_prompt}, comic panel, high quality"
    negative = "blurry, deformed, ugly, low quality, text, watermark"
    
    if settings.IMAGE_PROVIDER == "huggingface":
        async with httpx.AsyncClient() as client:
            resp = await client.post(
                f"https://api-inference.huggingface.co/models/{settings.HF_IMAGE_MODEL}",
                headers={"Authorization": f"Bearer {settings.HUGGINGFACE_API_KEY}"},
                json={"inputs": prompt, "parameters": {"negative_prompt": negative,
                      "width": 768, "height": 512, "num_inference_steps": 30}},
                timeout=120.0
            )
            # HF API returns the image bytes directly if successful, but can return JSON on error
            resp.raise_for_status()
            with open(output_path, "wb") as f:
                f.write(resp.content)
    else:
        raise NotImplementedError("Image Provider not yet implemented")
