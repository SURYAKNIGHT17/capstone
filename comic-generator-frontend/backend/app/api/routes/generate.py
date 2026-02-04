import uuid
from fastapi import APIRouter, Depends, BackgroundTasks
from sqlalchemy.orm import Session
from app.models.schemas import GenerateRequest, StatusResponse
from app.models.database import Comic
from app.api.deps import get_db
from app.services.comic_service import generate_comic_pipeline

router = APIRouter()

@router.post("/generate", response_model=dict)
def generate_comic(request: GenerateRequest, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    comic_id = str(uuid.uuid4())
    
    # Create initial DB record
    comic = Comic(
        id=comic_id,
        topic=request.topic,
        style=request.style,
        num_pages=request.num_pages,
        status="processing",
        progress=0,
        current_step=1
    )
    db.add(comic)
    db.commit()
    
    # Start generation in background
    background_tasks.add_task(
        generate_comic_pipeline,
        comic_id=comic_id,
        topic=request.topic,
        style=request.style,
        num_pages=request.num_pages,
        emotion_intensity=request.emotion_intensity,
        db=db
    )
    
    return {"comic_id": comic_id}
