from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.database import Comic
from app.api.deps import get_db

router = APIRouter()

@router.post("/cancel/{comic_id}")
def cancel_generation(comic_id: str, db: Session = Depends(get_db)):
    comic = db.query(Comic).filter(Comic.id == comic_id).first()
    if not comic:
        raise HTTPException(status_code=404, detail="Comic not found")
        
    if comic.status == "processing":
        comic.status = "cancelled"
        db.commit()
        return {"detail": "Cancelled"}
    else:
        raise HTTPException(status_code=400, detail="Comic is not processing")
