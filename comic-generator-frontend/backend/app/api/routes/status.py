from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.schemas import StatusResponse
from app.models.database import Comic
from app.api.deps import get_db

router = APIRouter()

@router.get("/status/{comic_id}", response_model=StatusResponse)
def get_status(comic_id: str, db: Session = Depends(get_db)):
    comic = db.query(Comic).filter(Comic.id == comic_id).first()
    if not comic:
        raise HTTPException(status_code=404, detail="Comic not found")
        
    step_labels = {
        1: "Writing story script",
        2: "Generating artwork",
        3: "Assembling comic"
    }
    
    # Calculate rough estimate remaining based on panels left * 8 seconds
    seconds_remaining = (comic.panels_total - comic.panels_completed) * 8 if comic.panels_total > 0 else 120
    
    return StatusResponse(
        comic_id=comic.id,
        status=comic.status,
        progress=comic.progress,
        current_step=comic.current_step,
        step_label=step_labels.get(comic.current_step, "Processing"),
        panels_completed=comic.panels_completed,
        panels_total=comic.panels_total,
        estimated_seconds_remaining=seconds_remaining if comic.status == "processing" else 0
    )
