import os
import time
import asyncio
from datetime import datetime
from sqlalchemy.orm import Session
from app.models.database import Comic, Page, Panel
from app.services.story_service import generate_story
from app.services.image_service import generate_panel_image
from app.config import settings

async def generate_comic_pipeline(comic_id: str, topic: str, style: str, num_pages: int, emotion_intensity: str, db: Session):
    comic = db.query(Comic).filter(Comic.id == comic_id).first()
    if not comic:
        return

    try:
        # Step 1: Write Story Script
        comic.current_step = 1
        comic.progress = 5
        db.commit()

        story_data = generate_story(
            topic=topic,
            style=style,
            num_pages=num_pages,
            emotion_intensity=emotion_intensity
        )
        
        comic.title = story_data.get("title", f"Comic {comic_id}")
        comic.genre = story_data.get("genre", "Unknown")
        comic.progress = 15
        db.commit()

        # Build Page/Panel hierarchy
        panels_to_generate = []
        for p_data in story_data.get("pages", []):
            page_obj = Page(
                comic_id=comic.id,
                page_number=p_data.get("page_number", 1)
            )
            db.add(page_obj)
            db.flush() # get page_obj.id
            
            for panel_data in p_data.get("panels", []):
                os.makedirs(f"{settings.IMAGE_STORAGE_PATH}/{comic_id}/page{page_obj.page_number}", exist_ok=True)
                image_rel_url = f"/api/images/{comic_id}/page{page_obj.page_number}/panel{panel_data.get('panel_number', 1)}.png"
                image_abs_path = f"{settings.IMAGE_STORAGE_PATH}/{comic_id}/page{page_obj.page_number}/panel{panel_data.get('panel_number', 1)}.png"
                
                panel_obj = Panel(
                    page_id=page_obj.id,
                    panel_number=panel_data.get("panel_number", 1),
                    image_url=image_rel_url,
                    image_path=image_abs_path,
                    dialogue=panel_data.get("dialogue"),
                    emotion=panel_data.get("emotion"),
                    camera_angle=panel_data.get("camera_angle"),
                    character=panel_data.get("character"),
                    image_prompt=panel_data.get("image_prompt")
                )
                db.add(panel_obj)
                panels_to_generate.append(panel_obj)

        comic.panels_total = len(panels_to_generate)
        comic.current_step = 2
        comic.progress = 20
        db.commit()
        
        # Step 2: Generate Images
        total_panels = len(panels_to_generate)
        for i, panel in enumerate(panels_to_generate):
            # Check if cancelled
            db.refresh(comic)
            if comic.status == "cancelled":
                return
                
            if panel.image_prompt:
                await generate_panel_image(
                    panel_prompt=panel.image_prompt,
                    style=comic.style,
                    output_path=panel.image_path
                )
            comic.panels_completed += 1
            # Progress from 20 to 90
            comic.progress = 20 + int((i + 1) / total_panels * 70)
            db.commit()

        # Step 3: Assembly
        comic.current_step = 3
        comic.progress = 95
        db.commit()
        
        # Complete
        comic.status = "completed"
        comic.progress = 100
        comic.completed_at = datetime.utcnow()
        db.commit()

    except Exception as e:
        db.rollback()
        comic = db.query(Comic).filter(Comic.id == comic_id).first()
        if comic:
            comic.status = "failed"
            comic.error_message = str(e)
            db.commit()
