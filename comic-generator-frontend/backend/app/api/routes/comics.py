from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from app.models.schemas import ComicHistoryResponse, ComicResponse, PageResponse, PanelResponse
from app.models.database import Comic
from app.api.deps import get_db
from app.services.history_service import get_history, delete_comic

router = APIRouter()

@router.get("/comics", response_model=ComicHistoryResponse)
def list_comics(
    page: int = Query(1, ge=1),
    limit: int = Query(12, ge=1, le=50),
    sort: str = Query("newest"),
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    result = get_history(db, page, limit, sort, search)
    # Format the covers
    for comic in result["comics"]:
        # Just grab the first panel of the first page if available
        if comic.pages and comic.pages[0].panels:
            comic.cover_image = comic.pages[0].panels[0].image_url
        else:
            comic.cover_image = ""
            
    return result

@router.get("/comic/{comic_id}", response_model=ComicResponse)
def get_comic(comic_id: str, db: Session = Depends(get_db)):
    comic = db.query(Comic).filter(Comic.id == comic_id).first()
    if not comic:
        raise HTTPException(status_code=404, detail="Comic not found")
        
    # Serialize to Pydantic model
    pages = []
    for p in sorted(comic.pages, key=lambda x: x.page_number):
        panels = [
            PanelResponse(
                panel_number=pan.panel_number,
                image_url=pan.image_url,
                dialogue=pan.dialogue,
                emotion=pan.emotion,
                camera_angle=pan.camera_angle,
                character=pan.character
            ) for pan in sorted(p.panels, key=lambda x: x.panel_number)
        ]
        pages.append(PageResponse(page_number=p.page_number, panels=panels))
        
    return ComicResponse(
        id=comic.id,
        title=comic.title,
        genre=comic.genre,
        style=comic.style,
        created_at=comic.created_at,
        num_pages=comic.num_pages,
        pages=pages
    )

@router.delete("/comic/{comic_id}")
def delete_comic_route(comic_id: str, db: Session = Depends(get_db)):
    success = delete_comic(db, comic_id)
    if not success:
        raise HTTPException(status_code=404, detail="Comic not found")
    return {"detail": "success"}
