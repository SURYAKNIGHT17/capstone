from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from app.models.database import Comic
from app.api.deps import get_db
from app.services.pdf_service import pdf_service
from app.config import settings
import os

router = APIRouter()

@router.get("/comic/{comic_id}/pdf")
def download_comic_pdf(comic_id: str, db: Session = Depends(get_db)):
    pdf_path = pdf_service.get_or_generate_pdf(db, comic_id, settings.BASE_URL)
    
    if not pdf_path or not os.path.exists(pdf_path):
        raise HTTPException(status_code=404, detail="Could not generate or find PDF. Is the comic completed?")
        
    return FileResponse(
        path=pdf_path,
        media_type="application/pdf",
        filename=f"comic-{comic_id}.pdf",
        headers={"Content-Disposition": f'attachment; filename="comic-{comic_id}.pdf"'}
    )
